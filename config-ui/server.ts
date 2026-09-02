#!/usr/bin/env bun
/**
 * config-ui server — API del editor del theme (Elysia).
 *
 * `bunx panda-ui-mithril config` sirve este servidor (por defecto en :1234):
 *   GET  /              → SPA del editor (bundleada con Bun.build)
 *   GET  /api/theme     → valores actuales del theme (JSON por categoría)
 *   POST /api/theme     → recibe edits y reescribe pum/theme/*.ts
 *   POST /api/rebuild   → ejecuta codegen + cssgen
 *   …y el resto de rutas /api/fonts/* (ver fonts-api.ts)
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
 *
 * Framework: Elysia (https://elysiajs.com/). Contrato HTTP de Bao preservado:
 * los handlers devuelven el objeto JSON directamente (Elysia lo serializa) o
 * un `new Response(...)` para contenido raw; el body JSON se parsea con
 * `request.json().catch(() => ({}))` (tolerante, igual que antes); el 404 se
 * resuelve en `onError` con `code === 'NOT_FOUND'`.
 */
import { Elysia } from 'elysia'
import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join, relative, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { spawn, spawnSync } from 'node:child_process'
import { ensureToken, parseColors, parseFlat, removeToken, writeColorsSrc, writeFlatSrc } from './theme-io'
import {
  assignFont, availableFonts, bunAdd, ensureRoleTokens, fontfaceWired, migrateLegacyFonts,
  packageFontFilePath, packageMeta, packageScope, parseLoadedKey, pruneLoaded,
  readFontsTokens, readLoaded, removePackage, sanitizeFontId, searchFonts, syncBlock,
  tokensForFamily, unassignFont,
} from './fonts-api'
import {
  availablePlugins, bunAddPackage, bunRemovePackage, catalog, packageInstalled,
  resolveNpmPackage, searchCatalog,
} from './postcss-api'

const PORT = portFromArgv() ?? 1234
const CLI_DIR = dirname(fileURLToPath(import.meta.url))
// config-ui/server.ts → la raíz del paquete es ../ (node_modules/panda-ui-mithril/)
const PKG_DIR = join(CLI_DIR, '..')
const UI_DIR = join(PKG_DIR, 'config-ui')

const app = new Elysia()

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

app.get('/', () => {
  return new Response(HTML_TEMPLATE, { headers: { 'Content-Type': 'text/html' } })
})

// ── API: leer theme ───────────────────────────────────────────────────────
app.get('/api/theme', () => {
  const found = resolveTheme(process.cwd())
  if (found.legacy) {
    return {
      ok: false,
      legacy: true,
      projectRoot: found.projectRoot,
      error: 'Legacy theme detected: pum/theme.ts is a single file. Run `bunx panda-ui-mithril init` to migrate it to pum/theme/*.ts (your values are preserved).',
      hint: 'bunx panda-ui-mithril init',
    }
  }
  if (!found.themeDir) {
    return {
      ok: false,
      error: 'pum/theme not found. Run bunx panda-ui-mithril init first (or pass --dir <path>).',
    }
  }

  const data = {
    colors: readColors(found.themeDir),
    fonts: readFlat(found.themeDir, 'fonts'),
    spacing: readFlat(found.themeDir, 'spacing'),
    radii: readFlat(found.themeDir, 'radii'),
  }
  return {
    ok: true,
    ...data,
    themeDir: found.themeDir,
    projectRoot: found.projectRoot,
    themeRel: relative(found.projectRoot, found.themeDir) || found.themeDir,
  }
})

// ── API: escribir theme ───────────────────────────────────────────────────
app.post('/api/theme', async ({ request }) => {
  const found = resolveTheme(process.cwd())
  if (found.legacy) {
    return {
      ok: false,
      legacy: true,
      error: 'Legacy theme detected: run `bunx panda-ui-mithril init` to migrate to pum/theme/*.ts first.',
      hint: 'bunx panda-ui-mithril init',
    }
  }
  if (!found.themeDir) return { ok: false, error: 'pum/theme not found' }

  const body = await request.json().catch(() => ({})) as Record<string, unknown>
  try {
    if (body.colors) writeColors(found.themeDir, body.colors)
    if (body.fonts) {
      // Estructura de tokens de rol (fonts.ts): quitar/añadir entradas que
      // writeFlatSrc no puede crear por sí sola (solo reemplaza valores).
      const fontsPath = join(found.themeDir!, 'fonts.ts')
      if (body.fontRemove && Array.isArray(body.fontRemove)) {
        let src = readFileSync(fontsPath, 'utf8')
        let next = src
        for (const name of body.fontRemove.map(String)) {
          if (!/^[a-z0-9-]+$/.test(name)) continue
          next = removeToken(next, name)
        }
        if (next !== src) writeFileSync(fontsPath, next, 'utf8')
      }
      if (body.fontAdd && typeof body.fontAdd === 'object') {
        let src = readFileSync(fontsPath, 'utf8')
        let next = src
        for (const [name, value] of Object.entries(body.fontAdd as Record<string, unknown>)) {
          if (!/^[a-z0-9-]+$/.test(name)) continue
          next = ensureToken(next, 'fonts', name, String(value ?? ''))
        }
        if (next !== src) writeFileSync(fontsPath, next, 'utf8')
      }
      writeFlat(found.themeDir, 'fonts', body.fonts)
      // Prune: si el usuario editó los stacks (tab Tipografías) y dejó de
      // usar una familia cargada, se regenera el bloque para que el CSS no
      // cargue fuentes sin uso. El rebuild lo dispara el cliente tras save.
      const projectRoot = found.projectRoot || dirname(found.themeDir!)
      const configPath = join(projectRoot, 'panda.config.ts')
      if (existsSync(configPath)) syncBlock(found.themeDir!, projectRoot, readFileSync(configPath, 'utf8'))
    }
    if (body.spacing) writeFlat(found.themeDir, 'spacing', body.spacing)
    if (body.radii) writeFlat(found.themeDir, 'radii', body.radii)
    return { ok: true }
  } catch (e) {
    return { ok: false, error: String(e) }
  }
})

// ── API: rebuild (codegen + cssgen) ───────────────────────────────────────
/**
 * codegen + cssgen en la raíz del proyecto (donde está panda.config.ts),
 * nunca en process.cwd() — el editor puede haberse lanzado desde un
 * subdirectorio. Se reusa para el rebuild manual (POST /api/rebuild) y para
 * los rebuilds automáticos tras añadir/asignar/desasignar fuentes.
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

app.post('/api/rebuild', () => {
  const found = resolveTheme(process.cwd())
  const cwd = found.projectRoot || process.cwd()
  const result = runRebuild(cwd)
  return { ok: result.ok, codegen: result.codegen, cssgen: result.cssgen }
})

// ── API: fuentes (modelo npm — catálogo, añadir, disponibles, asignar) ─────
// El proveedor por defecto es Fontsource. Flujo: buscar en el catálogo →
// `bun add @fontsource/{id}` (queda DISPONIBLE en node_modules) → asignar a
// un token (única operación que carga la fuente: fonts.ts + globalFontface →
// cssgen la compila en styles.css). Ver config-ui/fonts-api.ts.

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

app.get('/api/fonts/search', async ({ query }) => {
  const found = resolveTheme(process.cwd())
  const err = themeError(found)
  if (err) return err
  const q = query.q ?? ''
  try {
    const results = await searchFonts(q)
    return { ok: true, results }
  } catch (e) {
    return { ok: false, error: `Fontsource: ${String(e)}` }
  }
})

app.get('/api/fonts/available', () => {
  const found = resolveTheme(process.cwd())
  const err = themeError(found)
  if (err) return err
  try {
    const themeDir = found.themeDir!
    const projectRoot = found.projectRoot || dirname(themeDir)
    // Autocuración 0: garantiza los roles tipográficos (display) en fonts.ts.
    if (ensureRoleTokens(themeDir)) runRebuild(projectRoot)
    // Autocuración 1: migra instalaciones self-hosted antiguas ({raiz}/fonts)
    // a paquetes npm (bun add + fonts-loaded.json + limpieza).
    const migrated = migrateLegacyFonts(themeDir, projectRoot)
    // Autocuración 2: bloque globalFontface = (cargadas ∩ referenciadas) y
    // estado sin familias inertes.
    pruneLoaded(themeDir)
    const configPath = join(projectRoot, 'panda.config.ts')
    const src = existsSync(configPath) ? readFileSync(configPath, 'utf8') : ''
    if (src && syncBlock(themeDir, projectRoot, src)) runRebuild(projectRoot)
    // wired: las fuentes cargadas compilan en styles.css vía Panda.
    const wired = src !== '' && fontfaceWired(src)
    const available = availableFonts(projectRoot)
    const tokens = readFontsTokens(themeDir)
    const loaded = Object.entries(readLoaded(themeDir)).flatMap(([rawKey, lf]) => {
      const parsed = parseLoadedKey(rawKey)
      if (!parsed) return []
      return [{
        id: parsed.id,
        variable: parsed.variable,
        family: lf.family,
        weights: lf.weights,
        styles: lf.styles,
        subsets: lf.subsets,
        tokens: tokensForFamily(tokens, lf.family),
      }]
    })
    return { ok: true, available, loaded, wired, migrated }
  } catch (e) {
    return { ok: false, error: String(e) }
  }
})

/** Añade el paquete @fontsource/{id} al proyecto (queda DISPONIBLE). */
app.post('/api/fonts/add', async ({ request }) => {
  const found = resolveTheme(process.cwd())
  const err = themeError(found)
  if (err) return err
  const body = await request.json().catch(() => ({})) as Record<string, unknown>
  const id = sanitizeFontId(String(body.id ?? ''))
  if (!id) return { ok: false, error: 'Falta el id de la fuente.' }
  try {
    const projectRoot = found.projectRoot || dirname(found.themeDir!)
    const variable = !!body.variable
    if (!packageMeta(projectRoot, id, variable)) {
      const r = bunAdd(projectRoot, id, variable)
      if (!r.ok) {
        return { ok: false, error: `bun add ${packageScope(variable)}/${id} falló: ${r.output.slice(-250)}` }
      }
    }
    const meta = packageMeta(projectRoot, id, variable)
    return { ok: true, id, meta }
  } catch (e) {
    return { ok: false, error: String(e) }
  }
})

/** Asigna una fuente disponible a un token — la única operación que carga la fuente. */
app.post('/api/fonts/assign', async ({ request }) => {
  const found = resolveTheme(process.cwd())
  const err = themeError(found)
  if (err) return err
  const body = await request.json().catch(() => ({})) as Record<string, unknown>
  if (!body.id || !body.token) return { ok: false, error: 'Faltan id y token.' }
  try {
    const themeDir = found.themeDir!
    const projectRoot = found.projectRoot || dirname(themeDir)
    const res = assignFont(themeDir, projectRoot, {
      id: String(body.id),
      token: String(body.token),
      variable: !!body.variable,
      weights: Array.isArray(body.weights) ? body.weights.map(Number) : undefined,
      styles: Array.isArray(body.styles) ? body.styles.map(String) : undefined,
      subsets: Array.isArray(body.subsets) ? body.subsets.map(String) : undefined,
    })
    if (!res.ok) return { ok: false, error: res.error }
    const rebuild = res.changed ? runRebuild(projectRoot) : { ok: true }
    return {
      ok: true,
      family: res.family,
      token: res.token,
      value: res.value,
      wired: res.changed,
      rebuildOk: rebuild.ok,
      ...(rebuild.ok ? {} : { rebuildError: rebuild.codegen || rebuild.cssgen || 'rebuild failed' }),
    }
  } catch (e) {
    return { ok: false, error: String(e) }
  }
})

/** Desasigna una familia: resetea sus tokens y la quita del bloque. */
app.post('/api/fonts/unassign', async ({ request }) => {
  const found = resolveTheme(process.cwd())
  const err = themeError(found)
  if (err) return err
  const body = await request.json().catch(() => ({})) as Record<string, unknown>
  if (!body.id) return { ok: false, error: 'Falta el id de la fuente.' }
  try {
    const themeDir = found.themeDir!
    const projectRoot = found.projectRoot || dirname(themeDir)
    const res = unassignFont(themeDir, projectRoot, String(body.id), !!body.variable)
    if (!res.ok) return { ok: false, error: res.error }
    const rebuild = res.changed ? runRebuild(projectRoot) : { ok: true }
    return {
      ok: true,
      resetTokens: res.resetTokens,
      wired: false,
      rebuildOk: rebuild.ok,
      ...(rebuild.ok ? {} : { rebuildError: rebuild.codegen || rebuild.cssgen || 'rebuild failed' }),
    }
  } catch (e) {
    return { ok: false, error: String(e) }
  }
})

/** Desasigna (si estaba) y ejecuta `bun remove @fontsource/{id}`. */
app.post('/api/fonts/remove', async ({ request }) => {
  const found = resolveTheme(process.cwd())
  const err = themeError(found)
  if (err) return err
  const body = await request.json().catch(() => ({})) as Record<string, unknown>
  if (!body.id) return { ok: false, error: 'Falta el id de la fuente.' }
  try {
    const themeDir = found.themeDir!
    const projectRoot = found.projectRoot || dirname(themeDir)
    const res = removePackage(themeDir, projectRoot, String(body.id), !!body.variable)
    if (!res.ok) return { ok: false, error: res.error }
    const rebuild = res.changed ? runRebuild(projectRoot) : { ok: true }
    return {
      ok: true,
      resetTokens: res.resetTokens,
      wired: false,
      rebuildOk: rebuild.ok,
      ...(rebuild.ok ? {} : { rebuildError: rebuild.codegen || rebuild.cssgen || 'rebuild failed' }),
    }
  } catch (e) {
    return { ok: false, error: String(e) }
  }
})

/** woff2 del paquete node_modules/@fontsource/{id}/files (preview local). */
app.get('/api/fonts/file/:id/:file', ({ params, query }) => {
  const found = resolveTheme(process.cwd())
  const err = themeError(found)
  if (err) return err
  const projectRoot = found.projectRoot || dirname(found.themeDir!)
  const variable = query.variable === '1' || query.v === '1'
  const p = packageFontFilePath(projectRoot, params.id, params.file, variable)
  if (!p) return new Response('Not found', { status: 404 })
  const ext = p.split('.').pop() || ''
  return new Response(readFileSync(p), {
    headers: { 'Content-Type': FONT_TYPES[ext] || 'application/octet-stream' },
  })
})

// ── API: plugins PostCSS (catálogo oficial postcss.org + npm) ───────────────
// El catálogo (https://postcss.org/docs/postcss-plugins) lista los plugins
// oficiales; "Install" ejecuta `bun add {paquete}` en la raíz del proyecto
// (queda disponible en node_modules). La configuración del pipeline es una
// fase posterior. Mismo contrato que fonts: requiere theme resuelto.

/** Catálogo oficial (filtrando por q si viene) — proxy de postcss.org. */
app.get('/api/postcss/catalog', async ({ query }) => {
  const found = resolveTheme(process.cwd())
  const err = themeError(found)
  if (err) return err
  try {
    await catalog() // pobla la caché (searchCatalog filtra sobre ella)
    return { ok: true, categories: searchCatalog(String(query.q ?? '')) }
  } catch (e) {
    return { ok: false, error: `postcss.org: ${String(e)}` }
  }
})

/** Plugins del catálogo presentes en node_modules del proyecto. */
app.get('/api/postcss/available', async () => {
  const found = resolveTheme(process.cwd())
  const err = themeError(found)
  if (err) return err
  const projectRoot = found.projectRoot || dirname(found.themeDir!)
  try {
    const categories = await catalog()
    return { ok: true, available: availablePlugins(projectRoot, categories) }
  } catch (e) {
    return { ok: false, error: `postcss.org: ${String(e)}` }
  }
})

/** Resuelve el paquete npm de un plugin del catálogo y corre `bun add`. */
app.post('/api/postcss/install', async ({ request }) => {
  const found = resolveTheme(process.cwd())
  const err = themeError(found)
  if (err) return err
  const body = await request.json().catch(() => ({})) as Record<string, unknown>
  const name = String(body.name ?? '').trim()
  if (!name) return { ok: false, error: 'Falta el nombre del plugin.' }
  const projectRoot = found.projectRoot || dirname(found.themeDir!)
  try {
    const categories = await catalog()
    const plugin = categories.flatMap((c) => c.plugins).find((p) => p.name === name)
    if (!plugin) return { ok: false, error: `'${name}' no está en el listado oficial.` }
    const pkg = await resolveNpmPackage(plugin.name, plugin.url)
    if (!pkg) {
      return { ok: false, error: `No hay paquete npm para '${name}' (${plugin.url}).` }
    }
    if (packageInstalled(projectRoot, pkg)) {
      return { ok: true, name, pkg, already: true }
    }
    const r = bunAddPackage(projectRoot, pkg)
    if (!r.ok) return { ok: false, error: `bun add ${pkg} falló: ${r.output.slice(-250)}` }
    return { ok: true, name, pkg, already: false }
  } catch (e) {
    return { ok: false, error: String(e) }
  }
})

/** `bun remove {paquete}` (el pkg npm real, no el nombre del listado). */
app.post('/api/postcss/remove', async ({ request }) => {
  const found = resolveTheme(process.cwd())
  const err = themeError(found)
  if (err) return err
  const body = await request.json().catch(() => ({})) as Record<string, unknown>
  const pkg = String(body.pkg ?? '').trim()
  if (!pkg) return { ok: false, error: 'Falta el paquete.' }
  const projectRoot = found.projectRoot || dirname(found.themeDir!)
  try {
    const r = bunRemovePackage(projectRoot, pkg)
    if (!r.ok) return { ok: false, error: `bun remove ${pkg} falló: ${r.output.slice(-250)}` }
    return { ok: true, pkg }
  } catch (e) {
    return { ok: false, error: String(e) }
  }
})

// El CSS inline (config-ui.css) referencia las fuentes como rutas relativas
// (fonts/xxx.woff2, copiadas por postcss-url) — el navegador las pide al
// server, así que hay que servirlas desde config-ui/fonts/.
app.get('/fonts/*', ({ params }) => {
  const rel = params['*'] ?? ''
  const file = join(UI_DIR, 'fonts', rel)
  if (!existsSync(file)) return new Response('Not found', { status: 404 })
  const ext = file.split('.').pop() || ''
  return new Response(readFileSync(file), {
    headers: { 'Content-Type': FONT_TYPES[ext] || 'application/octet-stream' },
  })
})

// 404 para rutas desconocidas (GET y POST). En Elysia 1.4 no existe
// `.notFound`; el hook es `onError` con `code === 'NOT_FOUND'`.
app.onError(({ code, set }) => {
  if (code === 'NOT_FOUND') {
    set.status = 404
    return new Response('Not found', { status: 404 })
  }
  return undefined
})

app.listen({ port: PORT })
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
