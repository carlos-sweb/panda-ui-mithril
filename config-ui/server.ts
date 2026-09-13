#!/usr/bin/env bun
/**
 * config-ui server — theme editor API (Elysia).
 *
 * `bunx panda-ui-mithril config` serves this server (by default on :1234):
 *   GET  /              → editor SPA (bundled with Bun.build)
 *   GET  /api/theme     → current theme values (JSON per category)
 *   POST /api/theme     → receives edits and rewrites pum/theme/*.ts
 *   POST /api/rebuild   → runs codegen + cssgen
 *   …and the remaining /api/fonts/* routes (see fonts-api.ts)
 *
 * Flags (read from process.argv — the bin already received them):
 *   --port <n> | --port=<n> | -p <n>   server port (default 1234)
 *   --dir <path> | --dir=<path> | -d   explicit base for the theme (see below)
 *   --no-open                          do not open the browser on startup
 *
 * The target is the consumer's theme files. Path resolution:
 *   - `--dir <path>` (or `-d`): uses `<path>` as the explicit base (accepts a
 *     project dir with pum/ or src/, or a direct theme dir with colors.ts).
 *   - without a flag: upward search from process.cwd() — `pum/theme` first
 *     (consumer), then `src/theme` (this repo/playground).
 *   - legacy layout: if `pum/theme.ts` exists as a single file but NOT the
 *     `pum/theme/` folder, the editor cannot edit it → it responds with a
 *     migration hint (`bunx panda-ui-mithril init`, which preserves the values).
 *
 * On startup it opens the URL in the system browser (xdg-open / open /
 * start depending on the platform).
 *
 * The SPA (config-ui/) is bundled with Bun.build at runtime — it resolves the
 * bare imports (mithril, lucide-mithril, ...) that the browser does not understand.
 *
 * Framework: Elysia (https://elysiajs.com/). Preserved Bao HTTP contract:
 * the handlers return the JSON object directly (Elysia serializes it) or a
 * `new Response(...)` for raw content; the JSON body is parsed with
 * `request.json().catch(() => ({}))` (tolerant, same as before); the 404 is
 * resolved in `onError` with `code === 'NOT_FOUND'`.
 */
import { Elysia } from 'elysia'
import { existsSync, readFileSync, statSync, writeFileSync } from 'node:fs'
import { gzipSync } from 'node:zlib'
import { dirname, join, relative, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { spawn, spawnSync } from 'node:child_process'
import { ensureToken, parseColors, parseFlat, removeToken, writeColorsSrc, writeFlatSrc } from './theme-io'
import {
  assignFont, availableFonts, bunAdd, ensureRoleTokens, fontfaceWired, migrateLegacyFonts,
  packageFontFilePath, packageMeta, packageScope, parseLoadedKey, pruneLoaded,
  readFontsTokens, readLoaded, readOutdir, removePackage, sanitizeFontId, searchFonts, syncBlock,
  tokensForFamily, unassignFont,
} from './fonts-api'
import {
  availablePlugins, bunAddPackage, bunRemovePackage, buildConfigPath, catalog,
  hasPostcssConfig, packageInstalled, pipelineConfigPath, readBuildConfig,
  readPipelineConfig, resolveNpmPackage, sanitizePipelineConfig, searchCatalog,
  writeBuildConfig, writePipelineConfig,
} from './postcss-api'
import { schemaFor, PANDA_PLUGIN_ID } from './postcss-schemas'
import { readLightningcss, resolveTargets, writeLightningcss } from './lightningcss-api'
import { readStaticCssState, scanProject, writeStaticCssState } from './staticcss-scan-api'
import { readAdvancedState, writeAdvancedState } from './advanced-config-api'

const PORT = portFromArgv() ?? 1234
const NO_OPEN = noOpenFromArgv()
const CLI_DIR = dirname(fileURLToPath(import.meta.url))
// config-ui/server.ts → the package root is ../ (node_modules/panda-ui-mithril/)
const PKG_DIR = join(CLI_DIR, '..')
const UI_DIR = join(PKG_DIR, 'config-ui')

const app = new Elysia()

// Content types for serving binaries (editor and project fonts).
const FONT_TYPES: Record<string, string> = {
  woff2: 'font/woff2', woff: 'font/woff', ttf: 'font/ttf', otf: 'font/otf',
  svg: 'image/svg+xml', png: 'image/png', ico: 'image/x-icon',
}

// ── SPA bundle (Bun.build at runtime) ─────────────────────────────────────
// The JS is bundled (it resolves bare imports). The CSS is NOT taken from the
// bundle: the editor uses its own CSS generated with Panda postcss
// (config-ui/config-ui.css, produced by scripts/build-config-ui.ts), which
// includes tokens + recipes + page styles.
let editorJs = ''
let editorCss = ''
try {
  const out = await Bun.build({
    entrypoints: [join(UI_DIR, 'main.jsx')],
    outdir: '/tmp/pum-config-ui-build',
    naming: '[name].[ext]',
    minify: false,
    sourcemap: 'inline',
    // Mithril's classic JSX transform, forced here instead of inherited. The
    // editor's own SPA must NOT depend on the CONSUMER's tsconfig.json carrying
    // `jsx: "react"` + `jsxFactory: "m"`: Bun.build resolves JSX per file, so a
    // project without those fields (hand-written config, or a tsconfig that
    // does not reach this file) fell back to the automatic React runtime and
    // died with `Could not resolve: "react/jsx-dev-runtime"` — serving a BLANK
    // editor with only a stderr line. Verified with this option: the bundle
    // emits `import_mithril.default(...)` (662 calls) and references no React.
    jsx: { runtime: 'classic', factory: 'm', fragment: 'm.Fragment' },
  })
  for (const artifact of out.outputs) {
    if (artifact.kind === 'entry-point') editorJs = await artifact.text()
  }
  const generatedCss = join(UI_DIR, 'config-ui.css')
  if (existsSync(generatedCss)) {
    editorCss = readFileSync(generatedCss, 'utf8')
  } else {
    console.error('config-ui: config-ui.css is missing — run bun run scripts/build-config-ui.ts')
  }
} catch (e) {
  console.error('config-ui: Bun.build failed:', String(e))
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

// ── API: read theme ───────────────────────────────────────────────────────
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
    // false → the edited theme is NOT the one of the project being recompiled
    // (the UI can warn before the user touches anything; the POSTs reject it).
    themeOwnedByProject: found.themeOwnedByProject !== false,
  }
})

// ── API: write theme ──────────────────────────────────────────────────────
/** `{ [token]: { base, dark } }` — the shape the Colors tab sends. */
function isThemeColorMap(v: unknown): v is Record<string, { base: string; dark: string }> {
  if (!v || typeof v !== 'object' || Array.isArray(v)) return false
  return Object.values(v).every(
    (entry) =>
      !!entry &&
      typeof entry === 'object' &&
      typeof (entry as { base?: unknown }).base === 'string' &&
      typeof (entry as { dark?: unknown }).dark === 'string',
  )
}

/** `{ [token]: value }` — the shape the Fonts, Spacing and Radii tabs send. */
function isStringRecord(v: unknown): v is Record<string, string> {
  if (!v || typeof v !== 'object' || Array.isArray(v)) return false
  return Object.values(v).every((value) => typeof value === 'string')
}

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
  const ownErr = themeOwnershipError(found)
  if (ownErr) return ownErr

  const body = await request.json().catch(() => ({})) as Record<string, unknown>
  // The payload comes from our own SPA, but this is still an HTTP boundary:
  // check the shape here instead of casting `unknown` away, and reject a
  // malformed payload BEFORE writing anything (a partial write would leave the
  // theme half-updated).
  if (body.colors !== undefined && !isThemeColorMap(body.colors)) return { ok: false, error: 'Invalid colors payload.' }
  if (body.fonts !== undefined && !isStringRecord(body.fonts)) return { ok: false, error: 'Invalid fonts payload.' }
  if (body.spacing !== undefined && !isStringRecord(body.spacing)) return { ok: false, error: 'Invalid spacing payload.' }
  if (body.radii !== undefined && !isStringRecord(body.radii)) return { ok: false, error: 'Invalid radii payload.' }
  try {
    if (body.colors) writeColors(found.themeDir, body.colors)
    if (body.fonts) {
      // Role token structure (fonts.ts): remove/add entries that
      // writeFlatSrc cannot create on its own (it only replaces values).
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
      // Prune: if the user edited the stacks (Fonts tab) and stopped
      // using a loaded family, the block is regenerated so the CSS does not
      // load unused fonts. The client triggers the rebuild after save.
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

// ── API: rebuild (codegen + cssgen, or postcss pipeline) ──────────────────
/**
 * Regenerates the project CSS at its root (where panda.config.ts lives), never
 * in process.cwd() — the editor may have been launched from a subdirectory.
 *
 * Postcss-aware: if the project has postcss.config.cjs (the model recommended
 * by Panda), it runs `panda codegen` + the postcss pipeline declared in that
 * file over the css entry (configurable; default pum/index.css) into the
 * output (default styled-system/styles.css). Otherwise it keeps the classic
 * `panda codegen && panda cssgen` flow.
 */
/**
 * Result of a rebuild: `mode` says which pipeline ran and the unused tool slot
 * is `null`. `codegen`/`cssgen` carry the tail of stderr, or undefined when the
 * tool printed nothing.
 */
type RebuildResult =
  | { ok: boolean; mode: 'postcss'; codegen: string | undefined; postcss: string; cssgen: null }
  | { ok: boolean; mode: 'cssgen'; codegen: string | undefined; cssgen: string | undefined; postcss: null }

function runRebuild(projectRoot: string, themeDir?: string | null): RebuildResult {
  const codegen = spawnSync('bunx', ['panda', 'codegen'], { cwd: projectRoot, encoding: 'utf8' })

  if (themeDir && hasPostcssConfig(projectRoot)) {
    const build = readBuildConfig(themeDir)
    const runner = join(UI_DIR, 'postcss-runner.cjs')
    const r = spawnSync('bun', [runner, projectRoot, build.entry, build.output], {
      cwd: projectRoot,
      encoding: 'utf8',
      timeout: 240_000,
    })
    return {
      ok: codegen.status === 0 && r.status === 0,
      codegen: codegen.stderr?.slice(-200),
      postcss: String(r.stdout || '') + String(r.stderr || ''),
      cssgen: null,
      mode: 'postcss' as const,
    }
  }

  const cssgen = spawnSync('bunx', ['panda', 'cssgen'], { cwd: projectRoot, encoding: 'utf8' })
  return {
    ok: codegen.status === 0 && cssgen.status === 0,
    codegen: codegen.stderr?.slice(-200),
    cssgen: cssgen.stderr?.slice(-200),
    postcss: null,
    mode: 'cssgen' as const,
  }
}

app.post('/api/rebuild', () => {
  const found = resolveTheme(process.cwd())
  const ownErr = themeOwnershipError(found)
  if (ownErr) return ownErr
  const cwd = found.projectRoot || process.cwd()
  const result = runRebuild(cwd, found.themeDir)
  return {
    ok: result.ok,
    codegen: result.codegen,
    cssgen: result.cssgen,
    postcss: result.postcss,
    mode: result.mode,
    output: outputCssStat(cwd, found.themeDir),
  }
})

/**
 * Size of the project's output CSS (the one linked by index.html) after a
 * rebuild: `{ path, bytes, gzipBytes, mtime }`, or null if it does not exist yet.
 *
 * The path comes from the editor's build config (`postcss.build.json`) when the
 * project has a postcss pipeline, or from the `outdir` of `panda.config.ts`
 * (default `styled-system`) + `styles.css` in the classic `codegen + cssgen`
 * flow. The gzip is computed from the file itself, which is what actually
 * travels over the network.
 */
function outputCssStat(
  projectRoot: string,
  themeDir?: string | null,
): { path: string; bytes: number; gzipBytes: number; mtime: number } | null {
  try {
    const rel = themeDir && hasPostcssConfig(projectRoot)
      ? readBuildConfig(themeDir).output
      : join(readOutdir(readFileSync(join(projectRoot, 'panda.config.ts'), 'utf8')), 'styles.css')
    const abs = resolve(projectRoot, rel)
    if (!existsSync(abs)) return null
    const buf = readFileSync(abs)
    return {
      path: rel,
      bytes: buf.byteLength,
      gzipBytes: gzipSync(buf).byteLength,
      mtime: statSync(abs).mtimeMs,
    }
  } catch {
    // Without panda.config.ts, a nonexistent or unreadable output: the rebuild
    // is still valid, there is simply no size to report.
    return null
  }
}

// ── API: fonts (npm model — catalog, add, available, assign) ──────────────
// The default provider is Fontsource. Flow: search the catalog →
// `bun add @fontsource/{id}` (it becomes AVAILABLE in node_modules) → assign
// to a token (the only operation that loads the font: fonts.ts + globalFontface
// → cssgen compiles it into styles.css). See config-ui/fonts-api.ts.

/**
 * Theme error shared by the font routes (same contract as
 * /api/theme). null if the theme is editable.
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
    // Self-healing 0: guarantees the typographic roles (display) in fonts.ts.
    if (ensureRoleTokens(themeDir)) runRebuild(projectRoot, themeDir)
    // Self-healing 1: migrates old self-hosted installs ({root}/fonts)
    // to npm packages (bun add + fonts-loaded.json + cleanup).
    const migrated = migrateLegacyFonts(themeDir, projectRoot)
    // Self-healing 2: globalFontface block = (loaded ∩ referenced) and
    // state without inert families.
    pruneLoaded(themeDir)
    const configPath = join(projectRoot, 'panda.config.ts')
    const src = existsSync(configPath) ? readFileSync(configPath, 'utf8') : ''
    if (src && syncBlock(themeDir, projectRoot, src)) runRebuild(projectRoot, themeDir)
    // wired: the loaded fonts compile into styles.css via Panda.
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

/** Adds the @fontsource/{id} package to the project (it becomes AVAILABLE). */
app.post('/api/fonts/add', async ({ request }) => {
  const found = resolveTheme(process.cwd())
  const err = themeError(found)
  if (err) return err
  const ownErr = themeOwnershipError(found)
  if (ownErr) return ownErr
  const body = await request.json().catch(() => ({})) as Record<string, unknown>
  const id = sanitizeFontId(String(body.id ?? ''))
  if (!id) return { ok: false, error: 'Missing the font id.' }
  try {
    const projectRoot = found.projectRoot || dirname(found.themeDir!)
    const variable = !!body.variable
    if (!packageMeta(projectRoot, id, variable)) {
      const r = bunAdd(projectRoot, id, variable)
      if (!r.ok) {
        return { ok: false, error: `bun add ${packageScope(variable)}/${id} failed: ${r.output.slice(-250)}` }
      }
    }
    const meta = packageMeta(projectRoot, id, variable)
    return { ok: true, id, meta }
  } catch (e) {
    return { ok: false, error: String(e) }
  }
})

/** Assigns an available font to a token — the only operation that loads the font. */
app.post('/api/fonts/assign', async ({ request }) => {
  const found = resolveTheme(process.cwd())
  const err = themeError(found)
  if (err) return err
  const ownErr = themeOwnershipError(found)
  if (ownErr) return ownErr
  const body = await request.json().catch(() => ({})) as Record<string, unknown>
  if (!body.id || !body.token) return { ok: false, error: 'Missing id and token.' }
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
    // `null` = nothing changed, so there was nothing to rebuild: a distinct
    // case from "a rebuild ran and failed" (which is `{ ok: false, … }`).
    const rebuild = res.changed ? runRebuild(projectRoot, themeDir) : null
    return {
      ok: true,
      family: res.family,
      token: res.token,
      value: res.value,
      wired: res.changed,
      rebuildOk: rebuild ? rebuild.ok : true,
      ...(rebuild && !rebuild.ok ? { rebuildError: rebuild.codegen || rebuild.cssgen || 'rebuild failed' } : {}),
    }
  } catch (e) {
    return { ok: false, error: String(e) }
  }
})

/** Unassigns a family: resets its tokens and removes it from the block. */
app.post('/api/fonts/unassign', async ({ request }) => {
  const found = resolveTheme(process.cwd())
  const err = themeError(found)
  if (err) return err
  const ownErr = themeOwnershipError(found)
  if (ownErr) return ownErr
  const body = await request.json().catch(() => ({})) as Record<string, unknown>
  if (!body.id) return { ok: false, error: 'Missing the font id.' }
  try {
    const themeDir = found.themeDir!
    const projectRoot = found.projectRoot || dirname(themeDir)
    const res = unassignFont(themeDir, projectRoot, String(body.id), !!body.variable)
    if (!res.ok) return { ok: false, error: res.error }
    // `null` = nothing changed, so there was nothing to rebuild: a distinct
    // case from "a rebuild ran and failed" (which is `{ ok: false, … }`).
    const rebuild = res.changed ? runRebuild(projectRoot, themeDir) : null
    return {
      ok: true,
      resetTokens: res.resetTokens,
      wired: false,
      rebuildOk: rebuild ? rebuild.ok : true,
      ...(rebuild && !rebuild.ok ? { rebuildError: rebuild.codegen || rebuild.cssgen || 'rebuild failed' } : {}),
    }
  } catch (e) {
    return { ok: false, error: String(e) }
  }
})

/** Unassigns (if it was assigned) and runs `bun remove @fontsource/{id}`. */
app.post('/api/fonts/remove', async ({ request }) => {
  const found = resolveTheme(process.cwd())
  const err = themeError(found)
  if (err) return err
  const ownErr = themeOwnershipError(found)
  if (ownErr) return ownErr
  const body = await request.json().catch(() => ({})) as Record<string, unknown>
  if (!body.id) return { ok: false, error: 'Missing the font id.' }
  try {
    const themeDir = found.themeDir!
    const projectRoot = found.projectRoot || dirname(themeDir)
    const res = removePackage(themeDir, projectRoot, String(body.id), !!body.variable)
    if (!res.ok) return { ok: false, error: res.error }
    // `null` = nothing changed, so there was nothing to rebuild: a distinct
    // case from "a rebuild ran and failed" (which is `{ ok: false, … }`).
    const rebuild = res.changed ? runRebuild(projectRoot, themeDir) : null
    return {
      ok: true,
      resetTokens: res.resetTokens,
      wired: false,
      rebuildOk: rebuild ? rebuild.ok : true,
      ...(rebuild && !rebuild.ok ? { rebuildError: rebuild.codegen || rebuild.cssgen || 'rebuild failed' } : {}),
    }
  } catch (e) {
    return { ok: false, error: String(e) }
  }
})

/** woff2 from the node_modules/@fontsource/{id}/files package (local preview). */
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

// ── API: PostCSS plugins (official postcss.org catalog + npm) ───────────────
// The catalog (https://postcss.org/docs/postcss-plugins) lists the official
// plugins; "Install" runs `bun add {package}` at the project root (it becomes
// available in node_modules). Configuring the pipeline is a later phase.
// Same contract as fonts: it requires a resolved theme.

/** Official catalog (filtering by q when provided) — postcss.org proxy. */
app.get('/api/postcss/catalog', async ({ query }) => {
  const found = resolveTheme(process.cwd())
  const err = themeError(found)
  if (err) return err
  try {
    await catalog() // populates the cache (searchCatalog filters over it)
    return { ok: true, categories: searchCatalog(String(query.q ?? '')) }
  } catch (e) {
    return { ok: false, error: `postcss.org: ${String(e)}` }
  }
})

/** Catalog plugins present in the project's node_modules. */
app.get('/api/postcss/available', async () => {
  const found = resolveTheme(process.cwd())
  const err = themeError(found)
  if (err) return err
  const projectRoot = found.projectRoot || dirname(found.themeDir!)
  try {
    const categories = await catalog()
    const available = availablePlugins(projectRoot, categories).map((p) => ({
      ...p,
      // The plugin has a curated schema (typed editor) or is a known pack.
      configurable: !!schemaFor(p.npm) || !!schemaFor(p.name),
    }))
    return { ok: true, available }
  } catch (e) {
    return { ok: false, error: `postcss.org: ${String(e)}` }
  }
})

/** Resolves the npm package of a catalog plugin and runs `bun add`. */
app.post('/api/postcss/install', async ({ request }) => {
  const found = resolveTheme(process.cwd())
  const err = themeError(found)
  if (err) return err
  const ownErr = themeOwnershipError(found)
  if (ownErr) return ownErr
  const body = await request.json().catch(() => ({})) as Record<string, unknown>
  const name = String(body.name ?? '').trim()
  if (!name) return { ok: false, error: 'Missing the plugin name.' }
  const projectRoot = found.projectRoot || dirname(found.themeDir!)
  try {
    const categories = await catalog()
    const plugin = categories.flatMap((c) => c.plugins).find((p) => p.name === name)
    if (!plugin) return { ok: false, error: `'${name}' is not in the plugin list.` }
    const pkg = await resolveNpmPackage(plugin.name, plugin.url)
    if (!pkg) {
      return { ok: false, error: `No npm package for '${name}' (${plugin.url}).` }
    }
    if (packageInstalled(projectRoot, pkg)) {
      return { ok: true, name, pkg, already: true }
    }
    const r = bunAddPackage(projectRoot, pkg)
    if (!r.ok) return { ok: false, error: `bun add ${pkg} failed: ${r.output.slice(-250)}` }
    return { ok: true, name, pkg, already: false }
  } catch (e) {
    return { ok: false, error: String(e) }
  }
})

/** `bun remove {package}` (the real npm pkg, not the listing name). */
app.post('/api/postcss/remove', async ({ request }) => {
  const found = resolveTheme(process.cwd())
  const err = themeError(found)
  if (err) return err
  const ownErr = themeOwnershipError(found)
  if (ownErr) return ownErr
  const body = await request.json().catch(() => ({})) as Record<string, unknown>
  const pkg = String(body.pkg ?? '').trim()
  if (!pkg) return { ok: false, error: 'Missing the package.' }
  const projectRoot = found.projectRoot || dirname(found.themeDir!)
  try {
    const r = bunRemovePackage(projectRoot, pkg)
    if (!r.ok) return { ok: false, error: `bun remove ${pkg} failed: ${r.output.slice(-250)}` }
    return { ok: true, pkg }
  } catch (e) {
    return { ok: false, error: String(e) }
  }
})

// ── API: pipeline config (postcss.config.cjs — build css plugins) ───────────
// The source of truth is postcss.config.cjs at the project root (the model
// recommended by Panda: the Panda plugin as a layer + plugins with options,
// a managed block between markers). The build (entry/output) lives in
// {root}/postcss.build.json, configurable by the user.

/** Reads the pipeline (postcss.config.cjs) + build config (entry/output). */
app.get('/api/postcss/config', () => {
  const found = resolveTheme(process.cwd())
  const err = themeError(found)
  if (err) return err
  const themeDir = found.themeDir!
  const projectRoot = found.projectRoot || dirname(themeDir)
  try {
    const plugins = readPipelineConfig(projectRoot)
    const build = readBuildConfig(themeDir)
    return {
      ok: true,
      path: relative(process.cwd(), pipelineConfigPath(projectRoot)),
      hasConfig: hasPostcssConfig(projectRoot),
      plugins,
      build,
      buildPath: relative(process.cwd(), buildConfigPath(themeDir)),
      // Current size of the output CSS on disk (refreshed after /api/rebuild).
      outputStat: outputCssStat(projectRoot, themeDir),
    }
  } catch (e) {
    return { ok: false, error: String(e) }
  }
})

/** Writes the pipeline (plugins in postcss.config.cjs) + build config. */
app.post('/api/postcss/config', async ({ request }) => {
  const found = resolveTheme(process.cwd())
  const err = themeError(found)
  if (err) return err
  const ownErr = themeOwnershipError(found)
  if (ownErr) return ownErr
  const themeDir = found.themeDir!
  const projectRoot = found.projectRoot || dirname(themeDir)
  const body = await request.json().catch(() => ({})) as Record<string, unknown>
  try {
    const clean = sanitizePipelineConfig(body.plugins)
    if (!clean.ok) return { ok: false, error: clean.error }
    // Validates that the referenced plugins are installed. The Panda plugin
    // (@pandacss/dev/postcss) is NOT a standalone package: it is a subpath
    // of @pandacss/dev (always present if panda codegen works).
    const missing = clean.plugins
      .filter((pl) => pl.id !== PANDA_PLUGIN_ID)
      .filter((pl) => !packageInstalled(projectRoot, pl.id))
    if (missing.length > 0) {
      return {
        ok: false,
        error: `Not installed — use the Install tab: ${missing.map((p) => p.id).join(', ')}.`,
      }
    }
    const changed = writePipelineConfig(projectRoot, clean.plugins)
    let buildChanged = false
    if (body.build && typeof body.build === 'object') {
      const b = body.build as { entry?: unknown; output?: unknown }
      buildChanged = writeBuildConfig(themeDir, {
        entry: String(b.entry ?? ''),
        output: String(b.output ?? ''),
      })
    }
    return {
      ok: true,
      changed,
      buildChanged,
      path: relative(process.cwd(), pipelineConfigPath(projectRoot)),
      buildPath: relative(process.cwd(), buildConfigPath(themeDir)),
    }
  } catch (e) {
    return { ok: false, error: String(e) }
  }
})

// ── API: lightningcss (NATIVE Panda support — NOT a PostCSS plugin) ─────────
// panda.config.ts exposes top-level `lightningcss`/`browserslist`/`minify`;
// Panda auto-registers @pandacss/plugin-lightningcss internally when
// lightningcss=true (see applyAutoPlugins in @pandacss/node), both for
// `panda cssgen` and inside `@pandacss/dev/postcss` — that is why NO own
// runner is needed and runRebuild does not need touching. Same error contract
// as /api/theme (legacy / no theme).

/** Reads { enabled, browserslist, minify } from panda.config.ts. */
app.get('/api/lightningcss/config', () => {
  const found = resolveTheme(process.cwd())
  const err = themeError(found)
  if (err) return err
  const projectRoot = found.projectRoot || dirname(found.themeDir!)
  try {
    return { ok: true, config: readLightningcss(projectRoot) }
  } catch (e) {
    return { ok: false, error: String(e) }
  }
})

/** Writes { enabled, browserslist, minify } into panda.config.ts (marked block). */
app.post('/api/lightningcss/config', async ({ request }) => {
  const found = resolveTheme(process.cwd())
  const err = themeError(found)
  if (err) return err
  const ownErr = themeOwnershipError(found)
  if (ownErr) return ownErr
  const projectRoot = found.projectRoot || dirname(found.themeDir!)
  const body = await request.json().catch(() => ({})) as Record<string, unknown>
  try {
    const cfg = {
      enabled: !!body.enabled,
      browserslist: Array.isArray(body.browserslist) ? body.browserslist.map(String) : [],
      minify: !!body.minify,
      polyfill: !!body.polyfill,
    }
    const changed = writeLightningcss(projectRoot, cfg)
    return { ok: true, changed, config: cfg }
  } catch (e) {
    return { ok: false, error: String(e) }
  }
})

/** Resolves browserslist queries to real targets (preview) — uses the CONSUMER project's lightningcss/browserslist. */
app.get('/api/lightningcss/preview', ({ query }) => {
  const found = resolveTheme(process.cwd())
  const err = themeError(found)
  if (err) return err
  const projectRoot = found.projectRoot || dirname(found.themeDir!)
  const raw = query.q
  const queries = (Array.isArray(raw) ? raw : raw ? [raw] : []).flatMap((s) => String(s).split(','))
  return resolveTargets(projectRoot, queries)
})

// ── API: Static Css Recipes (reduce staticCss.recipes from '*' to what is used) ──
// Scans the SOURCE CODE of the installed package itself (PKG_DIR, the same
// panda-ui-mithril that runs config-ui — there is no need to resolve it from
// the consumer) to build the component->recipes / component->component
// (wrappers) graph, and the CONSUMER's code (the `include` glob of its
// panda.config.ts) to know which components it uses. See staticcss-scan-api.ts.
// Same error contract as /api/theme (legacy / no theme).

/** Reads the current state (without rescanning) — { enabled, recipes, manual, include }. */
app.get('/api/staticcss/config', () => {
  const found = resolveTheme(process.cwd())
  const err = themeError(found)
  if (err) return err
  const projectRoot = found.projectRoot || dirname(found.themeDir!)
  try {
    return { ok: true, ...readStaticCssState(projectRoot, dirname(found.themeDir!)) }
  } catch (e) {
    return { ok: false, error: String(e) }
  }
})

/** Scans the project (does not save) — preview of detected components + resulting recipes. */
app.post('/api/staticcss/scan', () => {
  const found = resolveTheme(process.cwd())
  const err = themeError(found)
  if (err) return err
  const ownErr = themeOwnershipError(found)
  if (ownErr) return ownErr
  const projectRoot = found.projectRoot || dirname(found.themeDir!)
  return scanProject(projectRoot, PKG_DIR)
})

/** Saves { enabled, recipes, manual } — enabled=false restores '*' (reverts everything). */
app.post('/api/staticcss/config', async ({ request }) => {
  const found = resolveTheme(process.cwd())
  const err = themeError(found)
  if (err) return err
  const ownErr = themeOwnershipError(found)
  if (ownErr) return ownErr
  const projectRoot = found.projectRoot || dirname(found.themeDir!)
  const body = await request.json().catch(() => ({})) as Record<string, unknown>
  try {
    const opts = {
      enabled: !!body.enabled,
      recipes: Array.isArray(body.recipes) ? body.recipes.map(String) : [],
      manual: Array.isArray(body.manual) ? body.manual.map(String) : [],
    }
    const changed = writeStaticCssState(projectRoot, dirname(found.themeDir!), opts)
    return { ok: true, changed }
  } catch (e) {
    return { ok: false, error: String(e) }
  }
})

// ── API: Advanced (curated subset of panda.config.ts with no UI of its own) ─
// preflight/strictTokens/strictPropertyValues/hash/clean (additive block, same
// mechanism as lightningcss) + include/exclude (surgical replacement, they
// already exist unmarked in cli.ts's scaffold). See advanced-config-api.ts
// for which defineConfig fields were deliberately left out
// (jsxFramework/jsxFactory fixed to Mithril, outdir fixed to styled-system,
// layers/separator require regenerating pum/index.css, hooks/plugins are not
// serializable, prefix SUSPENDED — verified risk, it breaks the WHOLE
// package, not just individual selectors).
// Same error contract as /api/theme (legacy / no theme).

/** Reads the current state — { preflight, strictTokens, strictPropertyValues, hash, clean, include, exclude }. */
app.get('/api/advanced/config', () => {
  const found = resolveTheme(process.cwd())
  const err = themeError(found)
  if (err) return err
  const projectRoot = found.projectRoot || dirname(found.themeDir!)
  try {
    return { ok: true, config: readAdvancedState(projectRoot) }
  } catch (e) {
    return { ok: false, error: String(e) }
  }
})

/** Saves the state — see AdvancedState in advanced-config-api.ts. */
app.post('/api/advanced/config', async ({ request }) => {
  const found = resolveTheme(process.cwd())
  const err = themeError(found)
  if (err) return err
  const ownErr = themeOwnershipError(found)
  if (ownErr) return ownErr
  const projectRoot = found.projectRoot || dirname(found.themeDir!)
  const body = await request.json().catch(() => ({})) as Record<string, unknown>
  try {
    const state = {
      preflight: !!body.preflight,
      strictTokens: !!body.strictTokens,
      strictPropertyValues: !!body.strictPropertyValues,
      hash: !!body.hash,
      clean: !!body.clean,
      include: Array.isArray(body.include) ? body.include.map(String) : [],
      exclude: Array.isArray(body.exclude) ? body.exclude.map(String) : [],
    }
    const changed = writeAdvancedState(projectRoot, state)
    return { ok: true, changed }
  } catch (e) {
    return { ok: false, error: String(e) }
  }
})

// The inline CSS (config-ui.css) references the fonts as relative paths
// (fonts/xxx.woff2, copied by postcss-url) — the browser requests them from
// the server, so they must be served from config-ui/fonts/.
app.get('/fonts/*', ({ params }) => {
  const rel = params['*'] ?? ''
  const file = join(UI_DIR, 'fonts', rel)
  if (!existsSync(file)) return new Response('Not found', { status: 404 })
  const ext = file.split('.').pop() || ''
  return new Response(readFileSync(file), {
    headers: { 'Content-Type': FONT_TYPES[ext] || 'application/octet-stream' },
  })
})

// 404 for unknown routes (GET and POST). In Elysia 1.4 there is no
// `.notFound`; the hook is `onError` with `code === 'NOT_FOUND'`.
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

// Opens the URL in the system browser (best-effort: if it fails or there is no
// browser, the server keeps working and the URL was printed above).
// With `--no-open` (or BROWSER=none) nothing is launched: it only warns on stdout.
if (NO_OPEN) {
  console.log('(browser not opened: --no-open — open the URL above by hand)')
} else {
  setTimeout(() => openBrowser(url), 150)
}

// ── Helpers: theme path resolution ────────────────────────────────────────
/**
 * Resolves the target theme. Returns:
 *   { themeDir, projectRoot, legacy }
 * - themeDir:  dir with colors.ts (null if not found).
 * - projectRoot: project root dir (where panda.config.ts lives).
 * - legacy:    true if there is a single-file pum/theme.ts (old layout).
 */
/**
 * The editor can only operate on the theme of the project it RECOMPILES: its
 * `panda.config.ts` imports its own `pum/preset`, so a theme living in another
 * directory (real case: `config --dir=src/pages/login` when that SPA does not
 * have its `panda.config.ts` yet) is used by nobody — editing it would have
 * no effect and the CSS would be written to the root project, silently. Returns
 * the error to display, or null if the theme does belong to the project.
 */
function themeOwnershipError(found: {
  themeDir: string | null
  projectRoot: string | null
  themeOwnedByProject?: boolean
}) {
  if (!found.themeDir || !found.projectRoot || found.themeOwnedByProject !== false) return null
  // The cwd itself is shown as an absolute path (a "." says nothing).
  const rel = (path: string) => {
    const r = relative(process.cwd(), path)
    return r === '' ? path : r
  }
  const themeRel = rel(found.themeDir)
  const projectRel = rel(found.projectRoot)
  const spaDir = themeRel.replace(/\/(pum\/theme|src\/theme|theme)$/, '')
  return {
    ok: false,
    error:
      `The theme pointed at (${themeRel}) is not the one of the project being recompiled (${projectRel}): ` +
      'its panda.config.ts imports its own pum/preset, so editing this theme would have ' +
      `no effect and the CSS would be written to ${projectRel}. Create a project of its own for that SPA ` +
      'and point the editor there.',
    hint: `bunx panda-ui-mithril init --dir=${spaDir}`,
  }
}

function resolveTheme(cwd: string) {
  const explicit = themeDirFromArgv()
  const candidates = explicit ? [explicit] : walkUp(cwd)

  // Is the resolved theme the one of the project being recompiled? The three
  // canonical locations inside projectRoot; see themeOwnershipError.
  const owned = (themeDir: string, projectRoot: string | null) =>
    !!projectRoot && ['pum/theme', 'src/theme', 'theme'].some((sub) => join(projectRoot, sub) === themeDir)

  for (const base of candidates) {
    // base points directly to a theme dir (it has colors.ts)
    if (existsSync(join(base, 'colors.ts'))) {
      const projectRoot = findProjectRoot(dirname(base))
      return { themeDir: base, projectRoot, legacy: false, themeOwnedByProject: owned(base, projectRoot) }
    }
    // base is a project dir: pum/theme (consumer), src/theme (repo),
    // or a dir that already contains theme/ (e.g. --dir ./src → src/theme).
    for (const sub of ['pum/theme', 'src/theme', 'theme']) {
      const dir = join(base, sub)
      if (existsSync(join(dir, 'colors.ts'))) {
        const projectRoot = findProjectRoot(base)
        return { themeDir: dir, projectRoot, legacy: false, themeOwnedByProject: owned(dir, projectRoot) }
      }
    }
    // legacy layout: single-file pum/theme.ts, with no theme/ folder
    if (existsSync(join(base, 'pum', 'theme.ts')) && !existsSync(join(base, 'pum', 'theme'))) {
      return { themeDir: null, projectRoot: findProjectRoot(base), legacy: true, themeOwnedByProject: true }
    }
  }
  return { themeDir: null, projectRoot: null, legacy: false, themeOwnedByProject: true }
}

/**
 * Reads `--dir <path>` / `--dir=<path>` / `-d <path>` / `-d=<path>` from
 * process.argv (the bin already received it). Accepts both forms: the spaced
 * one and the `=` one — the latter is the one many people use
 * (`panda-ui-mithril config --dir=src/pages/login`) and it used to be ignored
 * silently, so the editor fell back to the root project instead of the sub-project.
 * A relative path is resolved against the cwd the bin was launched from.
 */
function themeDirFromArgv(): string | null {
  const argv = process.argv
  for (let i = 2; i < argv.length; i++) {
    const a = argv[i]
    let raw: string | undefined
    if (a.startsWith('--dir=')) raw = a.slice('--dir='.length)
    else if (a.startsWith('-d=')) raw = a.slice('-d='.length)
    else if (a === '--dir' || a === '-d') raw = argv[i + 1]
    if (raw && !raw.startsWith('-')) return resolve(raw)
  }
  return null
}

/** Reads `--port <n>` / `--port=<n>` / `-p <n>` from process.argv. */
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
      console.warn(`config-ui: invalid port '${raw}' — using 1234`)
      return null
    }
  }
  return null
}

/** Opens the URL in the system browser (best-effort, non-blocking). */
function openBrowser(url: string) {
  try {
    const cmd =
      process.platform === 'darwin'
        ? ['open', url]
        : process.platform === 'win32'
          ? ['cmd', '/c', 'start', '', url]
          : ['xdg-open', url]
    const child = spawn(cmd[0], cmd.slice(1), { detached: true, stdio: 'ignore' })
    child.on('error', (e) => console.error(`config-ui: could not open the browser (${cmd[0]}):`, e.message))
    child.unref()
  } catch (e) {
    console.error('config-ui: could not open the browser:', String(e))
  }
}

/**
 * `--no-open` (or `BROWSER=none`) prevents the server from opening the system
 * browser on startup. Meant for repeated reviews, scripts and CI: without
 * this, every restart opens a new tab. The URL is ALWAYS printed to stdout,
 * so the editor remains usable by hand.
 */
function noOpenFromArgv(): boolean {
  return process.argv.includes('--no-open') || process.env.BROWSER === 'none'
}

/** Levels from cwd up to the root (max. 10), for the upward search. */
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

/** Walks up from `dir` until it finds panda.config.ts (fallback: the dir itself). */
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

// ── Helpers: reading ──────────────────────────────────────────────────────
function readColors(dir: string) {
  return parseColors(readFileSync(join(dir, 'colors.ts'), 'utf8'))
}

function readFlat(dir: string, file: string) {
  return parseFlat(readFileSync(join(dir, file + '.ts'), 'utf8'))
}

// ── Helpers: writing (targeted regex, known structure) ────────────────────
function writeColors(dir: string, colors: Record<string, { base: string; dark: string }>) {
  const path = join(dir, 'colors.ts')
  writeFileSync(path, writeColorsSrc(readFileSync(path, 'utf8'), colors))
}

function writeFlat(dir: string, file: string, values: Record<string, string>) {
  const path = join(dir, file + '.ts')
  writeFileSync(path, writeFlatSrc(readFileSync(path, 'utf8'), values))
}
