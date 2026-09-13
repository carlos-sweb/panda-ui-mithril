/**
 * fonts-api — editor helpers for fonts, npm-package model.
 *
 * Flow (no intermediate "install" step): the provider (Fontsource) is the
 * catalog; "add" installs the `@fontsource/{id}` package into node_modules
 * (`bun add`) and the font becomes AVAILABLE; "assign" is the ONLY operation
 * that loads the font into the system: it writes the token in pum/theme/fonts.ts
 * and emits the @font-face entries of THAT family in the `globalFontface` of
 * panda.config.ts (Panda's native route — cssgen compiles them INSIDE
 * styles.css, with src relative to node_modules).
 *
 * Editor state (derived from themeDir → {root} = `pum/` or `src/`):
 *   {root}/fonts-loaded.json   ← LOADED (assigned) families with their faces
 *   node_modules/@fontsource/{id} ← available packages
 *   pum/theme/fonts.ts         ← which token each family uses
 *
 * The globalFontface block only contains families loaded AND referenced
 * by a token (automatic prune) — the CSS does not load unused fonts.
 */

import {
  existsSync, readFileSync, readdirSync, rmSync, writeFileSync,
} from 'node:fs'
import { spawnSync } from 'node:child_process'
import { dirname, join, relative, resolve, sep } from 'node:path'
import { ensureToken, parseFlat, writeFlatSrc } from './theme-io'

// ── Fontsource API (catalog) ────────────────────────────────────────────
const LIST_URL = 'https://api.fontsource.org/v1/fonts'
const FONT_URL = (id: string) => `https://api.fontsource.org/v1/fonts/${id}`
const FETCH_TIMEOUT = 20_000

// The full listing (~540 KB) is cached in memory and filtered locally.
let listCache: { at: number; data: FontMeta[] } | null = null
const LIST_TTL = 30 * 60 * 1000

/** Fontsource ids: kebab-case, lowercase, only [a-z0-9-]. */
const FONT_ID_RE = /^[a-z0-9-]+$/

/** Compact metadata returned by the catalog listing. */
export interface FontMeta {
  id: string
  family: string
  subsets: string[]
  weights: number[]
  styles: string[]
  defSubset: string
  variable: boolean
  lastModified?: string
  category?: string
  license?: string
  type?: string
}

/** Metadata of an installed package (node_modules/@fontsource/{id}/metadata.json). */
export interface AvailableFont {
  id: string
  family: string
  version: string
  defSubset: string
  weights: number[]
  styles: string[]
  subsets: string[]
  license: string
  /** true if the package is @fontsource-variable/{id}. The reported family is
   * the one in the package CSS (e.g. 'Inter Variable') — the one the app uses. */
  variable: boolean
}

/** A loaded family (fonts-loaded.json). key = id, or `v:`+id if variable. */
export interface LoadedFont {
  family: string
  weights: number[]
  styles: string[]
  subsets: string[]
  variable?: boolean
}
export type LoadedState = Record<string, LoadedFont>

/** Key prefix in fonts-loaded.json for @fontsource-variable packages. */
const VKEY = 'v:'

/** npm scope name of a package. */
export function packageScope(variable: boolean): string {
  return variable ? '@fontsource-variable' : '@fontsource'
}

/** fonts-loaded.json key for an id with its scope. */
export function loadedKey(variable: boolean, id: string): string {
  return variable ? VKEY + id : id
}

/** Splits a fonts-loaded.json key → { id, variable } or null. */
export function parseLoadedKey(key: string): { id: string; variable: boolean } | null {
  if (key.startsWith(VKEY)) {
    const id = key.slice(VKEY.length)
    return FONT_ID_RE.test(id) ? { id, variable: true } : null
  }
  return FONT_ID_RE.test(key) ? { id: key, variable: false } : null
}

// ── Catalog ────────────────────────────────────────────────────────────────
/** Full cached listing. Throws if the Fontsource API fails. */
async function fontList(): Promise<FontMeta[]> {
  const now = Date.now()
  if (listCache && now - listCache.at < LIST_TTL) return listCache.data
  const res = await fetch(LIST_URL, { signal: AbortSignal.timeout(FETCH_TIMEOUT) })
  if (!res.ok) throw new Error(`Fontsource API ${res.status}`)
  const data = (await res.json()) as FontMeta[]
  listCache = { at: now, data }
  return data
}

/** Filters the catalog by family/id (substring, case-insensitive), ranking. */
export async function searchFonts(q: string, limit = 24): Promise<FontMeta[]> {
  const list = await fontList()
  const needle = q.trim().toLowerCase()
  if (!needle) return list.slice(0, limit)
  const scored = list
    .map((f) => {
      const family = f.family.toLowerCase()
      const id = f.id.toLowerCase()
      let score = -1
      if (family === needle || id === needle) score = 0
      else if (family.startsWith(needle)) score = 1
      else if (family.includes(needle) || id.includes(needle)) score = 2
      return { f, score }
    })
    .filter((x) => x.score !== -1)
    .sort((a, b) => a.score - b.score || a.f.family.localeCompare(b.f.family))
  return scored.slice(0, limit).map((x) => x.f)
}

/** Full metadata of a catalog font; null if it does not exist. */
export async function getFont(id: string): Promise<FontMeta | null> {
  const res = await fetch(FONT_URL(id), { signal: AbortSignal.timeout(FETCH_TIMEOUT) })
  if (res.status === 404) return null
  if (!res.ok) throw new Error(`Fontsource API ${res.status}`)
  return (await res.json()) as FontMeta
}

// ── Sanitization ─────────────────────────────────────────────────────────────
/** Validates and normalizes a font id; null if invalid. */
export function sanitizeFontId(id: string): string | null {
  const v = (id || '').trim().toLowerCase()
  return FONT_ID_RE.test(v) ? v : null
}

// ── npm packages (@fontsource and @fontsource-variable) ───────────────────────
export function packageDir(projectRoot: string, id: string, variable = false): string {
  return join(projectRoot, 'node_modules', packageScope(variable), id)
}

/** Reads a package's metadata.json; null if it is not installed. */
export function packageMeta(projectRoot: string, id: string, variable = false): AvailableFont | null {
  const safe = sanitizeFontId(id)
  if (!safe) return null
  const p = join(packageDir(projectRoot, safe, variable), 'metadata.json')
  if (!existsSync(p)) return null
  try {
    const d = JSON.parse(readFileSync(p, 'utf8')) as Record<string, unknown>
    const lic = d.license as { type?: string; name?: string } | string | undefined
    const meta: AvailableFont = {
      id: String(d.id || safe),
      // The family the app must use: for variable it is the one from the
      // package CSS (e.g. 'Inter Variable') — refined below.
      family: String(d.family || safe),
      version: String(d.version || ''),
      defSubset: String(d.defSubset || 'latin'),
      weights: Array.isArray(d.weights) ? d.weights.map(Number) : [400],
      styles: Array.isArray(d.styles) ? d.styles.map(String) : ['normal'],
      subsets: Array.isArray(d.subsets) ? d.subsets.map(String) : ['latin'],
      // The Fontsource license is an object { type, url, attribution }.
      license: typeof lic === 'string' ? lic : String(lic?.type || lic?.name || ''),
      variable,
    }
    if (variable) {
      const info = variableFontInfo(projectRoot, safe)
      if (!info) return null // package with no usable css/wght
      meta.family = info.family
      if (meta.subsets.includes('latin')) meta.defSubset = 'latin'
    }
    return meta
  } catch {
    return null
  }
}

/** Installed @fontsource and @fontsource-variable packages (the "available" ones). */
export function availableFonts(projectRoot: string): AvailableFont[] {
  const out: AvailableFont[] = []
  for (const scope of [false, true]) {
    const base = join(projectRoot, 'node_modules', packageScope(scope))
    if (!existsSync(base)) continue
    for (const name of readdirSync(base)) {
      if (!FONT_ID_RE.test(name)) continue
      const meta = packageMeta(projectRoot, name, scope)
      if (meta) out.push(meta)
    }
  }
  return out.sort((a, b) => a.family.localeCompare(b.family))
}

// ── Variable fonts (@fontsource-variable) ──────────────────────────────────
/** Base info of a variable package (read from its per-axis CSS). */
export interface VariableFontInfo {
  /** family from the package CSS (e.g. 'Inter Variable'). */
  family: string
  /** declared weight range (e.g. '100 900'). */
  weightRange: string
}

/** CSS for the wght axis (or index.css if missing) of the variable package; null if none. */
function variableCssText(projectRoot: string, id: string): string | null {
  const dir = packageDir(projectRoot, id, true)
  for (const name of ['wght.css', 'index.css']) {
    const p = join(dir, name)
    if (existsSync(p)) return readFileSync(p, 'utf8')
  }
  return null
}

/**
 * Family and weight range of the variable package from its first @font-face
 * (font-family 'X Variable', font-weight '100 900'). null if there is no css.
 */
export function variableFontInfo(projectRoot: string, id: string): VariableFontInfo | null {
  const css = variableCssText(projectRoot, id)
  if (!css) return null
  const open = css.indexOf('@font-face')
  if (open === -1) return null
  const blockStart = css.indexOf('{', open)
  if (blockStart === -1) return null
  let depth = 1
  let end = -1
  for (let i = blockStart + 1; i < css.length; i++) {
    const ch = css[i]
    if (ch === '{') depth++
    else if (ch === '}') {
      depth--
      if (depth === 0) {
        end = i + 1
        break
      }
    }
  }
  if (end === -1) return null
  const block = css.slice(blockStart + 1, end)
  const family = /font-family:\s*'([^']+)'/.exec(block)?.[1]
  const weight = /font-weight:\s*([^;]+)/.exec(block)?.[1]?.trim()
  if (!family) return null
  return { family, weightRange: weight ?? '100 900' }
}

/** Does the variable file {id}-{subset}-wght-{style}.woff2 exist in the package? */
export function variableFaceFileExists(
  projectRoot: string, id: string, subset: string, style: string,
): boolean {
  const safe = sanitizeFontId(id)
  if (!safe) return false
  return existsSync(join(packageDir(projectRoot, safe, true), 'files', `${safe}-${subset}-wght-${style}.woff2`))
}

/** Does the file {id}-{subset}-{weight}-{style}.woff2 exist in the package? */
export function faceFileExists(projectRoot: string, id: string, subset: string, weight: number, style: string): boolean {
  const safe = sanitizeFontId(id)
  if (!safe) return false
  return existsSync(join(packageDir(projectRoot, safe), 'files', `${safe}-${subset}-${weight}-${style}.woff2`))
}

/** Resolves a file inside node_modules/@fontsource{,-variable}/{id}/files. */
export function packageFontFilePath(
  projectRoot: string, id: string, file: string, variable = false,
): string | null {
  const safe = sanitizeFontId(id)
  if (!safe || !file || file.includes('\0')) return null
  const base = resolve(join(packageDir(projectRoot, safe, variable), 'files'))
  const p = resolve(join(base, file))
  if (p !== base && !p.startsWith(base + sep)) return null
  if (!existsSync(p)) return null
  return p
}

/** `bun add @fontsource/{id}` (or @fontsource-variable) at the project root. */
export function bunAdd(projectRoot: string, id: string, variable = false): { ok: boolean; output: string } {
  return runBun(projectRoot, ['add', `${packageScope(variable)}/${id}`])
}

/** `bun remove @fontsource/{id}` (or @fontsource-variable) at the project root. */
export function bunRemove(projectRoot: string, id: string, variable = false): { ok: boolean; output: string } {
  return runBun(projectRoot, ['remove', `${packageScope(variable)}/${id}`])
}

function runBun(projectRoot: string, args: string[]): { ok: boolean; output: string } {
  const r = spawnSync('bun', args, { cwd: projectRoot, encoding: 'utf8', timeout: 180_000 })
  return { ok: r.status === 0, output: String(r.stdout || '') + String(r.stderr || '') }
}

// ── Theme tokens (pum/theme/fonts.ts) ───────────────────────────────────
export function readFontsTokens(themeDir: string): Record<string, string> {
  try {
    return parseFlat(readFileSync(join(themeDir, 'fonts.ts'), 'utf8'))
  } catch {
    return {}
  }
}

/** Guarantees the canonical typographic roles in pum/theme/fonts.ts:
 * inserts `display` (headings) with the current `sans` stack if missing — so
 * the role exists without changing the appearance (titles inherit sans until
 * another family is assigned to the role). Returns whether the file changed. */
export function ensureRoleTokens(themeDir: string): boolean {
  const path = join(themeDir, 'fonts.ts')
  if (!existsSync(path)) return false
  let src = readFileSync(path, 'utf8')
  const tokens = parseFlat(src)
  if (tokens['display'] !== undefined) return false
  const sansValue = tokens['sans'] ?? '"Ubuntu", system-ui, sans-serif'
  const next = ensureToken(src, 'fonts', 'display', sansValue)
  if (next === src) return false
  writeFileSync(path, next, 'utf8')
  return true
}

/** Tokens whose stack includes the family (e.g. '"JetBrains Mono", …'). */
export function tokensForFamily(tokens: Record<string, string>, family: string): string[] {
  return Object.keys(tokens).filter((k) => (tokens[k] || '').includes('"' + family + '"'))
}

/** Generic reset stack when unassigning (mono token → monospace). */
export function defaultStackForToken(token: string): string {
  return token.includes('mono') ? 'monospace' : 'system-ui, sans-serif'
}

/** Writes a value into pum/theme/fonts.ts (writeFlatSrc; no-op if it does not exist). */
function writeFontToken(themeDir: string, token: string, value: string): void {
  const path = join(themeDir, 'fonts.ts')
  const src = readFileSync(path, 'utf8')
  const next = writeFlatSrc(src, { [token]: value })
  if (next !== src) writeFileSync(path, next, 'utf8')
}

// ── Loaded state ({root}/fonts-loaded.json) ───────────────────────────────
export function loadedPath(themeDir: string): string {
  return join(dirname(themeDir), 'fonts-loaded.json')
}

export function readLoaded(themeDir: string): LoadedState {
  const p = loadedPath(themeDir)
  if (!existsSync(p)) return {}
  try {
    const d = JSON.parse(readFileSync(p, 'utf8')) as Record<string, Partial<LoadedFont>>
    const out: LoadedState = {}
    for (const [rawKey, v] of Object.entries(d)) {
      const parsed = parseLoadedKey(rawKey)
      if (!parsed || !v || typeof v !== 'object') continue
      if (typeof v.family !== 'string' || !v.family) continue
      const variable = parsed.variable
      out[rawKey] = {
        family: v.family,
        weights: variable
          ? []
          : (Array.isArray(v.weights) ? v.weights.map(Number).filter(Number.isInteger) : [400]),
        styles: Array.isArray(v.styles) ? v.styles.map(String) : ['normal'],
        subsets: Array.isArray(v.subsets) ? v.subsets.map(String) : ['latin'],
        variable,
      }
    }
    return out
  } catch {
    return {}
  }
}

export function writeLoaded(themeDir: string, state: LoadedState): void {
  writeFileSync(loadedPath(themeDir), JSON.stringify(state, null, 2) + '\n', 'utf8')
}

/**
 * Removes from the state the loaded families no token references anymore
 * (they became inert, e.g. after a migration or a manual edit of fonts.ts).
 * Returns whether the state changed.
 */
export function pruneLoaded(themeDir: string): boolean {
  const loaded = readLoaded(themeDir)
  const tokens = readFontsTokens(themeDir)
  const next: LoadedState = {}
  for (const [id, lf] of Object.entries(loaded)) {
    if (tokensForFamily(tokens, lf.family).length > 0) next[id] = lf
  }
  if (Object.keys(next).length === Object.keys(loaded).length) return false
  writeLoaded(themeDir, next)
  return true
}

// ── globalFontface block (consumer's panda.config.ts) ──────────────────
/** Marker that identifies the editor-managed block. */
export const FONTFACE_MARKER = '/* pum:fontfaces */'

/** Reads `outdir: '...'` from panda.config.ts (default 'styled-system'). */
export function readOutdir(pandaConfigSrc: string): string {
  const m = /outdir\s*:\s*['"]([^'"]+)['"]/.exec(pandaConfigSrc)
  return m ? m[1] : 'styled-system'
}

/**
 * Generates the TS source of the globalFontface block with the LOADED families
 * that are also REFERENCED by a token in fonts.ts. src points to the package
 * woff2 files in node_modules, relative to {outdir}/styles.css.
 * Empty if there are no families to emit.
 */
export function buildFontfaceSource(themeDir: string, projectRoot: string, pandaConfigSrc: string): string {
  const loaded = readLoaded(themeDir)
  const tokens = readFontsTokens(themeDir)
  const outdirAbs = join(projectRoot, readOutdir(pandaConfigSrc))
  const lines: string[] = []
  for (const [rawKey, lf] of Object.entries(loaded)) {
    const parsed = parseLoadedKey(rawKey)
    if (!parsed) continue
    const { id, variable } = parsed
    // Prune: only families some token actually uses.
    if (tokensForFamily(tokens, lf.family).length === 0) continue
    const faces: string[] = []
    if (variable) {
      // One face per subset×style: a variable woff2 (wght axis) covers the
      // whole weight range (family 'X Variable', font-weight '100 900').
      const info = variableFontInfo(projectRoot, id)
      if (info) {
        for (const subset of lf.subsets) {
          for (const style of lf.styles) {
            const file = `${id}-${subset}-wght-${style}.woff2`
            const fileAbs = join(packageDir(projectRoot, id, true), 'files', file)
            if (!existsSync(fileAbs)) continue
            const rel = relative(outdirAbs, fileAbs).split(sep).join('/')
            faces.push(
              `      { fontStyle: '${style}', fontDisplay: 'swap', fontWeight: '${info.weightRange}', src: 'url(${rel}) format("woff2-variations")' },`,
            )
          }
        }
      }
    } else {
      for (const subset of lf.subsets) {
        for (const weight of lf.weights) {
          for (const style of lf.styles) {
            const file = `${id}-${subset}-${weight}-${style}.woff2`
            const fileAbs = join(packageDir(projectRoot, id), 'files', file)
            if (!existsSync(fileAbs)) continue
            const rel = relative(outdirAbs, fileAbs).split(sep).join('/')
            faces.push(
              `      { fontStyle: '${style}', fontDisplay: 'swap', fontWeight: ${weight}, src: 'url(${rel}) format("woff2")' },`,
            )
          }
        }
      }
    }
    if (faces.length === 0) continue
    const family = lf.family.replace(/'/g, "\\'")
    lines.push(`    '${family}': [\n${faces.join('\n')}\n    ],`)
  }
  if (lines.length === 0) return ''
  return `  ${FONTFACE_MARKER}\n  globalFontface: {\n${lines.join('\n')}\n  },\n`
}

/**
 * Inserts/updates/removes the marked block in panda.config.ts.
 * Idempotent by marker; returns the new src (unchanged if it could not edit).
 */
export function writeFontfaceConfig(pandaConfigSrc: string, faces: string): string {
  const markerIdx = pandaConfigSrc.indexOf(FONTFACE_MARKER)
  if (markerIdx !== -1) {
    const openIdx = pandaConfigSrc.indexOf('{', markerIdx)
    if (openIdx === -1) return pandaConfigSrc
    let depth = 0
    let end = -1
    for (let i = openIdx; i < pandaConfigSrc.length; i++) {
      const ch = pandaConfigSrc[i]
      if (ch === '{') depth++
      else if (ch === '}') {
        depth--
        if (depth === 0) {
          end = i + 1
          break
        }
      }
    }
    if (end === -1) return pandaConfigSrc
    let after = end
    while (after < pandaConfigSrc.length && /[,\s]/.test(pandaConfigSrc[after])) after++
    const head = pandaConfigSrc.slice(0, markerIdx)
    const tail = pandaConfigSrc.slice(after)
    if (!faces) return (head + tail).replace(/\n{3,}/g, '\n\n')
    return head + faces + tail
  }
  if (!faces) return pandaConfigSrc
  const anchor = 'export default defineConfig({\n'
  if (pandaConfigSrc.includes(anchor)) return pandaConfigSrc.replace(anchor, anchor + faces)
  if (pandaConfigSrc.includes('defineConfig({')) {
    return pandaConfigSrc.replace('defineConfig({', 'defineConfig({\n' + faces)
  }
  return pandaConfigSrc
}

/** true if panda.config.ts has the managed block with ≥1 family. */
export function fontfaceWired(pandaConfigSrc: string): boolean {
  return pandaConfigSrc.includes(FONTFACE_MARKER) && pandaConfigSrc.includes('globalFontface:')
}

/** Rebuilds the block from (loaded ∩ referenced). Returns whether it changed. */
export function syncBlock(themeDir: string, projectRoot: string, pandaConfigSrc: string): boolean {
  const faces = buildFontfaceSource(themeDir, projectRoot, pandaConfigSrc)
  const next = writeFontfaceConfig(pandaConfigSrc, faces)
  if (next !== pandaConfigSrc) {
    writeFileSync(join(projectRoot, 'panda.config.ts'), next, 'utf8')
    return true
  }
  return false
}

// ── Operations ──────────────────────────────────────────────────────────────
export type AssignResult =
  | { ok: true; family: string; token: string; value: string; changed: boolean }
  | { ok: false; error: string }

/**
 * Assigns an available font to a token: writes fonts.ts + registers the
 * family in fonts-loaded.json + syncs the block. Returns changed so the
 * server can decide whether to rebuild.
 */
export function assignFont(
  themeDir: string,
  projectRoot: string,
  opts: { id: string; token: string; weights?: number[]; styles?: string[]; subsets?: string[]; variable?: boolean },
): AssignResult {
  const safe = sanitizeFontId(opts.id)
  if (!safe) return { ok: false, error: `Invalid font id: '${opts.id}'` }
  const variable = !!opts.variable
  const meta = packageMeta(projectRoot, safe, variable)
  if (!meta) {
    return {
      ok: false,
      error: `'${opts.id}' is not available — add the package first (${packageScope(variable)}/${safe}).`,
    }
  }
  const tokens = readFontsTokens(themeDir)
  if (!(opts.token in tokens)) {
    return { ok: false, error: `The token '${opts.token}' does not exist in fonts.ts (${Object.keys(tokens).join(', ')}).` }
  }
  const styles = pick(opts.styles, meta.styles, ['normal'])
  const subsets = pick(opts.subsets, meta.subsets, [meta.defSubset])
  if (styles.length === 0 || subsets.length === 0) {
    return {
      ok: false,
      error: `'${meta.family}' does not support the requested combination — styles [${meta.styles.join(', ')}], subsets [${meta.subsets.join(', ')}].`,
    }
  }
  const loaded = readLoaded(themeDir)
  if (variable) {
    // Variable: one face per subset×style (the woff2 covers the whole weight
    // range) — verifies that the wght axis files exist.
    const info = variableFontInfo(projectRoot, safe)
    let found = 0
    for (const subset of subsets) {
      for (const style of styles) {
        if (info && variableFaceFileExists(projectRoot, safe, subset, style)) found++
      }
    }
    if (found === 0) {
      return {
        ok: false,
        error: `No variable faces for '${meta.family}' for subsets [${subsets.join(', ')}] × styles [${styles.join(', ')}].`,
      }
    }
    const isMono = opts.token.includes('mono')
    const value = `"${meta.family}", ${isMono ? 'monospace' : 'system-ui, sans-serif'}`
    writeFontToken(themeDir, opts.token, value)
    loaded[loadedKey(true, safe)] = { family: meta.family, weights: [], styles, subsets, variable: true }
    writeLoaded(themeDir, loaded)
    const configPath = join(projectRoot, 'panda.config.ts')
    const changed = syncBlock(themeDir, projectRoot, readFileSync(configPath, 'utf8'))
    return { ok: true, family: meta.family, token: opts.token, value, changed }
  }

  const weights = pick(opts.weights, meta.weights, [400, 700])
  if (weights.length === 0) {
    return {
      ok: false,
      error: `'${meta.family}' does not support the requested combination — available: weights [${meta.weights.join(', ')}].`,
    }
  }
  // Verifies that at least one file exists in the package.
  let files = 0
  for (const subset of subsets) {
    for (const weight of weights) {
      for (const style of styles) {
        if (faceFileExists(projectRoot, safe, subset, weight, style)) files++
      }
    }
  }
  if (files === 0) {
    return { ok: false, error: `No woff2 files for '${meta.family}' in the @fontsource/${safe} package.` }
  }

  const isMono = opts.token.includes('mono')
  const value = `"${meta.family}", ${isMono ? 'monospace' : 'system-ui, sans-serif'}`
  writeFontToken(themeDir, opts.token, value)

  loaded[safe] = { family: meta.family, weights, styles, subsets }
  writeLoaded(themeDir, loaded)

  const configPath = join(projectRoot, 'panda.config.ts')
  const changed = syncBlock(themeDir, projectRoot, readFileSync(configPath, 'utf8'))
  return { ok: true, family: meta.family, token: opts.token, value, changed }
}

export type UnassignResult =
  | { ok: true; resetTokens: string[]; changed: boolean }
  | { ok: false; error: string }

/**
 * Unassigns a family: resets the tokens that used it to a generic stack
 * and removes it from fonts-loaded.json + the block.
 */
export function unassignFont(
  themeDir: string, projectRoot: string, id: string, variable = false,
): UnassignResult {
  const safe = sanitizeFontId(id)
  if (!safe) return { ok: false, error: `Invalid font id: '${id}'` }
  const loaded = readLoaded(themeDir)
  const key = loadedKey(variable, safe)
  const entry = loaded[key]
  if (!entry) return { ok: false, error: `'${safe}' is not loaded.` }

  const tokens = readFontsTokens(themeDir)
  const resetTokens = tokensForFamily(tokens, entry.family)
  for (const tk of resetTokens) {
    writeFontToken(themeDir, tk, defaultStackForToken(tk))
  }
  delete loaded[key]
  writeLoaded(themeDir, loaded)

  const configPath = join(projectRoot, 'panda.config.ts')
  const changed = syncBlock(themeDir, projectRoot, readFileSync(configPath, 'utf8'))
  return { ok: true, resetTokens, changed }
}

export type RemoveResult =
  | { ok: true; resetTokens: string[]; bunOutput: string; changed: boolean }
  | { ok: false; error: string }

/** Unassigns (if it was assigned) and runs `bun remove @fontsource{,-variable}/{id}`. */
export function removePackage(
  themeDir: string, projectRoot: string, id: string, variable = false,
): RemoveResult {
  const safe = sanitizeFontId(id)
  if (!safe) return { ok: false, error: `Invalid font id: '${id}'` }
  const un = unassignFont(themeDir, projectRoot, safe, variable)
  if (!un.ok) {
    // It was not loaded — bun remove anyway.
    const r = bunRemove(projectRoot, safe, variable)
    if (!r.ok) return { ok: false, error: `bun remove failed: ${r.output.slice(-200)}` }
    return { ok: true, resetTokens: [], bunOutput: r.output, changed: false }
  }
  const r = bunRemove(projectRoot, safe, variable)
  if (!r.ok) return { ok: false, error: `bun remove failed: ${r.output.slice(-200)}` }
  return { ok: true, resetTokens: un.resetTokens, bunOutput: r.output, changed: un.changed }
}

// ── Legacy migration (old self-hosted → npm package) ────────────────────
/**
 * Detects old installations ({root}/fonts/{id} with metadata.json) and
 * migrates them: `bun add @fontsource/{id}` + registration in fonts-loaded.json
 * with the legacy weights/styles/subsets. Deletes the self-hosted dir and {root}/fonts.css.
 * Returns the migrated ids (empty if there was no legacy).
 */
export function migrateLegacyFonts(themeDir: string, projectRoot: string): string[] {
  const raiz = dirname(themeDir)
  const dir = join(raiz, 'fonts')
  if (!existsSync(dir)) return []
  const migrated: string[] = []
  const loaded = readLoaded(themeDir)
  for (const name of readdirSync(dir)) {
    if (!FONT_ID_RE.test(name)) continue
    const metaPath = join(dir, name, 'metadata.json')
    if (!existsSync(metaPath)) continue
    let meta: { family?: string; weights?: number[]; styles?: string[]; subsets?: string[]; defSubset?: string } | null = null
    try {
      meta = JSON.parse(readFileSync(metaPath, 'utf8'))
    } catch {
      meta = null
    }
    if (!meta || typeof meta.family !== 'string' || !meta.family) continue
    if (!packageMeta(projectRoot, name)) {
      const r = bunAdd(projectRoot, name)
      if (!r.ok) continue // no network or nonexistent package — the legacy stays for another attempt
    }
    loaded[name] = {
      family: meta.family,
      weights: Array.isArray(meta.weights) && meta.weights.length ? meta.weights.map(Number) : [400],
      styles: Array.isArray(meta.styles) && meta.styles.length ? meta.styles.map(String) : ['normal'],
      subsets: Array.isArray(meta.subsets) && meta.subsets.length ? meta.subsets.map(String) : [meta.defSubset || 'latin'],
    }
    migrated.push(name)
  }
  if (migrated.length > 0) writeLoaded(themeDir, loaded)
  rmSync(dir, { recursive: true, force: true })
  const cssPath = join(raiz, 'fonts.css')
  if (existsSync(cssPath)) rmSync(cssPath, { force: true })
  return migrated
}

// ── Helpers ──────────────────────────────────────────────────────────────────
/** Request/available intersection; if nothing was requested it uses defaults. */
function pick<T>(requested: T[] | undefined, available: T[], defaults: T[]): T[] {
  const src = requested && requested.length > 0 ? requested : defaults
  const set = new Set(src.filter((v) => available.includes(v)))
  return available.filter((v) => set.has(v))
}
