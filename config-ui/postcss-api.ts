/**
 * postcss-api — helpers del editor para los plugins de PostCSS (modelo npm).
 *
 * Flujo (igual que fonts): el listado OFICIAL de plugins de postcss.org
 * (https://postcss.org/docs/postcss-plugins) es el catálogo; "Install" ejecuta
 * `bun add {paquete}` en la raíz del proyecto y el plugin queda DISPONIBLE en
 * node_modules. Configurar qué plugins entran en el pipeline (build css) es
 * una fase posterior — aquí solo se gestiona la presencia en node_modules.
 *
 * El catálogo se sirve como HTML server-rendered (14 categorías + ~355
 * plugins), se parsea sin dependencias y se cachea en memoria 30 min (mismo
 * patrón que fonts-api con el listado JSON de Fontsource).
 *
 * Nombres npm: el listado oficial muestra el nombre de invocación del plugin
 * (p. ej. `postcss-import`, `cssnano`), que suele coincidir con el paquete
 * npm, pero no siempre (`short` → paquete `postcss-short`). Por eso el
 * paquete a instalar se RESUELVE contra la registry de npm bajo demanda
 * (con fallback `postcss-` + nombre y caché en memoria), nunca se asume.
 */

import { existsSync, readdirSync } from 'node:fs'
import { spawnSync } from 'node:child_process'
import { join } from 'node:path'

// ── Catálogo oficial (postcss.org/docs/postcss-plugins) ─────────────────────
const CATALOG_URL = 'https://postcss.org/docs/postcss-plugins'
const REGISTRY_URL = (name: string) => `https://registry.npmjs.org/${encodeURIComponent(name)}`
const FETCH_TIMEOUT = 20_000

/** Un plugin del listado oficial. */
export interface PostcssPlugin {
  /** Nombre de invocación del plugin (lo que muestra el listado). */
  name: string
  /** Descripción corta del listado. */
  description: string
  /** URL del plugin (repo / web / npm). */
  url: string
  /** Categoría del listado (Control, Packs, Future CSS Syntax…). */
  category: string
  /** Id de la categoría (anchor del h2). */
  categoryId: string
  /** Paquete npm candidato (ver npmNameFor). Puede diferir de `name`. */
  npm: string
}

export interface PostcssCategory {
  id: string
  name: string
  plugins: PostcssPlugin[]
}

let catalogCache: { at: number; categories: PostcssCategory[] } | null = null
const CATALOG_TTL = 30 * 60 * 1000

/** Decodifica entidades HTML básicas en texto plano. */
function decodeEntities(s: string): string {
  return s
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/&nbsp;/g, ' ')
}

/** Texto plano de un fragmento HTML (sin tags ni entidades), colapsado. */
function textOf(html: string): string {
  return decodeEntities(html.replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim()
}

/**
 * Candidatos a paquete npm para un plugin del listado, en orden de prioridad:
 *  1. slug de un href npmjs.com/package/X (fuente exacta del paquete);
 *  2. último segmento de un href github.com (cubre repos propios
 *     `postcss-import`, `postcss-short`, y subpaths del monorepo csstools
 *     `…/tree/main/plugins/postcss-custom-media` → `postcss-custom-media`);
 *  3. el nombre de invocación del listado (packs: cssnano, stylelint…);
 *  4. `postcss-` + nombre (convención de la mayoría).
 * La registry npm decide al final (resolveNpmPackage prueba en orden).
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
 * Parsea el HTML server-rendered de postcss.org/docs/postcss-plugins.
 * Estructura: `<h2 … id="{cat}">Name</h2>` seguido de `<ul><li>…</li></ul>`;
 * cada li contiene `<a href="…"><code>{nombre}</code></a> {descripción}`.
 */
export function parseCatalogHtml(html: string): PostcssCategory[] {
  const categories: PostcssCategory[] = []
  // Divide por h2 de categoría: [pre, id1, title1, body1, id2, title2, …]
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
      // Descripción = resto del li (sin tags ni entidades), quitando el
      // nombre/url que ya se exponen por separado.
      const description = textOf(item.replace(anchor[0], ' '))
      plugins.push({
        name: pluginName,
        description,
        url,
        category: name,
        categoryId: id,
        // Mejor candidato a paquete npm (fuente más fiable del href); la
        // instalación real resuelve contra la registry con todos los
        // candidatos (resolveNpmPackage).
        npm: npmCandidates(pluginName, url)[0] ?? pluginName,
      })
    }
    if (plugins.length > 0) categories.push({ id, name, plugins })
  }
  return categories
}

/** Listado oficial con caché en memoria. Lanza si la página falla. */
export async function catalog(): Promise<PostcssCategory[]> {
  const now = Date.now()
  if (catalogCache && now - catalogCache.at < CATALOG_TTL) return catalogCache.categories
  const res = await fetch(CATALOG_URL, { signal: AbortSignal.timeout(FETCH_TIMEOUT) })
  if (!res.ok) throw new Error(`postcss.org ${res.status}`)
  const html = await res.text()
  const categories = parseCatalogHtml(html)
  if (categories.length === 0) throw new Error('No se pudo parsear el listado de plugins')
  catalogCache = { at: now, categories }
  return categories
}

/** Filtra el catálogo por nombre/descripción (case-insensitive). */
export function searchCatalog(q: string): PostcssCategory[] {
  const needle = q.trim().toLowerCase()
  const all = catalogCache?.categories ?? []
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

// ── Resolución del paquete npm ───────────────────────────────────────────────
const NAME_RE = /^[a-z0-9][a-z0-9._-]*$/
const SCOPE_RE = /^@[a-z0-9][a-z0-9._-]*\/[a-z0-9][a-z0-9._-]*$/

/** true si el paquete existe en la registry npm (GET al doc del latest). */
async function npmPackageExists(name: string): Promise<boolean> {
  try {
    const res = await fetch(REGISTRY_URL(name), { signal: AbortSignal.timeout(FETCH_TIMEOUT) })
    return res.ok
  } catch {
    return false
  }
}

// Caché name → paquete npm resuelto (o null si no existe) — evita golpear la
// registry por cada instalación repetida del mismo plugin.
let pkgResolveCache: { name: string; resolved: string | null; at: number }[] = []
const RESOLVE_TTL = 60 * 60 * 1000

/**
 * Resuelve el paquete npm real a instalar para un plugin del listado,
 * probando sus candidatos (npmCandidates) contra la registry en orden de
 * prioridad. Devuelve null si ninguno existe.
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

// ── Instalación / presencia en node_modules ──────────────────────────────────
/** `bun add {paquete}` en la raíz del proyecto. */
export function bunAddPackage(projectRoot: string, pkg: string): { ok: boolean; output: string } {
  const r = spawnSync('bun', ['add', pkg], { cwd: projectRoot, encoding: 'utf8', timeout: 180_000 })
  return { ok: r.status === 0, output: String(r.stdout || '') + String(r.stderr || '') }
}

/** `bun remove {paquete}` en la raíz del proyecto. */
export function bunRemovePackage(projectRoot: string, pkg: string): { ok: boolean; output: string } {
  const r = spawnSync('bun', ['remove', pkg], { cwd: projectRoot, encoding: 'utf8', timeout: 120_000 })
  return { ok: r.status === 0, output: String(r.stdout || '') + String(r.stderr || '') }
}

/** Ruta del paquete dentro de node_modules (soporta scope @scope/name). */
export function packagePath(projectRoot: string, pkg: string): string {
  const p = pkg.startsWith('@') ? pkg.split('/') : [pkg]
  return join(projectRoot, 'node_modules', ...p)
}

/** ¿Está el paquete físicamente en node_modules del proyecto? */
export function packageInstalled(projectRoot: string, pkg: string): boolean {
  try {
    const p = packagePath(projectRoot, pkg)
    return existsSync(join(p, 'package.json')) || existsSync(p)
  } catch {
    return false
  }
}

/** Nombres de paquetes de primer nivel en node_modules (para membership). */
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
          /* scope sin leer — se ignora */
        }
      } else {
        names.add(entry)
      }
    }
  } catch {
    /* sin node_modules — set vacío */
  }
  return names
}

/**
 * Plugins del catálogo presentes en node_modules (los "disponibles").
 * Recibe el catálogo para cruzar nombres npm con lo instalado; devuelve solo
 * coincidencias con su metadata.
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
