/**
 * postcss-api — editor helpers for PostCSS plugins (npm model).
 *
 * Flow (same as fonts): the OFFICIAL plugin listing from postcss.org
 * (https://postcss.org/docs/postcss-plugins) is the catalog; "Install" runs
 * `bun add {package}` at the project root and the plugin becomes AVAILABLE in
 * node_modules. Configuring which plugins enter the pipeline (css build) is
 * a later phase — here only presence in node_modules is managed.
 *
 * The catalog is served as server-rendered HTML (14 categories + ~355
 * plugins), it is parsed with no dependencies and cached in memory for 30 min
 * (same pattern as fonts-api with the Fontsource JSON listing).
 *
 * npm names: the official listing shows the plugin's invocation name
 * (e.g. `postcss-import`, `cssnano`), which usually matches the npm package,
 * but not always (`short` → `postcss-short` package). That is why the
 * package to install is RESOLVED against the npm registry on demand
 * (with a `postcss-` + name fallback and an in-memory cache), never assumed.
 */

import { existsSync, readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { spawnSync } from 'node:child_process'
import { dirname, join } from 'node:path'
import { PANDA_PLUGIN_ID } from './postcss-schemas'

// ── Official catalog (postcss.org/docs/postcss-plugins) ─────────────────────
const CATALOG_URL = 'https://postcss.org/docs/postcss-plugins'
const REGISTRY_URL = (name: string) => `https://registry.npmjs.org/${encodeURIComponent(name)}`
const FETCH_TIMEOUT = 20_000

/** A plugin from the official listing. */
export interface PostcssPlugin {
  /** Plugin invocation name (what the listing shows). */
  name: string
  /** Short listing description. */
  description: string
  /** Plugin URL (repo / web / npm). */
  url: string
  /** Listing category (Control, Packs, Future CSS Syntax…). */
  category: string
  /** Category id (h2 anchor). */
  categoryId: string
  /** Candidate npm package (see npmNameFor). It may differ from `name`. */
  npm: string
}

export interface PostcssCategory {
  id: string
  name: string
  plugins: PostcssPlugin[]
}

let catalogCache: { at: number; categories: PostcssCategory[] } | null = null
const CATALOG_TTL = 30 * 60 * 1000

/**
 * Plugins that are NOT in the postcss.org listing but we still want to offer
 * in the editor (plugins that only live on GitHub, or explicit user
 * requests).
 *
 * They are merged with the scraped catalog in `catalog()`/`searchCatalog()`;
 * if postcss.org ever lists them, the official entry wins (dedupe by
 * `name`). `npm` is set by hand: there is no npmjs.com href to derive the
 * package from, so it does not go through `npmCandidates`.
 */
const EXTRA_CATEGORY = {
  id: 'extras',
  name: 'Extras (not listed on postcss.org)',
} as const

const EXTRA_PLUGINS: PostcssPlugin[] = [
  {
    name: 'postcss-prune-var',
    description: 'removes unused CSS variables, following the var() dependency graph.',
    url: 'https://github.com/tomasklaen/postcss-prune-var',
    category: EXTRA_CATEGORY.name,
    categoryId: EXTRA_CATEGORY.id,
    npm: 'postcss-prune-var',
  },
]

/** Appends the extras to the end of the catalog, without duplicating listed ones. */
function withExtras(categories: PostcssCategory[]): PostcssCategory[] {
  const listed = new Set(categories.flatMap((c) => c.plugins.map((p) => p.name)))
  const missing = EXTRA_PLUGINS.filter((p) => !listed.has(p.name))
  if (missing.length === 0) return categories
  const existing = categories.find((c) => c.id === EXTRA_CATEGORY.id)
  if (existing) {
    return categories.map((c) =>
      c.id === EXTRA_CATEGORY.id ? { ...c, plugins: [...c.plugins, ...missing] } : c,
    )
  }
  return [...categories, { id: EXTRA_CATEGORY.id, name: EXTRA_CATEGORY.name, plugins: missing }]
}

/** Decodes basic HTML entities into plain text. */
function decodeEntities(s: string): string {
  return s
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/&nbsp;/g, ' ')
}

/** Plain text of an HTML fragment (no tags or entities), collapsed. */
function textOf(html: string): string {
  return decodeEntities(html.replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim()
}

/**
 * Candidate npm packages for a listed plugin, in priority order:
 *  1. slug from an npmjs.com/package/X href (exact source of the package);
 *  2. last segment of a github.com href (covers own repos
 *     `postcss-import`, `postcss-short`, and csstools monorepo subpaths
 *     `…/tree/main/plugins/postcss-custom-media` → `postcss-custom-media`);
 *  3. the listing's invocation name (packs: cssnano, stylelint…);
 *  4. `postcss-` + name (the convention for most).
 * The npm registry decides at the end (resolveNpmPackage tries in order).
 */
function npmCandidates(pluginName: string, url: string): string[] {
  const out: string[] = []
  const push = (s: string) => { if (s && !out.includes(s)) out.push(s) }
  const npmjs = /npmjs\.com\/package\/([^/?#]+)/.exec(url)
  if (npmjs) push(decodeURIComponent(npmjs[1]))
  const github = /github\.com\/[^/]+\/([^?#]+)/.exec(url)
  if (github) {
    const segments = github[1].split('/').filter(Boolean).map((s) => decodeURIComponent(s))
    const last = segments[segments.length - 1]?.replace(/\/+$/, '')
    if (last) push(last)
  }
  push(pluginName)
  if (!pluginName.startsWith('postcss-')) push('postcss-' + pluginName)
  return out
}

/**
 * Parses the server-rendered HTML of postcss.org/docs/postcss-plugins.
 * Structure: `<h2 … id="{cat}">Name</h2>` followed by `<ul><li>…</li></ul>`;
 * each li contains `<a href="…"><code>{name}</code></a> {description}`.
 */
export function parseCatalogHtml(html: string): PostcssCategory[] {
  const categories: PostcssCategory[] = []
  // Split by category h2: [pre, id1, title1, body1, id2, title2, …]
  const parts = html.split(/<h2[^>]*id="([^"]+)"[^>]*>(.*?)<\/h2>/)
  for (let i = 1; i + 2 < parts.length; i += 3) {
    const id = parts[i]
    const rawTitle = parts[i + 1]
    const body = parts[i + 2]
    const name = textOf(rawTitle) || id
    const plugins: PostcssPlugin[] = []
    for (const li of body.matchAll(/<li>([\s\S]*?)<\/li>/g)) {
      const item = li[1]
      const anchor = /<a[^>]*href="([^"]+)"[^>]*>\s*<code>([^<]*)<\/code>\s*<\/a>/.exec(item)
      if (!anchor) continue
      const pluginName = decodeEntities(anchor[2]).trim()
      if (!pluginName) continue
      const url = anchor[1]
      // Description = the rest of the li (no tags or entities), removing the
      // name/url that are already exposed separately.
      const description = textOf(item.replace(anchor[0], ' '))
      plugins.push({
        name: pluginName,
        description,
        url,
        category: name,
        categoryId: id,
        // Best candidate npm package (most reliable source from the href); the
        // real installation resolves against the registry with all the
        // candidates (resolveNpmPackage).
        npm: npmCandidates(pluginName, url)[0] ?? pluginName,
      })
    }
    if (plugins.length > 0) categories.push({ id, name, plugins })
  }
  return categories
}

/** Official listing (postcss.org) + extras, with an in-memory cache. Throws if the page fails. */
export async function catalog(): Promise<PostcssCategory[]> {
  const now = Date.now()
  if (catalogCache && now - catalogCache.at < CATALOG_TTL) return withExtras(catalogCache.categories)
  const res = await fetch(CATALOG_URL, { signal: AbortSignal.timeout(FETCH_TIMEOUT) })
  if (!res.ok) throw new Error(`postcss.org ${res.status}`)
  const html = await res.text()
  const categories = parseCatalogHtml(html)
  if (categories.length === 0) throw new Error('Could not parse the plugin listing')
  catalogCache = { at: now, categories }
  return withExtras(categories)
}

/** Filters the catalog (official + extras) by name/description (case-insensitive). */
export function searchCatalog(q: string): PostcssCategory[] {
  const needle = q.trim().toLowerCase()
  const all = withExtras(catalogCache?.categories ?? [])
  if (!needle) return all
  const out: PostcssCategory[] = []
  for (const cat of all) {
    const matched = cat.plugins.filter(
      (p) =>
        p.name.toLowerCase().includes(needle) ||
        p.description.toLowerCase().includes(needle) ||
        p.category.toLowerCase().includes(needle),
    )
    if (matched.length) out.push({ ...cat, plugins: matched })
  }
  return out
}

// ── npm package resolution ───────────────────────────────────────────────────
const NAME_RE = /^[a-z0-9][a-z0-9._-]*$/
const SCOPE_RE = /^@[a-z0-9][a-z0-9._-]*\/[a-z0-9][a-z0-9._-]*$/

/** true if the package exists in the npm registry (GET of the latest doc). */
async function npmPackageExists(name: string): Promise<boolean> {
  try {
    const res = await fetch(REGISTRY_URL(name), { signal: AbortSignal.timeout(FETCH_TIMEOUT) })
    return res.ok
  } catch {
    return false
  }
}

// Cache name → resolved npm package (or null if it does not exist) — avoids
// hitting the registry for every repeated install of the same plugin.
let pkgResolveCache: { name: string; resolved: string | null; at: number }[] = []
const RESOLVE_TTL = 60 * 60 * 1000

/**
 * Resolves the real npm package to install for a listed plugin, trying its
 * candidates (npmCandidates) against the registry in priority order.
 * Returns null if none of them exists.
 */
export async function resolveNpmPackage(pluginName: string, url: string): Promise<string | null> {
  const now = Date.now()
  pkgResolveCache = pkgResolveCache.filter((c) => now - c.at < RESOLVE_TTL)
  const cacheKey = `${pluginName} ${url}`
  const hit = pkgResolveCache.find((c) => c.name === cacheKey)
  if (hit) return hit.resolved
  let resolved: string | null = null
  for (const c of npmCandidates(pluginName, url)) {
    if (SCOPE_RE.test(c) || NAME_RE.test(c)) {
      if (await npmPackageExists(c)) {
        resolved = c
        break
      }
    }
  }
  pkgResolveCache.push({ name: cacheKey, resolved, at: now })
  return resolved
}

// ── Installation / presence in node_modules ──────────────────────────────────
/** `bun add {package}` at the project root. */
export function bunAddPackage(projectRoot: string, pkg: string): { ok: boolean; output: string } {
  const r = spawnSync('bun', ['add', pkg], { cwd: projectRoot, encoding: 'utf8', timeout: 180_000 })
  return { ok: r.status === 0, output: String(r.stdout || '') + String(r.stderr || '') }
}

/** `bun remove {package}` at the project root. */
export function bunRemovePackage(projectRoot: string, pkg: string): { ok: boolean; output: string } {
  const r = spawnSync('bun', ['remove', pkg], { cwd: projectRoot, encoding: 'utf8', timeout: 120_000 })
  return { ok: r.status === 0, output: String(r.stdout || '') + String(r.stderr || '') }
}

/** Package path inside node_modules (supports @scope/name scope). */
export function packagePath(projectRoot: string, pkg: string): string {
  const p = pkg.startsWith('@') ? pkg.split('/') : [pkg]
  return join(projectRoot, 'node_modules', ...p)
}

/** Is the package physically in the project's node_modules? */
export function packageInstalled(projectRoot: string, pkg: string): boolean {
  try {
    const p = packagePath(projectRoot, pkg)
    return existsSync(join(p, 'package.json')) || existsSync(p)
  } catch {
    return false
  }
}

/** Top-level package names in node_modules (for membership). */
export function nodeModulesNames(projectRoot: string): Set<string> {
  const base = join(projectRoot, 'node_modules')
  const names = new Set<string>()
  try {
    for (const entry of readdirSync(base)) {
      if (entry.startsWith('@')) {
        const scopeDir = join(base, entry)
        try {
          for (const sub of readdirSync(scopeDir)) names.add(`${entry}/${sub}`)
        } catch {
          /* unreadable scope — ignored */
        }
      } else {
        names.add(entry)
      }
    }
  } catch {
    /* no node_modules — empty set */
  }
  return names
}

/**
 * Catalog plugins present in node_modules (the "available" ones).
 * It receives the catalog to match npm names against what is installed;
 * it returns matches only, along with their metadata.
 */
export function availablePlugins(
  projectRoot: string,
  categories: PostcssCategory[],
): PostcssPlugin[] {
  const installed = nodeModulesNames(projectRoot)
  const out: PostcssPlugin[] = []
  const seen = new Set<string>()
  for (const cat of categories) {
    for (const p of cat.plugins) {
      if (seen.has(p.name)) continue
      seen.add(p.name)
      if (installed.has(p.npm) || installed.has(p.name)) out.push(p)
    }
  }
  return out.sort((a, b) => a.name.localeCompare(b.name))
}

// ── Pipeline config (postcss.config.cjs at the project ROOT) ─────────────────
// The source of truth for the pipeline is the postcss.config.cjs that init
// creates (the model recommended by panda-css.com/docs/installation/postcss):
// Panda is a PostCSS plugin. The editor manages the block between markers:
//
//   module.exports = {
//     plugins: {
//       /* pum:postcss */
//       '@pandacss/dev/postcss': {},
//       'autoprefixer': { "grid": "autoplace" }
//       /* /pum:postcss */
//     },
//   }
//
// Only the inside of the marker pair is rewritten (the header, other manual
// plugins outside the block and the rest of the file are preserved). The
// Panda plugin is ALWAYS the first entry (non-removable base).

/** Opening of the plugin block managed by the editor. */
export const POSTCSS_MARKER = '/* pum:postcss */'
/** Closing of the plugin block managed by the editor. */
export const POSTCSS_MARKER_END = '/* /pum:postcss */'
/** Pipeline file name (postcss.config.cjs). */
export const PIPELINE_CONFIG_NAME = 'postcss.config.cjs'

/** A plugin configured in the pipeline. */
export interface PipelinePluginEntry {
  /** Installed npm package (catalog/available id or the Panda plugin). */
  id: string
  /** true (default) if the plugin runs in the build. */
  enabled?: boolean
  /** Plugin options (pure JSON; regex as "/pattern/"). */
  options?: Record<string, unknown>
}

/** Path of the project's postcss.config.cjs (root = projectRoot). */
export function pipelineConfigPath(projectRoot: string): string {
  return join(projectRoot, PIPELINE_CONFIG_NAME)
}

/** Does the project have postcss.config.cjs (a postcss-aware pipeline)? */
export function hasPostcssConfig(projectRoot: string): boolean {
  return existsSync(pipelineConfigPath(projectRoot))
}

/**
 * Evaluates the inside of the managed block (entries `'id': {...},`) as an
 * object. Returns null if it cannot be evaluated (empty block or hand-edited
 * with unsupported syntax).
 */
function evalManagedBlock(inner: string): Record<string, Record<string, unknown>> | null {
  const src = inner.trim()
  if (!src) return {}
  try {
    // The inside is a JS object literal; we evaluate it in a Function (we never
    // pass unvalidated user data outside this project file).
    const value = new Function(`return ({ ${src} })`)()
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      return value as Record<string, Record<string, unknown>>
    }
    return {}
  } catch {
    return null
  }
}

const PANDA_BASE = (): PipelinePluginEntry[] => [{ id: PANDA_PLUGIN_ID, enabled: true, options: {} }]

/**
 * Locates the managed block: the marker pair that is INSIDE
 * `module.exports` (the template puts the header —comments— BEFORE it).
 * Searching for the file's first marker would be a bug: if a header comment
 * mentioned the literals, `indexOf` would point there and the editor would
 * insert plugins in the middle of the comment.
 */
function findManagedBlock(src: string): { start: number; end: number } | null {
  // Anchor on module.exports: the real markers live in its plugins object.
  const anchor = src.lastIndexOf('module.exports')
  const from = anchor === -1 ? 0 : anchor
  const start = src.indexOf(POSTCSS_MARKER, from)
  if (start === -1) return null
  const end = src.indexOf(POSTCSS_MARKER_END, start + POSTCSS_MARKER.length)
  if (end === -1 || end <= start) return null
  return { start, end }
}

/**
 * Reads the pipeline from postcss.config.cjs: plugins managed in the block
 * (Panda base ALWAYS first + the rest in order). If the file does not exist
 * or the block cannot be read, it returns only the Panda base.
 */
export function readPipelineConfig(projectRoot: string): PipelinePluginEntry[] {
  const p = pipelineConfigPath(projectRoot)
  if (!existsSync(p)) return PANDA_BASE()
  let src = ''
  try {
    src = readFileSync(p, 'utf8')
  } catch {
    return PANDA_BASE()
  }
  const block = findManagedBlock(src)
  if (!block) return PANDA_BASE()
  const inner = src.slice(block.start + POSTCSS_MARKER.length, block.end)
  const parsed = evalManagedBlock(inner)
  if (!parsed) return PANDA_BASE()
  const out: PipelinePluginEntry[] = []
  // Panda base first, whether or not it is in the block.
  if (parsed[PANDA_PLUGIN_ID] !== undefined) {
    out.push({ id: PANDA_PLUGIN_ID, enabled: true, options: parsed[PANDA_PLUGIN_ID] })
  } else {
    out.push({ id: PANDA_PLUGIN_ID, enabled: true, options: {} })
  }
  for (const [id, options] of Object.entries(parsed)) {
    if (id === PANDA_PLUGIN_ID) continue
    out.push({ id, enabled: true, options })
  }
  return out
}

/** Valid npm name (with or without scope) — a copy of NAME_RE/SCOPE_RE. */
export function isValidPackageName(name: string): boolean {
  return NAME_RE.test(name) || SCOPE_RE.test(name)
}

/** Validates a plugin list received from the client. */
export function sanitizePipelineConfig(pluginsRaw: unknown): { ok: true; plugins: PipelinePluginEntry[] } | { ok: false; error: string } {
  if (!Array.isArray(pluginsRaw)) {
    return { ok: false, error: 'Invalid config: the plugins array is missing.' }
  }
  const plugins: PipelinePluginEntry[] = []
  const seen = new Set<string>()
  for (const rawPl of pluginsRaw) {
    if (!rawPl || typeof rawPl !== 'object') continue
    const pl = rawPl as Record<string, unknown>
    const id = String(pl.id ?? '').trim()
    if (id !== PANDA_PLUGIN_ID && !isValidPackageName(id)) {
      return { ok: false, error: `Invalid package id received: '${pl.id}'.` }
    }
    if (seen.has(id)) return { ok: false, error: `Duplicate plugin in the pipeline: '${id}'.` }
    seen.add(id)
    const options = pl.options && typeof pl.options === 'object' && !Array.isArray(pl.options)
      ? pl.options as Record<string, unknown>
      : {}
    plugins.push({ id, enabled: pl.enabled !== false, options })
  }
  return { ok: true, plugins }
}

/**
 * Serializes the plugin list into JS entries of the managed block.
 * Panda base ALWAYS first (with its options if the list carries them — e.g.
 * configPath/cwd pinned from the UI); disabled ones are omitted from the .cjs.
 */
function serializeManagedBlock(plugins: PipelinePluginEntry[]): string {
  const lines: string[] = []
  const panda = plugins.find((p) => p.id === PANDA_PLUGIN_ID)
  const ordered = [
    // Real panda options (configPath/cwd) or {} if they were not set.
    { id: PANDA_PLUGIN_ID, options: panda?.options ?? {} },
    ...plugins.filter((p) => p.id !== PANDA_PLUGIN_ID),
  ]
  for (const pl of ordered) {
    if (pl.enabled === false) continue
    lines.push(`    ${JSON.stringify(pl.id)}: ${JSON.stringify(pl.options || {})},`)
  }
  return lines.join('\n')
}

/**
 * Writes the plugin list into the managed block of postcss.config.cjs.
 * If the file does not exist, it creates it with the base scaffold (Panda).
 * If it exists but has no markers, it inserts the block after `plugins: {`
 * (or at the end of the file as a last resort). Returns whether it changed.
 */
export function writePipelineConfig(projectRoot: string, plugins: PipelinePluginEntry[]): boolean {
  const p = pipelineConfigPath(projectRoot)
  const block = serializeManagedBlock(plugins)
  // Canonical marker indentation: 4 spaces (same as init).
  const managed = `    ${POSTCSS_MARKER}\n${block}\n    ${POSTCSS_MARKER_END}`

  let next: string
  if (!existsSync(p)) {
    next = scaffoldConfigSource(managed)
  } else {
    const src = readFileSync(p, 'utf8')
    // If the file is not valid CJS (e.g. it was corrupted by an old save
    // that inserted the block into a header comment), it is REGENERATED
    // from the scaffold: there is no safe way to edit it by markers.
    if (!isValidCjs(src)) {
      next = scaffoldConfigSource(managed)
    } else {
      const loc = findManagedBlock(src)
      if (loc) {
        // Replaces ONLY the inside of the marker pair with the serialized
        // block (`block`, a string), never with the index object.
        // It preserves the opening marker line's indentation to
        // reuse it on the closing marker (aesthetically stable file).
        const lineStart = src.lastIndexOf('\n', loc.start - 1) + 1
        const indent = src.slice(lineStart, loc.start)
        next = src.slice(0, loc.start) + POSTCSS_MARKER +
          '\n' + block + '\n' + indent +
          src.slice(loc.end)
      } else {
        // No markers: it inserts the block right after `plugins: {`.
        const anchor = 'plugins: {'
        const ai = src.indexOf(anchor)
        if (ai !== -1) {
          const after = ai + anchor.length
          next = src.slice(0, after) + '\n' + managed + '\n' + src.slice(after)
        } else {
          // Last resort: append module.exports with the plugins.
          next = src.trimEnd() + '\nmodule.exports = {\n  plugins: {\n' + managed + '\n  },\n}\n'
        }
      }
    }
  }
  if (next === readPipelineConfigSource(p)) return false
  writeFileSync(p, next, 'utf8')
  return true
}

/** Header + module.exports of the managed file (to create/regenerate). */
function scaffoldConfigSource(managed: string): string {
  return `// postcss.config.cjs — the project's postcss pipeline (Panda is a layer).
// The section managed by \`panda-ui-mithril config\` (Postcss → Configure)
// is the block between the two pum:postcss comments inside plugins —
// do not edit its inside by hand. Entries you add outside the block are
// preserved when saving from the editor.
module.exports = {
  plugins: {
${managed}
  },
}
`
}

/**
 * true if the text is a syntactically valid CommonJS module (without
 * executing it). Used to detect corrupted files and regenerate them.
 */
function isValidCjs(src: string): boolean {
  try {
    new Function('module', 'exports', 'require', src)
    return true
  } catch {
    return false
  }
}

/** Reads the file's current content ('' if it does not exist). */
function readPipelineConfigSource(p: string): string {
  return existsSync(p) ? readFileSync(p, 'utf8') : ''
}

// ── Build metadata ({root}/postcss.build.json) ───────────────────────────────
// Entry and output of the postcss pipeline. They are NOT part of the
// postcss.config.cjs standard: they live in an editor metadata json (root =
// dirname(themeDir), same as fonts-loaded.json) and are configurable by the
// user from the Configure tab.

/** A plugin configured in the pipeline (public UI alias). */
export interface PostcssBuildConfig {
  /** CSS entry with the @layer directive (default: pum/index.css). */
  entry: string
  /** Pipeline output (default: styled-system/styles.css). */
  output: string
}

const BUILD_DEFAULTS: PostcssBuildConfig = {
  entry: 'pum/index.css',
  output: 'styled-system/styles.css',
}

export const BUILD_CONFIG_NAME = 'postcss.build.json'

/** Build config path (root = dirname(themeDir) → pum/ or src/). */
export function buildConfigPath(themeDir: string): string {
  return join(dirname(themeDir), BUILD_CONFIG_NAME)
}

/** Reads {root}/postcss.build.json; defaults if it does not exist or is invalid. */
export function readBuildConfig(themeDir: string): PostcssBuildConfig {
  const p = buildConfigPath(themeDir)
  if (!existsSync(p)) return { ...BUILD_DEFAULTS }
  try {
    const d = JSON.parse(readFileSync(p, 'utf8')) as Partial<PostcssBuildConfig>
    return {
      entry: typeof d.entry === 'string' && d.entry.trim() ? d.entry.trim() : BUILD_DEFAULTS.entry,
      output: typeof d.output === 'string' && d.output.trim() ? d.output.trim() : BUILD_DEFAULTS.output,
    }
  } catch {
    return { ...BUILD_DEFAULTS }
  }
}

/** Writes {root}/postcss.build.json. Returns whether it changed. */
export function writeBuildConfig(themeDir: string, cfg: PostcssBuildConfig): boolean {
  const p = buildConfigPath(themeDir)
  const clean = {
    entry: cfg.entry && cfg.entry.trim() ? cfg.entry.trim() : BUILD_DEFAULTS.entry,
    output: cfg.output && cfg.output.trim() ? cfg.output.trim() : BUILD_DEFAULTS.output,
  }
  const next = JSON.stringify(clean, null, 2) + '\n'
  const prev = existsSync(p) ? readFileSync(p, 'utf8') : ''
  if (prev === next) return false
  writeFileSync(p, next, 'utf8')
  return true
}
