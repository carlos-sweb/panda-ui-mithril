#!/usr/bin/env bun
/**
 * config-ui server — API del editor del theme (Bao.js).
 *
 * `bunx panda-ui-mithril config` sirve este servidor (por defecto en :1234):
 *   GET  /              → SPA del editor (bundleada con Bun.build)
 *   GET  /api/theme     → valores actuales del theme (JSON por categoría)
 *   POST /api/theme     → recibe edits y reescribe pum/theme/*.ts
 *   POST /api/rebuild   → ejecuta codegen + cssgen
 *
 * Flags (leídos de process.argv — el bin ya los recibió):
 *   --port <n> | --port=<n> | -p <n>   puerto del servidor (default 1234)
 *   --dir <ruta> | -d <ruta>           base explícita para el theme (ver abajo)
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
 * Al arrancar abre la URL en el navegador del sistema (xdg-open / open /
 * start según plataforma).
 *
 * La SPA (config-ui/) se bundlea con Bun.build en runtime — resuelve los bare
 * imports (mithril, lucide-mithril, ...) que el navegador no entiende.
 */
import Bao from 'baojs'
import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join, relative, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { spawn, spawnSync } from 'node:child_process'
import { parseColors, parseFlat, writeColorsSrc, writeFlatSrc } from './theme-io'
import {
  buildFontfaceSource, fontFilePath, fontfaceWired, fontsLayout, installFont,
  installedFonts, readFontCss, readOutdir, searchFonts, uninstallFont,
  writeFontfaceConfig,
} from './fonts-api'

const PORT = portFromArgv() ?? 1234
const CLI_DIR = dirname(fileURLToPath(import.meta.url))
// config-ui/server.ts → la raíz del paquete es ../ (node_modules/panda-ui-mithril/)
const PKG_DIR = join(CLI_DIR, '..')
const UI_DIR = join(PKG_DIR, 'config-ui')

const app = new Bao()

// Content types para servir binarios (fuentes del editor y de los proyectos).
const FONT_TYPES: Record<string, string> = {
  woff2: 'font/woff2', woff: 'font/woff', ttf: 'font/ttf', otf: 'font/otf',
  svg: 'image/svg+xml', png: 'image/png', ico: 'image/x-icon',
}

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
/**
 * codegen + cssgen en la raíz del proyecto (donde está panda.config.ts),
 * nunca en process.cwd() — el editor puede haberse lanzado desde un
 * subdirectorio. Se reusa para el rebuild manual (POST /api/rebuild) y para
 * los rebuilds automáticos tras instalar/desinstalar/asignar fuentes.
 */
function runRebuild(projectRoot: string) {
  const codegen = spawnSync('bunx', ['panda', 'codegen'], { cwd: projectRoot, encoding: 'utf8' })
  const cssgen = spawnSync('bunx', ['panda', 'cssgen'], { cwd: projectRoot, encoding: 'utf8' })
  return {
    ok: codegen.status === 0 && cssgen.status === 0,
    codegen: codegen.stderr?.slice(-200),
    cssgen: cssgen.stderr?.slice(-200),
  }
}

app.post('/api/rebuild', (ctx) => {
  const found = resolveTheme(process.cwd())
  const cwd = found.projectRoot || process.cwd()
  const result = runRebuild(cwd)
  return ctx.sendJson({ ok: result.ok, codegen: result.codegen, cssgen: result.cssgen })
})

/**
 * Sincroniza el bloque `globalFontface` del panda.config.ts del consumidor
 * con las fuentes instaladas (la vía nativa de Panda: cssgen emite los
 * @font-face dentro de styles.css). Devuelve { wired, changed }.
 */
function syncFontface(projectRoot: string, themeDir: string) {
  const configPath = join(projectRoot, 'panda.config.ts')
  if (!existsSync(configPath)) return { wired: false, changed: false }
  const src = readFileSync(configPath, 'utf8')
  const faces = buildFontfaceSource(installedFonts(themeDir), themeDir, projectRoot, readOutdir(src))
  const next = writeFontfaceConfig(src, faces)
  if (next !== src) writeFileSync(configPath, next, 'utf8')
  return { wired: faces !== '', changed: next !== src }
}

// ── API: fuentes (Fontsource) ───────────────────────────────────────────────
// Característica "buscar e instalar fuentes" — el proveedor por defecto es
// Fontsource (https://fontsource.org/). El modelo instalado en el proyecto
// objetivo vive en {raiz}/fonts/ (ver fonts-api.ts).

/**
 * Error de theme compartido por las rutas de fuentes (mismo contrato que
 * /api/theme). null si el theme es editable.
 */
function themeError(found: { themeDir: string | null; projectRoot: string | null; legacy: boolean }) {
  if (found.legacy) {
    return {
      ok: false,
      legacy: true,
      error: 'Legacy theme detected: run `bunx panda-ui-mithril init` to migrate to pum/theme/*.ts first.',
      hint: 'bunx panda-ui-mithril init',
    }
  }
  if (!found.themeDir) {
    return {
      ok: false,
      error: 'pum/theme not found. Run bunx panda-ui-mithril init first (or pass --dir <path>).',
    }
  }
  return null
}

app.get('/api/fonts/search', async (ctx) => {
  const found = resolveTheme(process.cwd())
  const err = themeError(found)
  if (err) return ctx.sendJson(err)
  const q = ctx.query.get('q') ?? ''
  try {
    const results = await searchFonts(q)
    return ctx.sendJson({ ok: true, results })
  } catch (e) {
    return ctx.sendJson({ ok: false, error: `Fontsource: ${String(e)}` })
  }
})

app.get('/api/fonts/installed', (ctx) => {
  const found = resolveTheme(process.cwd())
  const err = themeError(found)
  if (err) return ctx.sendJson(err)
  try {
    const themeDir = found.themeDir!
    const projectRoot = found.projectRoot || dirname(themeDir)
    const { cssPath } = fontsLayout(themeDir)
    // Autocuración: si hay fuentes instaladas pero el panda.config.ts no tiene
    // el bloque globalFontface (p. ej. instaladas antes de esta feature), se
    // escribe y se rebuilda — el editor es el dueño del wiring, sin pasos
    // manuales. No-op si el bloque ya está al día.
    const synced = syncFontface(projectRoot, themeDir)
    if (synced.changed) runRebuild(projectRoot)
    // Ruta relativa del {raiz}/fonts.css al projectRoot — fallback del banner.
    const fontsCssRel = relative(projectRoot, cssPath)
    // wired: el panda.config.ts tiene el bloque globalFontface (las fuentes
    // compilan dentro de styles.css vía Panda, sin pasos manuales).
    const configPath = join(projectRoot, 'panda.config.ts')
    const wired = existsSync(configPath) && fontfaceWired(readFileSync(configPath, 'utf8'))
    return ctx.sendJson({ ok: true, fonts: installedFonts(themeDir), fontsCssRel, wired })
  } catch (e) {
    return ctx.sendJson({ ok: false, error: String(e) })
  }
})

app.post('/api/fonts/install', async (ctx) => {
  const found = resolveTheme(process.cwd())
  const err = themeError(found)
  if (err) return ctx.sendJson(err)
  const body = await ctx.req.json().catch(() => ({})) as Record<string, unknown>
  if (!body.id) return ctx.sendJson({ ok: false, error: 'Falta el id de la fuente.' })
  try {
    const themeDir = found.themeDir!
    const projectRoot = found.projectRoot || dirname(themeDir)
    const { font, cssPath } = await installFont(themeDir, {
      id: String(body.id),
      weights: Array.isArray(body.weights) ? body.weights.map(Number) : undefined,
      styles: Array.isArray(body.styles) ? body.styles.map(String) : undefined,
      subsets: Array.isArray(body.subsets) ? body.subsets.map(String) : undefined,
    })
    // Wire automático: globalFontface en panda.config.ts + rebuild, para que
    // los @font-face compilen dentro de styled-system/styles.css.
    const { wired, changed } = syncFontface(projectRoot, themeDir)
    const rebuild = changed || wired ? runRebuild(projectRoot) : { ok: true }
    const fontsCssRel = relative(projectRoot, cssPath)
    return ctx.sendJson({
      ok: true,
      font,
      fontsCssRel,
      importHint: `import './${fontsCssRel}'`,
      wired,
      rebuildOk: rebuild.ok,
      ...(rebuild.ok ? {} : { rebuildError: rebuild.codegen || rebuild.cssgen || 'rebuild failed' }),
    })
  } catch (e) {
    return ctx.sendJson({ ok: false, error: String(e) })
  }
})

app.post('/api/fonts/uninstall', async (ctx) => {
  const found = resolveTheme(process.cwd())
  const err = themeError(found)
  if (err) return ctx.sendJson(err)
  const body = await ctx.req.json().catch(() => ({})) as Record<string, unknown>
  if (!body.id) return ctx.sendJson({ ok: false, error: 'Falta el id de la fuente.' })
  try {
    const themeDir = found.themeDir!
    const projectRoot = found.projectRoot || dirname(themeDir)
    const removed = uninstallFont(themeDir, String(body.id))
    const { wired, changed } = syncFontface(projectRoot, themeDir)
    const rebuild = changed || wired ? runRebuild(projectRoot) : { ok: true }
    return ctx.sendJson({
      ok: true,
      removed,
      wired,
      rebuildOk: rebuild.ok,
      ...(rebuild.ok ? {} : { rebuildError: rebuild.codegen || rebuild.cssgen || 'rebuild failed' }),
    })
  } catch (e) {
    return ctx.sendJson({ ok: false, error: String(e) })
  }
})

/** index.css de una fuente instalada con urls → /api/fonts/file/{id}/… (preview). */
app.get('/api/fonts/css/:id', (ctx) => {
  const found = resolveTheme(process.cwd())
  const err = themeError(found)
  if (err) return ctx.sendJson(err)
  const css = readFontCss(found.themeDir!, ctx.params.id)
  if (css === null) return ctx.sendRaw(new Response('Not found', { status: 404 }))
  return ctx.sendRaw(new Response(css, { headers: { 'Content-Type': 'text/css' } }))
})

/** woff2 instalado en el proyecto (guard de traversal en fonts-api). */
app.get('/api/fonts/file/:id/:file', (ctx) => {
  const found = resolveTheme(process.cwd())
  const err = themeError(found)
  if (err) return ctx.sendJson(err)
  const p = fontFilePath(found.themeDir!, ctx.params.id, ctx.params.file)
  if (!p) return ctx.sendRaw(new Response('Not found', { status: 404 }))
  const ext = p.split('.').pop() || ''
  return ctx.sendRaw(new Response(readFileSync(p), {
    headers: { 'Content-Type': FONT_TYPES[ext] || 'application/octet-stream' },
  }))
})

// El CSS inline (config-ui.css) referencia las fuentes como rutas relativas
// (fonts/xxx.woff2, copiadas por postcss-url) — el navegador las pide al
// server, así que hay que servirlas desde config-ui/fonts/.
app.get('/fonts/*path', (ctx) => {
  const rel = ctx.params.path
  const file = join(UI_DIR, 'fonts', rel)
  if (!existsSync(file)) return ctx.sendRaw(new Response('Not found', { status: 404 }))
  const ext = file.split('.').pop() || ''
  return ctx.sendRaw(new Response(readFileSync(file), {
    headers: { 'Content-Type': FONT_TYPES[ext] || 'application/octet-stream' },
  }))
})

// Bao exige un Response real del notFoundHandler (ctx.sendText devuelve el
// Context y crashea con "Expected a Response object").
app.notFoundHandler = () => new Response('Not found', { status: 404 })

const server = app.listen({ port: PORT })
const url = `http://localhost:${PORT}`
console.log(`PUM Config — theme editor: ${url}`)

// Abre la URL en el navegador del sistema (best-effort: si falla o no hay
// navegador, el servidor sigue funcionando y la URL se imprimió arriba).
setTimeout(() => openBrowser(url), 150)

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

/** Lee `--port <n>` / `--port=<n>` / `-p <n>` de process.argv. */
function portFromArgv(): number | null {
  const argv = process.argv
  for (let i = 2; i < argv.length; i++) {
    const a = argv[i]
    let raw: string | undefined
    if (a.startsWith('--port=')) raw = a.slice('--port='.length)
    else if (a === '--port' || a === '-p') raw = argv[i + 1]
    if (raw !== undefined) {
      const n = Number(raw)
      if (Number.isInteger(n) && n > 0 && n < 65536) return n
      console.warn(`config-ui: puerto inválido '${raw}' — usando 1234`)
      return null
    }
  }
  return null
}

/** Abre la URL en el navegador del sistema (best-effort, no bloquea). */
function openBrowser(url: string) {
  try {
    const cmd =
      process.platform === 'darwin'
        ? ['open', url]
        : process.platform === 'win32'
          ? ['cmd', '/c', 'start', '', url]
          : ['xdg-open', url]
    const child = spawn(cmd[0], cmd.slice(1), { detached: true, stdio: 'ignore' })
    child.on('error', (e) => console.error(`config-ui: no se pudo abrir el navegador (${cmd[0]}):`, e.message))
    child.unref()
  } catch (e) {
    console.error('config-ui: no se pudo abrir el navegador:', String(e))
  }
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
