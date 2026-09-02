/**
 * fonts-api — helpers del editor para las fuentes, modelo por paquetes npm.
 *
 * Flujo (sin paso intermedio de "instalar"): el proveedor (Fontsource) es el
 * catálogo; "añadir" instala el paquete `@fontsource/{id}` en node_modules
 * (`bun add`) y la fuente queda DISPONIBLE; "asignar" es la ÚNICA operación
 * que carga la fuente al sistema: escribe el token en pum/theme/fonts.ts y
 * emite los @font-face de ESA familia en el `globalFontface` del
 * panda.config.ts (vía nativa de Panda — cssgen los compila DENTRO de
 * styles.css, con src relativo a node_modules).
 *
 * Estado del editor (derivado de themeDir → {raiz} = `pum/` o `src/`):
 *   {raiz}/fonts-loaded.json   ← familias CARGADAS (asignadas) con sus faces
 *   node_modules/@fontsource/{id} ← paquetes disponibles
 *   pum/theme/fonts.ts         ← qué token usa cada familia
 *
 * El bloque globalFontface solo contiene familias cargadas Y referenciadas
 * por un token (prune automático) — el CSS no carga fuentes sin uso.
 */

import {
  existsSync, readFileSync, readdirSync, rmSync, writeFileSync,
} from 'node:fs'
import { spawnSync } from 'node:child_process'
import { dirname, join, relative, resolve, sep } from 'node:path'
import { ensureToken, parseFlat, writeFlatSrc } from './theme-io'

// ── API de Fontsource (catálogo) ────────────────────────────────────────────
const LIST_URL = 'https://api.fontsource.org/v1/fonts'
const FONT_URL = (id: string) => `https://api.fontsource.org/v1/fonts/${id}`
const FETCH_TIMEOUT = 20_000

// El listado completo (~540 KB) se cachea en memoria y se filtra localmente.
let listCache: { at: number; data: FontMeta[] } | null = null
const LIST_TTL = 30 * 60 * 1000

/** Ids de Fontsource: kebab-case, minúsculas, solo [a-z0-9-]. */
const FONT_ID_RE = /^[a-z0-9-]+$/

/** Metadata compacta que devuelve el listado del catálogo. */
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

/** Metadata de un paquete instalado (node_modules/@fontsource/{id}/metadata.json). */
export interface AvailableFont {
  id: string
  family: string
  version: string
  defSubset: string
  weights: number[]
  styles: string[]
  subsets: string[]
  license: string
}

/** Una familia cargada (fonts-loaded.json). key = id del paquete. */
export interface LoadedFont {
  family: string
  weights: number[]
  styles: string[]
  subsets: string[]
}
export type LoadedState = Record<string, LoadedFont>

// ── Catálogo ────────────────────────────────────────────────────────────────
/** Listado completo con caché. Lanza si la API de Fontsource falla. */
async function fontList(): Promise<FontMeta[]> {
  const now = Date.now()
  if (listCache && now - listCache.at < LIST_TTL) return listCache.data
  const res = await fetch(LIST_URL, { signal: AbortSignal.timeout(FETCH_TIMEOUT) })
  if (!res.ok) throw new Error(`Fontsource API ${res.status}`)
  const data = (await res.json()) as FontMeta[]
  listCache = { at: now, data }
  return data
}

/** Filtra el catálogo por family/id (substring, case-insensitive), ranking. */
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

/** Metadata completa de una fuente del catálogo; null si no existe. */
export async function getFont(id: string): Promise<FontMeta | null> {
  const res = await fetch(FONT_URL(id), { signal: AbortSignal.timeout(FETCH_TIMEOUT) })
  if (res.status === 404) return null
  if (!res.ok) throw new Error(`Fontsource API ${res.status}`)
  return (await res.json()) as FontMeta
}

// ── Sanitización ─────────────────────────────────────────────────────────────
/** Valida y normaliza un id de fuente; null si es inválido. */
export function sanitizeFontId(id: string): string | null {
  const v = (id || '').trim().toLowerCase()
  return FONT_ID_RE.test(v) ? v : null
}

// ── Paquetes npm (@fontsource) ──────────────────────────────────────────────
export function packageDir(projectRoot: string, id: string): string {
  return join(projectRoot, 'node_modules', '@fontsource', id)
}

/** Lee metadata.json de un paquete; null si no está instalado. */
export function packageMeta(projectRoot: string, id: string): AvailableFont | null {
  const safe = sanitizeFontId(id)
  if (!safe) return null
  const p = join(packageDir(projectRoot, safe), 'metadata.json')
  if (!existsSync(p)) return null
  try {
    const d = JSON.parse(readFileSync(p, 'utf8')) as Record<string, unknown>
    const lic = d.license as { type?: string; name?: string } | string | undefined
    return {
      id: String(d.id || safe),
      family: String(d.family || safe),
      version: String(d.version || ''),
      defSubset: String(d.defSubset || 'latin'),
      weights: Array.isArray(d.weights) ? d.weights.map(Number) : [400],
      styles: Array.isArray(d.styles) ? d.styles.map(String) : ['normal'],
      subsets: Array.isArray(d.subsets) ? d.subsets.map(String) : ['latin'],
      // La licencia de Fontsource es un objeto { type, url, attribution }.
      license: typeof lic === 'string' ? lic : String(lic?.type || lic?.name || ''),
    }
  } catch {
    return null
  }
}

/** Paquetes @fontsource instalados en node_modules (los "disponibles"). */
export function availableFonts(projectRoot: string): AvailableFont[] {
  const base = join(projectRoot, 'node_modules', '@fontsource')
  if (!existsSync(base)) return []
  const out: AvailableFont[] = []
  for (const name of readdirSync(base)) {
    if (!FONT_ID_RE.test(name)) continue
    const meta = packageMeta(projectRoot, name)
    if (meta) out.push(meta)
  }
  return out.sort((a, b) => a.family.localeCompare(b.family))
}

/** ¿Existe el archivo {id}-{subset}-{weight}-{style}.woff2 en el paquete? */
export function faceFileExists(projectRoot: string, id: string, subset: string, weight: number, style: string): boolean {
  const safe = sanitizeFontId(id)
  if (!safe) return false
  return existsSync(join(packageDir(projectRoot, safe), 'files', `${safe}-${subset}-${weight}-${style}.woff2`))
}

/** Resuelve un archivo dentro de node_modules/@fontsource/{id}/files con guard. */
export function packageFontFilePath(projectRoot: string, id: string, file: string): string | null {
  const safe = sanitizeFontId(id)
  if (!safe || !file || file.includes('\0')) return null
  const base = resolve(join(packageDir(projectRoot, safe), 'files'))
  const p = resolve(join(base, file))
  if (p !== base && !p.startsWith(base + sep)) return null
  if (!existsSync(p)) return null
  return p
}

/** `bun add @fontsource/{id}` en la raíz del proyecto. */
export function bunAdd(projectRoot: string, id: string): { ok: boolean; output: string } {
  return runBun(projectRoot, ['add', `@fontsource/${id}`])
}

/** `bun remove @fontsource/{id}` en la raíz del proyecto. */
export function bunRemove(projectRoot: string, id: string): { ok: boolean; output: string } {
  return runBun(projectRoot, ['remove', `@fontsource/${id}`])
}

function runBun(projectRoot: string, args: string[]): { ok: boolean; output: string } {
  const r = spawnSync('bun', args, { cwd: projectRoot, encoding: 'utf8', timeout: 180_000 })
  return { ok: r.status === 0, output: String(r.stdout || '') + String(r.stderr || '') }
}

// ── Tokens del theme (pum/theme/fonts.ts) ───────────────────────────────────
export function readFontsTokens(themeDir: string): Record<string, string> {
  try {
    return parseFlat(readFileSync(join(themeDir, 'fonts.ts'), 'utf8'))
  } catch {
    return {}
  }
}

/** Garantiza los roles tipográficos canónicos en pum/theme/fonts.ts:
 * inserta `display` (titulares) con el stack actual de `sans` si falta — así
 * el rol existe sin cambiar la apariencia (los títulos heredan sans hasta que
 * se asigne otra familia al rol). Devuelve si cambió el archivo. */
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

/** Tokens cuyo stack incluye la familia (p. ej. '"JetBrains Mono", …'). */
export function tokensForFamily(tokens: Record<string, string>, family: string): string[] {
  return Object.keys(tokens).filter((k) => (tokens[k] || '').includes('"' + family + '"'))
}

/** Stack genérico de reset al desasignar (token mono → monospace). */
export function defaultStackForToken(token: string): string {
  return token.includes('mono') ? 'monospace' : 'system-ui, sans-serif'
}

/** Escribe un value en pum/theme/fonts.ts (writeFlatSrc; no-op si no existe). */
function writeFontToken(themeDir: string, token: string, value: string): void {
  const path = join(themeDir, 'fonts.ts')
  const src = readFileSync(path, 'utf8')
  const next = writeFlatSrc(src, { [token]: value })
  if (next !== src) writeFileSync(path, next, 'utf8')
}

// ── Estado cargado ({raiz}/fonts-loaded.json) ───────────────────────────────
export function loadedPath(themeDir: string): string {
  return join(dirname(themeDir), 'fonts-loaded.json')
}

export function readLoaded(themeDir: string): LoadedState {
  const p = loadedPath(themeDir)
  if (!existsSync(p)) return {}
  try {
    const d = JSON.parse(readFileSync(p, 'utf8')) as Record<string, Partial<LoadedFont>>
    const out: LoadedState = {}
    for (const [id, v] of Object.entries(d)) {
      if (!FONT_ID_RE.test(id) || !v || typeof v !== 'object') continue
      if (typeof v.family !== 'string' || !v.family) continue
      out[id] = {
        family: v.family,
        weights: Array.isArray(v.weights) ? v.weights.map(Number).filter(Number.isInteger) : [400],
        styles: Array.isArray(v.styles) ? v.styles.map(String) : ['normal'],
        subsets: Array.isArray(v.subsets) ? v.subsets.map(String) : ['latin'],
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
 * Elimina del estado las familias cargadas que ningún token referencia ya
 * (quedaron inertes, p. ej. tras una migración o un edit manual de fonts.ts).
 * Devuelve si cambió el estado.
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

// ── Bloque globalFontface (panda.config.ts del consumidor) ──────────────────
/** Marker que identifica el bloque gestionado por el editor. */
export const FONTFACE_MARKER = '/* pum:fontfaces */'

/** Lee `outdir: '...'` del panda.config.ts (default 'styled-system'). */
export function readOutdir(pandaConfigSrc: string): string {
  const m = /outdir\s*:\s*['"]([^'"]+)['"]/.exec(pandaConfigSrc)
  return m ? m[1] : 'styled-system'
}

/**
 * Genera el fuente TS del bloque globalFontface con las familias CARGADAS que
 * además están REFERENCIADAS por un token de fonts.ts. src apunta a los
 * woff2 del paquete en node_modules, relativo a {outdir}/styles.css.
 * Vacío si no hay familias que emitir.
 */
export function buildFontfaceSource(themeDir: string, projectRoot: string, pandaConfigSrc: string): string {
  const loaded = readLoaded(themeDir)
  const tokens = readFontsTokens(themeDir)
  const outdirAbs = join(projectRoot, readOutdir(pandaConfigSrc))
  const lines: string[] = []
  for (const [id, lf] of Object.entries(loaded)) {
    if (!FONT_ID_RE.test(id)) continue
    // Prune: solo familias que algún token usa de verdad.
    if (tokensForFamily(tokens, lf.family).length === 0) continue
    const faces: string[] = []
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
    if (faces.length === 0) continue
    const family = lf.family.replace(/'/g, "\\'")
    lines.push(`    '${family}': [\n${faces.join('\n')}\n    ],`)
  }
  if (lines.length === 0) return ''
  return `  ${FONTFACE_MARKER}\n  globalFontface: {\n${lines.join('\n')}\n  },\n`
}

/**
 * Inserta/actualiza/elimina el bloque marcado en panda.config.ts.
 * Idempotente por marker; devuelve el src nuevo (igual si no se pudo editar).
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
  if (pandaConfigSrc.includes(anchor)) return pandaConfigSrc.replace(anchor, anchor + faces, 1)
  if (pandaConfigSrc.includes('defineConfig({')) {
    return pandaConfigSrc.replace('defineConfig({', 'defineConfig({\n' + faces, 1)
  }
  return pandaConfigSrc
}

/** true si panda.config.ts tiene el bloque gestionado con ≥1 familia. */
export function fontfaceWired(pandaConfigSrc: string): boolean {
  return pandaConfigSrc.includes(FONTFACE_MARKER) && pandaConfigSrc.includes('globalFontface:')
}

/** Rebuild del bloque desde (loaded ∩ referenciadas). Devuelve si cambió. */
export function syncBlock(themeDir: string, projectRoot: string, pandaConfigSrc: string): boolean {
  const faces = buildFontfaceSource(themeDir, projectRoot, pandaConfigSrc)
  const next = writeFontfaceConfig(pandaConfigSrc, faces)
  if (next !== pandaConfigSrc) {
    writeFileSync(join(projectRoot, 'panda.config.ts'), next, 'utf8')
    return true
  }
  return false
}

// ── Operaciones ──────────────────────────────────────────────────────────────
export type AssignResult =
  | { ok: true; family: string; token: string; value: string; changed: boolean }
  | { ok: false; error: string }

/**
 * Asigna una fuente disponible a un token: escribe fonts.ts + registra la
 * familia en fonts-loaded.json + sincroniza el bloque. Devuelve changed para
 * que el servidor decida si rebuilda.
 */
export function assignFont(
  themeDir: string,
  projectRoot: string,
  opts: { id: string; token: string; weights?: number[]; styles?: string[]; subsets?: string[] },
): AssignResult {
  const safe = sanitizeFontId(opts.id)
  if (!safe) return { ok: false, error: `Font id inválido: '${opts.id}'` }
  const meta = packageMeta(projectRoot, safe)
  if (!meta) {
    return { ok: false, error: `'${opts.id}' no está disponible — añade el paquete primero (@fontsource/${safe}).` }
  }
  const tokens = readFontsTokens(themeDir)
  if (!(opts.token in tokens)) {
    return { ok: false, error: `El token '${opts.token}' no existe en fonts.ts (${Object.keys(tokens).join(', ')}).` }
  }
  const weights = pick(opts.weights, meta.weights, [400, 700])
  const styles = pick(opts.styles, meta.styles, ['normal'])
  const subsets = pick(opts.subsets, meta.subsets, [meta.defSubset])
  if (weights.length === 0 || styles.length === 0 || subsets.length === 0) {
    return {
      ok: false,
      error: `'${meta.family}' no soporta la combinación pedida — disponibles: pesos [${meta.weights.join(', ')}], estilos [${meta.styles.join(', ')}].`,
    }
  }
  // Verifica que al menos un archivo exista en el paquete.
  let files = 0
  for (const subset of subsets) {
    for (const weight of weights) {
      for (const style of styles) {
        if (faceFileExists(projectRoot, safe, subset, weight, style)) files++
      }
    }
  }
  if (files === 0) {
    return { ok: false, error: `No hay archivos woff2 de '${meta.family}' en el paquete @fontsource/${safe}.` }
  }

  const isMono = opts.token.includes('mono')
  const value = `"${meta.family}", ${isMono ? 'monospace' : 'system-ui, sans-serif'}`
  writeFontToken(themeDir, opts.token, value)

  const loaded = readLoaded(themeDir)
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
 * Desasigna una familia: resetea los tokens que la usaban a un stack genérico
 * y la quita de fonts-loaded.json + del bloque.
 */
export function unassignFont(themeDir: string, projectRoot: string, id: string): UnassignResult {
  const safe = sanitizeFontId(id)
  if (!safe) return { ok: false, error: `Font id inválido: '${id}'` }
  const loaded = readLoaded(themeDir)
  const entry = loaded[safe]
  if (!entry) return { ok: false, error: `'${safe}' no está cargada.` }

  const tokens = readFontsTokens(themeDir)
  const resetTokens = tokensForFamily(tokens, entry.family)
  for (const tk of resetTokens) {
    writeFontToken(themeDir, tk, defaultStackForToken(tk))
  }
  delete loaded[safe]
  writeLoaded(themeDir, loaded)

  const configPath = join(projectRoot, 'panda.config.ts')
  const changed = syncBlock(themeDir, projectRoot, readFileSync(configPath, 'utf8'))
  return { ok: true, resetTokens, changed }
}

export type RemoveResult =
  | { ok: true; resetTokens: string[]; bunOutput: string; changed: boolean }
  | { ok: false; error: string }

/** Desasigna (si estaba) y ejecuta `bun remove @fontsource/{id}`. */
export function removePackage(themeDir: string, projectRoot: string, id: string): RemoveResult {
  const safe = sanitizeFontId(id)
  if (!safe) return { ok: false, error: `Font id inválido: '${id}'` }
  const un = unassignFont(themeDir, projectRoot, safe)
  if (!un.ok) {
    // No estaba cargada — bun remove igualmente.
    const r = bunRemove(projectRoot, safe)
    if (!r.ok) return { ok: false, error: `bun remove falló: ${r.output.slice(-200)}` }
    return { ok: true, resetTokens: [], bunOutput: r.output, changed: false }
  }
  const r = bunRemove(projectRoot, safe)
  if (!r.ok) return { ok: false, error: `bun remove falló: ${r.output.slice(-200)}` }
  return { ok: true, resetTokens: un.resetTokens, bunOutput: r.output, changed: un.changed }
}

// ── Migración legacy (self-hosted antiguo → paquete npm) ────────────────────
/**
 * Detecta instalaciones antiguas ({raiz}/fonts/{id} con metadata.json) y las
 * migra: `bun add @fontsource/{id}` + registro en fonts-loaded.json con los
 * pesos/estilos/subsets del legacy. Borra el dir self-hosted y {raiz}/fonts.css.
 * Devuelve los ids migrados (vacío si no había legacy).
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
      if (!r.ok) continue // sin red o paquete inexistente — el legacy queda para otro intento
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
/** Intersección petición/disponible; si no se pidió nada usa defaults. */
function pick<T>(requested: T[] | undefined, available: T[], defaults: T[]): T[] {
  const src = requested && requested.length > 0 ? requested : defaults
  const set = new Set(src.filter((v) => available.includes(v)))
  return available.filter((v) => set.has(v))
}
