#!/usr/bin/env bun
/**
 * config-ui server — API del editor del theme (Bao.js).
 *
 * `bunx panda-ui-mithril config` sirve este servidor en :1234:
 *   GET  /              → SPA del editor (bundleada con Bun.build)
 *   GET  /editor.js     → bundle JS de la SPA
 *   GET  /editor.css    → CSS de la SPA
 *   GET  /api/theme     → valores actuales del theme (JSON por categoría)
 *   POST /api/theme     → recibe edits y reescribe pum/theme/*.ts
 *   POST /api/rebuild   → ejecuta codegen + cssgen
 *
 * El target son los archivos del theme del consumidor en process.cwd()/pum/.
 * La SPA (config-ui/) se bundlea con Bun.build en runtime — resuelve los bare
 * imports (mithril, lucide-mithril, ...) que el navegador no entiende.
 */
import Bao from 'baojs'
import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { spawnSync } from 'node:child_process'

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
  const themeDir = findThemeDir(process.cwd())
  if (!themeDir) return ctx.sendJson({ ok: false, error: 'pum/theme not found. Run bunx panda-ui-mithril init first.' })

  const data = {
    colors: readColors(themeDir),
    fonts: readFlat(themeDir, 'fonts', 'fonts'),
    spacing: readFlat(themeDir, 'spacing', 'spacing'),
    radii: readFlat(themeDir, 'radii', 'radii'),
  }
  return ctx.sendJson({ ok: true, ...data })
})

// ── API: escribir theme ───────────────────────────────────────────────────
app.post('/api/theme', async (ctx) => {
  const themeDir = findThemeDir(process.cwd())
  if (!themeDir) return ctx.sendJson({ ok: false, error: 'pum/theme not found' })

  const body = await ctx.req.json()
  try {
    if (body.colors) writeColors(themeDir, body.colors)
    if (body.fonts) writeFlat(themeDir, 'fonts', 'fonts', body.fonts)
    if (body.spacing) writeFlat(themeDir, 'spacing', 'spacing', body.spacing)
    if (body.radii) writeFlat(themeDir, 'radii', 'radii', body.radii)
    return ctx.sendJson({ ok: true })
  } catch (e) {
    return ctx.sendJson({ ok: false, error: String(e) })
  }
})

// ── API: rebuild (codegen + cssgen) ───────────────────────────────────────
app.post('/api/rebuild', (ctx) => {
  const cwd = process.cwd()
  const codegen = spawnSync('bunx', ['panda', 'codegen'], { cwd, encoding: 'utf8' })
  const cssgen = spawnSync('bunx', ['panda', 'cssgen'], { cwd, encoding: 'utf8' })
  const ok = codegen.status === 0 && cssgen.status === 0
  return ctx.sendJson({ ok, codegen: codegen.stderr?.slice(-200), cssgen: cssgen.stderr?.slice(-200) })
})

app.notFoundHandler = (ctx) => ctx.sendText('Not found', { status: 404 })

const server = app.listen({ port: PORT })
console.log(`PUM Config — theme editor: http://localhost:${PORT}`)

// ── Helpers: theme dir ────────────────────────────────────────────────────
function findThemeDir(cwd) {
  const candidates = [join(cwd, 'pum', 'theme'), join(cwd, 'src', 'theme')]
  for (const dir of candidates) {
    if (existsSync(join(dir, 'colors.ts'))) return dir
  }
  return null
}

// ── Helpers: lectura ──────────────────────────────────────────────────────
/** colors.ts → { name: { base, dark } } (semanticTokens con base/_dark) */
function readColors(dir) {
  const src = readFileSync(join(dir, 'colors.ts'), 'utf8')
  const out = {}
  const re = /'?([a-zA-Z0-9-]+)'?:\s*\{\s*value:\s*\{\s*base:\s*'([^']*)',\s*_dark:\s*'([^']*)'\s*\}\s*,?\s*\}/g
  let m
  while ((m = re.exec(src))) out[m[1]] = { base: m[2], dark: m[3] }
  return out
}

/** fonts/spacing/radii → { name: 'value' } */
function readFlat(dir, file, key) {
  const src = readFileSync(join(dir, file + '.ts'), 'utf8')
  const out = {}
  const re = new RegExp(`'?([a-zA-Z0-9-]+)'?:\\s*\\{\\s*value:\\s*'([^']*)'\\s*\\}\\s*,?\\s*\\}`, 'g')
  let m
  while ((m = re.exec(src))) out[m[1]] = m[2]
  return out
}

// ── Helpers: escritura (regex dirigida, estructura conocida) ──────────────
function writeColors(dir, colors) {
  let src = readFileSync(join(dir, 'colors.ts'), 'utf8')
  for (const [name, c] of Object.entries(colors)) {
    // Reemplaza base y _dark dentro del bloque value del token.
    const re = new RegExp(
      `('?${name}'?:\\s*\\{\\s*value:\\s*\\{\\s*)base:\\s*'[^']*'(,\\s*_dark:\\s*'[^']*'\\s*\\}\\s*,?\\s*\\})`,
    )
    if (re.test(src)) {
      src = src.replace(re, `$1base: '${c.base ?? ''}'$2`)
      src = src.replace(
        new RegExp(
          `('?${name}'?:\\s*\\{\\s*value:\\s*\\{\\s*base:\\s*'[^']*',\\s*)_dark:\\s*'[^']*'`,
        ),
        `$1_dark: '${c.dark ?? ''}'`,
      )
    }
  }
  writeFileSync(join(dir, 'colors.ts'), src)
}

function writeFlat(dir, file, key, values) {
  let src = readFileSync(join(dir, file + '.ts'), 'utf8')
  for (const [name, value] of Object.entries(values)) {
    const re = new RegExp(`('?${name}'?:\\s*\\{\\s*value:\\s*)'[^']*'(\\s*\\}\\s*,?\\s*\\})`)
    if (re.test(src)) {
      src = src.replace(re, `$1'${value}'$2`)
    }
  }
  writeFileSync(join(dir, file + '.ts'), src)
}
