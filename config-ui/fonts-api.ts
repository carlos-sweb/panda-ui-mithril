/**
 * fonts-api — helpers del editor para buscar, instalar y desinstalar fuentes
 * desde Fontsource (https://fontsource.org/), el proveedor por defecto de
 * esta exploración.
 *
 * Modelo instalado en el proyecto objetivo (derivado de themeDir):
 *   {raiz}/fonts.css               ← CSS auto-generado: un @import por fuente
 *   {raiz}/fonts/{id}/index.css    ← @font-face de esa fuente (urls relativas)
 *   {raiz}/fonts/{id}/{archivo}.woff2
 *   {raiz}/fonts/{id}/metadata.json ← metadata de Fontsource + opciones
 *
 * donde {raiz} = dirname(themeDir) → `pum/` (consumidor) o `src/` (este repo).
 *
 * Los helpers trabajan sobre el filesystem del proyecto objetivo; el servidor
 * (server.ts) es quien resuelve themeDir/projectRoot y expone las rutas HTTP.
 */

import {
  existsSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync,
} from 'node:fs'
import { basename, dirname, join, relative, resolve, sep } from 'node:path'

// ── API de Fontsource ────────────────────────────────────────────────────────
const LIST_URL = 'https://api.fontsource.org/v1/fonts'
const FONT_URL = (id: string) => `https://api.fontsource.org/v1/fonts/${id}`
const FETCH_TIMEOUT = 20_000

// La API no tiene búsqueda server-side: devuelve el listado completo
// (~540 KB) y se filtra localmente. Caché en memoria con TTL.
let listCache: { at: number; data: FontMeta[] } | null = null
const LIST_TTL = 30 * 60 * 1000

/** Ids de Fontsource: kebab-case, minúsculas, solo [a-z0-9-]. */
const FONT_ID_RE = /^[a-z0-9-]+$/

/** Metadata compacta que devuelve el listado completo. */
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

/** Metadata completa de UNA fuente (GET /v1/fonts/{id}) con el mapa de archivos. */
interface FontDetail extends FontMeta {
  variants?: Record<string, Record<string, Record<string, { url?: { woff2?: string } }>>>
}

/** Opciones de instalación que envía el cliente. */
export interface InstallOptions {
  id: string
  weights?: number[]
  styles?: string[]
  subsets?: string[]
}

/** Registro de una fuente instalada (metadata.json). */
export interface InstalledFont {
  id: string
  family: string
  weights: number[]
  styles: string[]
  subsets: string[]
  variable?: boolean
  installedAt: string
}

// ── Resolución de rutas ──────────────────────────────────────────────────────
export interface FontsLayout {
  root: string
  dir: string
  cssPath: string
}

/** {raiz}/fonts/ + {raiz}/fonts.css derivados del themeDir. */
export function fontsLayout(themeDir: string): FontsLayout {
  const root = dirname(themeDir)
  return { root, dir: join(root, 'fonts'), cssPath: join(root, 'fonts.css') }
}

// ── Búsqueda ────────────────────────────────────────────────────────────────
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

/** Filtra el listado por family/id (substring, case-insensitive), ranking simple. */
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

/** Metadata completa de una fuente; null si no existe en Fontsource. */
async function getFont(id: string): Promise<FontDetail | null> {
  const res = await fetch(FONT_URL(id), { signal: AbortSignal.timeout(FETCH_TIMEOUT) })
  if (res.status === 404) return null
  if (!res.ok) throw new Error(`Fontsource API ${res.status}`)
  return (await res.json()) as FontDetail
}

// ── Sanitización ─────────────────────────────────────────────────────────────
/** Valida y normaliza un id de fuente; null si es inválido. */
export function sanitizeFontId(id: string): string | null {
  const v = (id || '').trim().toLowerCase()
  return FONT_ID_RE.test(v) ? v : null
}

// ── Instalación ──────────────────────────────────────────────────────────────
/**
 * Descarga los woff2 elegidos (subset × peso × estilo) desde el CDN de
 * Fontsource y escribe index.css + metadata.json + regenera {raiz}/fonts.css.
 * Idempotente: reinstalar sobrescribe. Ante cualquier fallo limpia el dir
 * parcial de la fuente para no dejar instalaciones rotas.
 *
 * Devuelve la ruta ABSOLUTA del fonts.css; el servidor calcula el relativo al
 * projectRoot (donde suele vivir la entrada de la app del consumidor) para el
 * importHint.
 */
export async function installFont(
  themeDir: string,
  opts: InstallOptions,
): Promise<{ font: InstalledFont; cssPath: string }> {
  const id = sanitizeFontId(opts.id)
  if (!id) throw new Error(`Font id inválido: '${opts.id}'`)
  const meta = await getFont(id)
  if (!meta) throw new Error(`Fuente '${id}' no encontrada en Fontsource`)

  const weights = pick(opts.weights, meta.weights, [400, 700])
  const styles = pick(opts.styles, meta.styles, ['normal'])
  const subsets = pick(opts.subsets, meta.subsets, [meta.defSubset])
  if (weights.length === 0 || styles.length === 0 || subsets.length === 0) {
    throw new Error(
      `'${meta.family}' no soporta la combinación pedida — ` +
      `pesos [${(opts.weights ?? [400, 700]).join(', ')}], ` +
      `estilos [${(opts.styles ?? ['normal']).join(', ')}], ` +
      `subsets [${(opts.subsets ?? [meta.defSubset]).join(', ')}]. ` +
      `Disponibles: pesos [${meta.weights.join(', ')}], estilos [${meta.styles.join(', ')}].`,
    )
  }

  const { dir, cssPath } = fontsLayout(themeDir)
  const fontDir = join(dir, id)
  mkdirSync(fontDir, { recursive: true })

  const faces: { file: string; weight: number; style: string }[] = []
  try {
    for (const subset of subsets) {
      for (const weight of weights) {
        for (const style of styles) {
          const url = variantUrl(meta, weight, style, subset)
          if (!url) continue
          const file = basename(new URL(url).pathname)
          await downloadWoff2(url, join(fontDir, file))
          faces.push({ file, weight, style })
        }
      }
    }
    if (faces.length === 0) {
      throw new Error(
        `No hay archivos para '${meta.family}' ` +
        `(subsets ${subsets.join(',')} × pesos ${weights.join(',')} × estilos ${styles.join(',')})`,
      )
    }

    writeFileSync(join(fontDir, 'index.css'), buildFontCss(meta.family, faces), 'utf8')
    const font: InstalledFont = {
      id,
      family: meta.family,
      weights,
      styles,
      subsets,
      variable: meta.variable,
      installedAt: new Date().toISOString(),
    }
    writeFileSync(join(fontDir, 'metadata.json'), JSON.stringify(font, null, 2) + '\n', 'utf8')
    regenerateFontsCss(themeDir)

    return { font, cssPath }
  } catch (e) {
    // Limpia instalación parcial (descargas a medias, css sin metadata…)
    rmSync(fontDir, { recursive: true, force: true })
    throw e
  }
}

/** Devuelve la URL woff2 del CDN para una variante, o null si no existe. */
function variantUrl(meta: FontDetail, weight: number, style: string, subset: string): string | null {
  return meta.variants?.[String(weight)]?.[style]?.[subset]?.url?.woff2 ?? null
}

/** Descarga y verifica un woff2 (magic bytes) en `dest`. */
async function downloadWoff2(url: string, dest: string) {
  const res = await fetch(url, { signal: AbortSignal.timeout(FETCH_TIMEOUT) })
  if (!res.ok) throw new Error(`Descarga ${res.status}: ${url}`)
  const buf = Buffer.from(await res.arrayBuffer())
  // Magic 'wOF2' (0x77 0x4F 0x46 0x32) — jsDelivr puede devolver HTML con 200
  // en rutas erróneas, y un CSS "ok" con el body equivocado rompería el preview.
  if (buf.length < 4 || buf[0] !== 0x77 || buf[1] !== 0x4f || buf[2] !== 0x46 || buf[3] !== 0x32) {
    throw new Error(`No es un woff2 válido: ${url}`)
  }
  writeFileSync(dest, buf)
}

/** Genera los @font-face de una fuente (un bloque por archivo descargado). */
function buildFontCss(family: string, faces: { file: string; weight: number; style: string }[]): string {
  const quoted = family.replace(/'/g, "\\'")
  const out = faces.map(({ file, weight, style }) => [
    '@font-face {',
    `  font-family: '${quoted}';`,
    `  font-style: ${style};`,
    '  font-display: swap;',
    `  font-weight: ${weight};`,
    `  src: url('./${file}') format('woff2');`,
    '}',
  ].join('\n'))
  return out.join('\n\n') + '\n'
}

// ── Desinstalación ───────────────────────────────────────────────────────────
/** Borra {raiz}/fonts/{id}/ y regenera fonts.css. Devuelve false si no estaba. */
export function uninstallFont(themeDir: string, id: string): boolean {
  const safe = sanitizeFontId(id)
  if (!safe) throw new Error(`Font id inválido: '${id}'`)
  const { dir } = fontsLayout(themeDir)
  const fontDir = join(dir, safe)
  if (!existsSync(fontDir)) return false
  rmSync(fontDir, { recursive: true, force: true })
  regenerateFontsCss(themeDir)
  return true
}

// ── Lectura / estado ─────────────────────────────────────────────────────────
/**
 * Fuentes instaladas: escaneo de metadata.json en cada subdir de {raiz}/fonts
 * (orden alfabético por familia).
 */
export function installedFonts(themeDir: string): InstalledFont[] {
  const { dir } = fontsLayout(themeDir)
  if (!existsSync(dir)) return []
  const out: InstalledFont[] = []
  for (const name of readdirSync(dir)) {
    if (!FONT_ID_RE.test(name)) continue
    const metaPath = join(dir, name, 'metadata.json')
    if (!existsSync(metaPath)) continue
    try {
      out.push(JSON.parse(readFileSync(metaPath, 'utf8')) as InstalledFont)
    } catch {
      // metadata corrupta → se ignora (el dir se puede limpiar a mano)
    }
  }
  return out.sort((a, b) => a.family.localeCompare(b.family))
}

/**
 * Regenera {raiz}/fonts.css con un @import por fuente instalada.
 * Se llama tras cada install/uninstall (fuente única de verdad: los dirs).
 */
export function regenerateFontsCss(themeDir: string) {
  const { dir, cssPath } = fontsLayout(themeDir)
  const installed = installedFonts(themeDir)
  const lines = installed.map((f) => `@import './fonts/${f.id}/index.css';`)
  const body = lines.length > 0
    ? lines.join('\n') + '\n'
    : '/* fonts.css — regenerado por config-ui. Ninguna fuente instalada. */\n'
  mkdirSync(dirname(cssPath), { recursive: true })
  writeFileSync(cssPath, body, 'utf8')
}

/**
 * index.css de una fuente con las urls reescritas a /api/fonts/file/{id}/…
 * (para que el editor inyecte el @font-face y previsualice desde el servidor).
 * null si la fuente no está instalada.
 */
export function readFontCss(themeDir: string, id: string): string | null {
  const safe = sanitizeFontId(id)
  if (!safe) return null
  const { dir } = fontsLayout(themeDir)
  const p = join(dir, safe, 'index.css')
  if (!existsSync(p)) return null
  const css = readFileSync(p, 'utf8')
  return css.replace(/url\(['"]?\.\/([^'")]+)['"]?\)/g, `url('/api/fonts/file/${safe}/$1')`)
}

/**
 * Resuelve un archivo dentro de {raiz}/fonts/{id}/ con guard de traversal
 * (path.normalize + prefijo). null si no existe o si escapa del dir.
 */
export function fontFilePath(themeDir: string, id: string, file: string): string | null {
  const safe = sanitizeFontId(id)
  if (!safe || !file || file.includes('\0')) return null
  const { dir } = fontsLayout(themeDir)
  const base = resolve(join(dir, safe))
  const p = resolve(join(base, file))
  if (p !== base && !p.startsWith(base + sep)) return null
  if (!existsSync(p)) return null
  return p
}

// ── globalFontface en panda.config.ts ───────────────────────────────────────
// La vía nativa de Panda para cargar fuentes: la clave `globalFontface`
// (nivel superior de defineConfig, verificada en Panda 1.12) hace que cssgen
// emita los @font-face DENTRO de {projectRoot}/{outdir}/styles.css — la app
// ya linkea ese CSS, así que no hace falta tocar el HTML del consumidor.
// El url() de cada src es relativo al styles.css generado (../pum/fonts/…).

/** Marker que identifica el bloque gestionado por el editor en panda.config.ts. */
export const FONTFACE_MARKER = '/* pum:fontfaces */'

/** Lee `outdir: '...'` del panda.config.ts (default 'styled-system'). */
export function readOutdir(pandaConfigSrc: string): string {
  const m = /outdir\s*:\s*['"]([^'"]+)['"]/.exec(pandaConfigSrc)
  return m ? m[1] : 'styled-system'
}

/**
 * Genera el fuente TS del bloque globalFontface para las fuentes instaladas
 * (una entrada por familia, con un @font-face por subset×peso×estilo real):
 *
 *   <!-- el bloque lleva el marker del editor (FONTFACE_MARKER) -->
 *   globalFontface: {
 *     'Poppins': [
 *       { fontStyle: 'normal', fontDisplay: 'swap', fontWeight: 600, src: 'url(../pum/fonts/poppins/latin-600-normal.woff2) format("woff2")' },
 *     ],
 *   },
 *
 * src es relativo a {projectRoot}/{outdir}/styles.css. Vacío si no hay fuentes.
 */
export function buildFontfaceSource(
  fonts: InstalledFont[],
  themeDir: string,
  projectRoot: string,
  outdir: string,
): string {
  const outdirAbs = join(projectRoot, outdir)
  const lines: string[] = []
  for (const f of fonts) {
    const { dir } = fontsLayout(themeDir)
    const fontDir = join(dir, f.id)
    const faces: string[] = []
    for (const subset of f.subsets) {
      for (const weight of f.weights) {
        for (const style of f.styles) {
          const file = `${subset}-${weight}-${style}.woff2`
          if (!existsSync(join(fontDir, file))) continue
          const rel = relative(outdirAbs, join(fontDir, file)).split(sep).join('/')
          faces.push(
            `      { fontStyle: '${style}', fontDisplay: 'swap', fontWeight: ${weight}, src: 'url(${rel}) format("woff2")' },`,
          )
        }
      }
    }
    if (faces.length === 0) continue
    const family = f.family.replace(/'/g, "\\'")
    lines.push(`    '${family}': [\n${faces.join('\n')}\n    ],`)
  }
  if (lines.length === 0) return ''
  return `  ${FONTFACE_MARKER}\n  globalFontface: {\n${lines.join('\n')}\n  },\n`
}

/**
 * Inserta/actualiza/elimina el bloque globalFontface marcado en
 * panda.config.ts. Idempotente: si el marker existe, reemplaza el bloque
 * completo (brace-matching); si no, lo inserta tras `export default
 * defineConfig({`. Con `faces` vacío elimina el bloque. Devuelve el src nuevo
 * (igual al original si no se pudo editar — nunca rompe el config).
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
    // Consume la coma y el whitespace que siguen al cierre del bloque.
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

// ── Helpers ──────────────────────────────────────────────────────────────────
/**
 * Intersección petición/disponible; si no se pidió nada usa defaults.
 * Devuelve valores únicos en el orden de `available`.
 */
function pick<T>(requested: T[] | undefined, available: T[], defaults: T[]): T[] {
  const src = requested && requested.length > 0 ? requested : defaults
  const set = new Set(src.filter((v) => available.includes(v)))
  return available.filter((v) => set.has(v))
}
