#!/usr/bin/env bun
/**
 * config-ui server — API del editor del theme (Bao.js).
 *
 * `bunx panda-ui-mithril config` sirve este servidor en :1234:
 *   GET  /              → SPA del editor (bundleada con Bun.build)
 *   GET  /api/theme     → valores actuales del theme (JSON por categoría)
 *   POST /api/theme     → recibe edits y reescribe pum/theme/*.ts
 *   POST /api/rebuild   → ejecuta codegen + cssgen
 *
 * El target son los archivos del theme del consumidor. Resolución de ruta:
 *   - `--dir <ruta>` (o `-d`): usa `<ruta>` como base explícita (acepta un
 *     dir de proyecto con pum/ o src/, o un theme dir directo con colors.ts).
 *   - sin flag: búsqueda ascendente desde process.cwd() — `pum/theme` primero
 *     (consumidor), `src/theme` después (este repo/playground).
 *   - layout legacy: si existe `pum/theme.ts` de archivo único pero NO la
 *     carpeta `pum/theme/`, el editor no puede editar → responde con hint de
 *     migración (`bunx panda-ui-mithril init`, que preserva los valores).
 *
 * La SPA (config-ui/) se bundlea con Bun.build en runtime — resuelve los bare
 * imports (mithril, lucide-mithril, ...) que el navegador no entiende.
 */
import Bao from 'baojs'
import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join, relative, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { spawnSync } from 'node:child_process'
import { parseColors, parseFlat, writeColorsSrc, writeFlatSrc } from './theme-io'

const PORT = 1234
const CLI_DIR = dirname(fileURLToPath(import.meta.url))
// config-ui/server.ts → la raíz del paquete es ../ (node_modules/panda-ui-mithril/)
const PKG_DIR = join(CLI_DIR, '..')
const UI_DIR = join(PKG_DIR, 'config-ui')

const app = new Bao()

// ── Bundle de la SPA (Bun.build en runtime) ───────────────────────────────
// El JS se bundlea (resuelve bare imports). El CSS NO se toma del bundle:
// el editor usa su propio CSS generado con Panda postcss
// (config-ui/config-ui.css, producido por scripts/build-config-ui.ts), que
// incluye tokens + recipes + estilos de las páginas.
let editorJs = ''
let editorCss = ''
try {
  const out = await Bun.build({
    entrypoints: [join(UI_DIR, 'main.jsx')],
    outdir: '/tmp/pum-config-ui-build',
    naming: '[name].[ext]',
    minify: false,
    sourcemap: 'inline',
  })
  for (const artifact of out.outputs) {
    if (artifact.kind === 'entry-point') editorJs = await artifact.text()
  }
  const generatedCss = join(UI_DIR, 'config-ui.css')
  if (existsSync(generatedCss)) {
    editorCss = readFileSync(generatedCss, 'utf8')
  } else {
    console.error('config-ui: config-ui.css no existe — corre bun run scripts/build-config-ui.ts')
  }
} catch (e) {
  console.error('config-ui: Bun.build falló:', String(e))
}

const HTML_TEMPLATE = `<!DOCTYPE html>
<html lang="en" data-theme="light">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>PUM Config</title>
  <style>${editorCss}</style>
  <script>
    (function() {
      var theme = localStorage.getItem('panda-ui-theme') || 'light';
      document.documentElement.setAttribute('data-theme', theme);
    })();
  </script>
</head>
<body>
  <script type="module">${editorJs}</script>
</body>
</html>`

app.get('/', (ctx) => {
  return ctx.sendRaw(new Response(HTML_TEMPLATE, { headers: { 'Content-Type': 'text/html' } }))
})

// ── API: leer theme ───────────────────────────────────────────────────────
app.get('/api/theme', (ctx) => {
  const found = resolveTheme(process.cwd())
  if (found.legacy) {
    return ctx.sendJson({
      ok: false,
      legacy: true,
      projectRoot: found.projectRoot,
      error: 'Legacy theme detected: pum/theme.ts is a single file. Run `bunx panda-ui-mithril init` to migrate it to pum/theme/*.ts (your values are preserved).',
      hint: 'bunx panda-ui-mithril init',
    })
  }
  if (!found.themeDir) {
    return ctx.sendJson({
      ok: false,
      error: 'pum/theme not found. Run bunx panda-ui-mithril init first (or pass --dir <path>).',
    })
  }

  const data = {
    colors: readColors(found.themeDir),
    fonts: readFlat(found.themeDir, 'fonts'),
    spacing: readFlat(found.themeDir, 'spacing'),
    radii: readFlat(found.themeDir, 'radii'),
  }
  return ctx.sendJson({
    ok: true,
    ...data,
    themeDir: found.themeDir,
    projectRoot: found.projectRoot,
    themeRel: relative(found.projectRoot, found.themeDir) || found.themeDir,
  })
})

// ── API: escribir theme ───────────────────────────────────────────────────
app.post('/api/theme', async (ctx) => {
  const found = resolveTheme(process.cwd())
  if (found.legacy) {
    return ctx.sendJson({
      ok: false,
      legacy: true,
      error: 'Legacy theme detected: run `bunx panda-ui-mithril init` to migrate to pum/theme/*.ts first.',
      hint: 'bunx panda-ui-mithril init',
    })
  }
  if (!found.themeDir) return ctx.sendJson({ ok: false, error: 'pum/theme not found' })

  const body = await ctx.req.json()
  try {
    if (body.colors) writeColors(found.themeDir, body.colors)
    if (body.fonts) writeFlat(found.themeDir, 'fonts', body.fonts)
    if (body.spacing) writeFlat(found.themeDir, 'spacing', body.spacing)
    if (body.radii) writeFlat(found.themeDir, 'radii', body.radii)
    return ctx.sendJson({ ok: true })
  } catch (e) {
    return ctx.sendJson({ ok: false, error: String(e) })
  }
})

// ── API: rebuild (codegen + cssgen) ───────────────────────────────────────
app.post('/api/rebuild', (ctx) => {
  const found = resolveTheme(process.cwd())
  // El rebuild corre SIEMPRE en la raíz del proyecto (donde está
  // panda.config.ts), no en process.cwd() — el editor puede haberse lanzado
  // desde un subdirectorio.
  const cwd = found.projectRoot || process.cwd()
  const codegen = spawnSync('bunx', ['panda', 'codegen'], { cwd, encoding: 'utf8' })
  const cssgen = spawnSync('bunx', ['panda', 'cssgen'], { cwd, encoding: 'utf8' })
  const ok = codegen.status === 0 && cssgen.status === 0
  return ctx.sendJson({ ok, codegen: codegen.stderr?.slice(-200), cssgen: cssgen.stderr?.slice(-200) })
})

app.notFoundHandler = (ctx) => ctx.sendText('Not found', { status: 404 })

const server = app.listen({ port: PORT })
console.log(`PUM Config — theme editor: http://localhost:${PORT}`)

// ── Helpers: resolución de ruta del theme ─────────────────────────────────
/**
 * Resuelve el theme target. Devuelve:
 *   { themeDir, projectRoot, legacy }
 * - themeDir:  dir con colors.ts (null si no encontrado).
 * - projectRoot: dir raíz del proyecto (donde está panda.config.ts).
 * - legacy:    true si hay pum/theme.ts de archivo único (layout viejo).
 */
function resolveTheme(cwd: string) {
  const explicit = themeDirFromArgv()
  const candidates = explicit ? [explicit] : walkUp(cwd)

  for (const base of candidates) {
    // base apunta directo a un theme dir (tiene colors.ts)
    if (existsSync(join(base, 'colors.ts'))) {
      const projectRoot = findProjectRoot(dirname(base))
      return { themeDir: base, projectRoot, legacy: false }
    }
    // base es un dir de proyecto: pum/theme (consumidor), src/theme (repo),
    // o un dir que ya contiene theme/ (p. ej. --dir ./src → src/theme).
    for (const sub of ['pum/theme', 'src/theme', 'theme']) {
      const dir = join(base, sub)
      if (existsSync(join(dir, 'colors.ts'))) {
        const projectRoot = findProjectRoot(base)
        return { themeDir: dir, projectRoot, legacy: false }
      }
    }
    // layout legacy: pum/theme.ts de archivo único, sin carpeta theme/
    if (existsSync(join(base, 'pum', 'theme.ts')) && !existsSync(join(base, 'pum', 'theme'))) {
      return { themeDir: null, projectRoot: findProjectRoot(base), legacy: true }
    }
  }
  return { themeDir: null, projectRoot: null, legacy: false }
}

/** Lee `--dir <ruta>` / `-d <ruta>` de process.argv (el bin ya lo recibió). */
function themeDirFromArgv(): string | null {
  const argv = process.argv
  for (let i = 2; i < argv.length - 1; i++) {
    if (argv[i] === '--dir' || argv[i] === '-d') {
      const v = argv[i + 1]
      if (v && !v.startsWith('-')) return resolve(v)
    }
  }
  return null
}

/** Niveles desde cwd hasta la raíz (máx. 10), para búsqueda ascendente. */
function walkUp(cwd: string): string[] {
  const out: string[] = []
  let dir = cwd
  for (let i = 0; i < 10; i++) {
    out.push(dir)
    const parent = dirname(dir)
    if (parent === dir) break
    dir = parent
  }
  return out
}

/** Sube desde `dir` hasta encontrar panda.config.ts (fallback: el propio dir). */
function findProjectRoot(dir: string): string {
  let d = dir
  for (let i = 0; i < 10; i++) {
    if (existsSync(join(d, 'panda.config.ts'))) return d
    const parent = dirname(d)
    if (parent === d) return dir
    d = parent
  }
  return dir
}

// ── Helpers: lectura ──────────────────────────────────────────────────────
function readColors(dir: string) {
  return parseColors(readFileSync(join(dir, 'colors.ts'), 'utf8'))
}

function readFlat(dir: string, file: string) {
  return parseFlat(readFileSync(join(dir, file + '.ts'), 'utf8'))
}

// ── Helpers: escritura (regex dirigida, estructura conocida) ──────────────
function writeColors(dir: string, colors: Record<string, { base: string; dark: string }>) {
  const path = join(dir, 'colors.ts')
  writeFileSync(path, writeColorsSrc(readFileSync(path, 'utf8'), colors))
}

function writeFlat(dir: string, file: string, values: Record<string, string>) {
  const path = join(dir, file + '.ts')
  writeFileSync(path, writeFlatSrc(readFileSync(path, 'utf8'), values))
}
