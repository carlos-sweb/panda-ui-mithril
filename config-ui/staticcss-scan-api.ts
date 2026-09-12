/**
 * staticcss-scan-api — helpers del editor para reducir `staticCss.recipes`
 * de `'*'` (todos los recipes de la librería, el default) a solo los
 * recipes que el proyecto consumidor REALMENTE usa.
 *
 * Algoritmo (todo en tiempo de escaneo, nunca precomputado/shippeado — así
 * siempre está en sync con la versión de panda-ui-mithril instalada):
 *  1. `buildComponentGraph(libRoot)` — parsea el propio código fuente del
 *     paquete instalado (`src/index.js`, `package.json`'s `exports`, cada
 *     cada `index.js` bajo `src/components`) para construir:
 *       - símbolo exportado del barrel -> carpeta de componente
 *       - subpath del exports map (`panda-ui-mithril/button`) -> carpeta
 *       - carpeta -> recipes que importa directamente
 *       - carpeta -> OTRAS carpetas de las que depende (wrapper: p. ej.
 *         Modal importa ButtonClose, que a su vez importa Button)
 *  2. `scanUsedFolders(projectRoot, include, graph)` — escanea los archivos
 *     del CONSUMIDOR (mismo glob `include` que ya usa panda.config.ts) en
 *     busca de imports de `panda-ui-mithril`/`panda-ui-mithril/{subpath}`,
 *     resuelve cada símbolo/subpath a una carpeta vía el grafo del paso 1.
 *  3. `closureRecipes(usedFolders, graph)` — BFS sobre las dependencias
 *     wrapper: cierre transitivo, así Table (que usa Pagination/Select/
 *     Skeleton, y Pagination a su vez usa Button) arrastra TODOS esos
 *     recipes, no solo el de `table`.
 *
 * Límite conocido (análisis estático, documentado en la UI): no detecta
 * imports dinámicos (`m(variableComputada)`) ni re-exports indirectos vía
 * un barrel propio del consumidor. Por eso existe el campo "manual" —
 * recipes que el usuario agrega a mano y que el scan NUNCA toca ni
 * sobrescribe (persisten en `{raiz}/staticcss.json`, independientes del
 * resultado del scan; el valor final escrito en panda.config.ts es
 * siempre `scan ∪ manual`).
 */

import { existsSync, readFileSync, readdirSync, writeFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import { dirname, join } from 'node:path'

// ── Resolución robusta de paquetes del proyecto consumidor ──────────────────
/** `require` resuelto desde la ubicación REAL de un paquete (soporta node_modules anidado). */
function requireFromPackage(projectRoot: string, pkg: string) {
  const localRequire = createRequire(import.meta.url)
  const pkgJsonPath = localRequire.resolve(`${pkg}/package.json`, { paths: [projectRoot] })
  return createRequire(pkgJsonPath)
}

// ── Grafo del paquete (componente -> recipes / componente -> componente) ────
export interface ComponentGraph {
  symbolToFolder: Record<string, string>
  subpathToFolder: Record<string, string>
  recipes: Record<string, string[]>
  deps: Record<string, string[]>
}

/** `export { A, B } from './components/X'` -> { A: 'X', B: 'X' }. Soporta `A as B`. */
function parseBarrel(indexSrc: string): Record<string, string> {
  const symbolToFolder: Record<string, string> = {}
  const re = /export\s*\{([^}]+)\}\s*from\s*['"]\.\/components\/([A-Za-z0-9]+)['"]/g
  let m: RegExpExecArray | null
  while ((m = re.exec(indexSrc))) {
    const folder = m[2]
    for (const raw of m[1].split(',')) {
      const sym = raw.trim().split(/\s+as\s+/).pop()?.trim()
      if (sym) symbolToFolder[sym] = folder
    }
  }
  return symbolToFolder
}

/** `exports['./button'].import === '.../components/Button/index.js'` -> { button: 'Button' }. */
function parseExportsMap(pkgJson: { exports?: Record<string, unknown> }): Record<string, string> {
  const subpathToFolder: Record<string, string> = {}
  const exportsMap = pkgJson.exports || {}
  for (const [subpath, entry] of Object.entries(exportsMap)) {
    if (subpath === '.' || subpath.includes('package.json')) continue
    const importPath = (entry as { import?: string } | undefined)?.import
    if (!importPath) continue
    const m = /\/components\/([A-Za-z0-9]+)\//.exec(importPath)
    if (m) subpathToFolder[subpath.replace(/^\.\//, '')] = m[1]
  }
  return subpathToFolder
}

/** Recipes importados de styled-system/recipes + carpetas de otros componentes importados. */
function parseComponentFile(src: string, ownFolder: string): { recipes: string[]; deps: string[] } {
  const recipes = new Set<string>()
  for (const m of src.matchAll(/import\s*\{([^}]+)\}\s*from\s*['"][./]*styled-system\/recipes['"]/g)) {
    for (const sym of m[1].split(',')) {
      const s = sym.trim()
      if (s) recipes.add(s)
    }
  }
  const deps = new Set<string>()
  for (const m of src.matchAll(/from\s*['"]\.\.\/([A-Za-z0-9]+)\/index\.jsx?['"]/g)) {
    if (m[1] !== ownFolder) deps.add(m[1])
  }
  return { recipes: [...recipes], deps: [...deps] }
}

/** Construye el grafo completo desde el código fuente del paquete instalado (libRoot). */
export function buildComponentGraph(libRoot: string): ComponentGraph {
  const indexSrc = readFileSync(join(libRoot, 'src/index.js'), 'utf8')
  const symbolToFolder = parseBarrel(indexSrc)
  const pkgJson = JSON.parse(readFileSync(join(libRoot, 'package.json'), 'utf8'))
  const subpathToFolder = parseExportsMap(pkgJson)

  const recipes: Record<string, string[]> = {}
  const deps: Record<string, string[]> = {}
  const compDir = join(libRoot, 'src/components')
  for (const folder of readdirSync(compDir)) {
    const idxJs = join(compDir, folder, 'index.js')
    const idxJsx = join(compDir, folder, 'index.jsx')
    const file = existsSync(idxJs) ? idxJs : existsSync(idxJsx) ? idxJsx : null
    if (!file) continue
    const parsed = parseComponentFile(readFileSync(file, 'utf8'), folder)
    recipes[folder] = parsed.recipes
    deps[folder] = parsed.deps
  }
  return { symbolToFolder, subpathToFolder, recipes, deps }
}

/** Cierre transitivo: recipes de las carpetas usadas + de TODA carpeta de la que dependan (wrappers). */
export function closureRecipes(usedFolders: string[], graph: ComponentGraph): string[] {
  const visited = new Set<string>()
  const stack = [...usedFolders]
  while (stack.length) {
    const f = stack.pop()!
    if (visited.has(f)) continue
    visited.add(f)
    for (const dep of graph.deps[f] || []) stack.push(dep)
  }
  const out = new Set<string>()
  for (const f of visited) for (const r of graph.recipes[f] || []) out.add(r)
  return [...out]
}

// ── Escaneo del código del CONSUMIDOR ────────────────────────────────────────
const BARREL_IMPORT_RE = /import\s*\{([^}]+)\}\s*from\s*['"]panda-ui-mithril['"]/g
const SUBPATH_IMPORT_RE = /from\s*['"]panda-ui-mithril\/([a-z0-9-]+)['"]/g

/** Escanea los archivos del consumidor (glob `include`) por imports de la librería. */
export function scanUsedFolders(
  projectRoot: string,
  includeGlobs: string[],
  graph: ComponentGraph,
): { folders: string[]; filesScanned: number } {
  const fastGlob = requireFromPackage(projectRoot, '@pandacss/node')('fast-glob')
  const patterns = includeGlobs.length ? includeGlobs : ['./src/**/*.{js,jsx,ts,tsx}']
  const files: string[] = fastGlob.sync(patterns, {
    cwd: projectRoot,
    absolute: true,
    ignore: ['**/node_modules/**'],
  })
  const used = new Set<string>()
  for (const file of files) {
    let src: string
    try {
      src = readFileSync(file, 'utf8')
    } catch {
      continue
    }
    for (const m of src.matchAll(BARREL_IMPORT_RE)) {
      for (const rawSym of m[1].split(',')) {
        const sym = rawSym.trim().split(/\s+as\s+/)[0].trim()
        const folder = graph.symbolToFolder[sym]
        if (folder) used.add(folder)
      }
    }
    for (const m of src.matchAll(SUBPATH_IMPORT_RE)) {
      const folder = graph.subpathToFolder[m[1]]
      if (folder) used.add(folder)
    }
  }
  return { folders: [...used].sort(), filesScanned: files.length }
}

export type ScanResult =
  | { ok: true; components: string[]; recipes: string[]; filesScanned: number }
  | { ok: false; error: string }

/** Orquesta el escaneo completo: grafo del paquete + escaneo del consumidor + cierre transitivo. */
export function scanProject(projectRoot: string, libRoot: string): ScanResult {
  try {
    const graph = buildComponentGraph(libRoot)
    const configPath = join(projectRoot, 'panda.config.ts')
    const src = existsSync(configPath) ? readFileSync(configPath, 'utf8') : ''
    const include = readInclude(src)
    const { folders, filesScanned } = scanUsedFolders(projectRoot, include, graph)
    const recipes = closureRecipes(folders, graph)
    return { ok: true, components: folders, recipes: recipes.sort(), filesScanned }
  } catch (e) {
    return { ok: false, error: String(e instanceof Error ? e.message : e) }
  }
}

// ── Lectura/escritura de panda.config.ts (`include` y `staticCss.recipes`) ──
/** Scan balanceado desde un char de apertura; devuelve el índice DESPUÉS del cierre correspondiente, o -1. */
function scanBalanced(src: string, openIdx: number, open: string, close: string): number {
  let depth = 0
  for (let i = openIdx; i < src.length; i++) {
    if (src[i] === open) depth++
    else if (src[i] === close) {
      depth--
      if (depth === 0) return i + 1
    }
  }
  return -1
}

/** Lee el array `include: [...]` de panda.config.ts (para reusar el mismo glob que Panda ya escanea). */
export function readInclude(pandaConfigSrc: string): string[] {
  const m = /include\s*:\s*\[/.exec(pandaConfigSrc)
  if (!m) return []
  const bracketOpen = m.index + m[0].length - 1
  const end = scanBalanced(pandaConfigSrc, bracketOpen, '[', ']')
  if (end === -1) return []
  try {
    const value = new Function(`return (${pandaConfigSrc.slice(bracketOpen, end)})`)() as unknown[]
    return Array.isArray(value) ? value.map(String) : []
  } catch {
    return []
  }
}

/** Localiza el span de `staticCss: { ... }`. */
function findStaticCssBlock(src: string): { braceOpen: number; braceClose: number } | null {
  const m = /staticCss\s*:\s*\{/.exec(src)
  if (!m) return null
  const braceOpen = m.index + m[0].length - 1
  const braceClose = scanBalanced(src, braceOpen, '{', '}')
  if (braceClose === -1) return null
  return { braceOpen, braceClose }
}

/** Dentro de [blockStart, blockEnd), localiza el valor de `recipes:` — string '*' u objeto/array {...}. */
function findRecipesValueSpan(src: string, blockStart: number, blockEnd: number): { valueStart: number; valueEnd: number } | null {
  const slice = src.slice(blockStart, blockEnd)
  const m = /recipes\s*:\s*/.exec(slice)
  if (!m) return null
  const valueStart = blockStart + m.index + m[0].length
  const ch = src[valueStart]
  if (ch === "'" || ch === '"') {
    const end = src.indexOf(ch, valueStart + 1)
    return end === -1 ? null : { valueStart, valueEnd: end + 1 }
  }
  if (ch === '{') {
    const end = scanBalanced(src, valueStart, '{', '}')
    return end === -1 ? null : { valueStart, valueEnd: end }
  }
  // Forma ARRAY (`recipes: ['tag']`): la escribió a mano algún consumidor o
  // una versión previa del editor. Panda la IGNORA en silencio (`{...['tag']}`
  // → `{0: 'tag'}`), así que hay que reconocerla para poder leerla y
  // reescribirla en la forma canónica en vez de duplicar la clave.
  if (ch === '[') {
    const end = scanBalanced(src, valueStart, '[', ']')
    return end === -1 ? null : { valueStart, valueEnd: end }
  }
  return null
}

/**
 * Lee `staticCss.recipes` actual: `'*'`, o la lista de recipes. Acepta las dos
 * formas que existen en la práctica: objeto `{ tag: ['*'] }` (la que escribe
 * el editor) y array `['tag']` (escrita a mano — Panda la ignora, pero
 * leyéndola el editor puede repararla al guardar).
 */
export function readStaticCssRecipes(pandaConfigSrc: string): '*' | string[] {
  const block = findStaticCssBlock(pandaConfigSrc)
  if (!block) return '*'
  const span = findRecipesValueSpan(pandaConfigSrc, block.braceOpen, block.braceClose)
  if (!span) return '*'
  const text = pandaConfigSrc.slice(span.valueStart, span.valueEnd).trim()
  if (text.startsWith("'") || text.startsWith('"')) return '*'
  try {
    const obj = new Function(`return (${text})`)() as unknown
    if (Array.isArray(obj)) return obj.map(String)
    if (obj && typeof obj === 'object') return Object.keys(obj as Record<string, unknown>)
    return '*'
  } catch {
    return '*'
  }
}

function serializeRecipesObject(recipes: string[]): string {
  const sorted = [...new Set(recipes)].sort()
  if (sorted.length === 0) return '{}'
  const lines = sorted.map((k) => `    ${JSON.stringify(k)}: ['*'],`)
  return `{\n${lines.join('\n')}\n  }`
}

/**
 * Escribe `staticCss.recipes`: `'*'` (desactivado, vuelve al default seguro
 * de Panda) o una lista de recipe keys, serializada como objeto
 * `{key: ['*']}` (la forma que Panda expande a base + variantes).
 *
 * Lanza en vez de escribir algo peligroso:
 *  - lista vacía → escribiría `{}`, que en Panda significa "ningún recipe"
 *    (todos los componentes sin CSS). Para desactivar se usa `'*'`.
 *  - `recipes` existe pero con una forma que no sabemos reemplazar → antes
 *    insertaba una SEGUNDA clave `recipes:`; en JS gana la última, así que el
 *    valor viejo (p. ej. el array inválido) seguía mandando y el CSS se caía.
 */
export function writeStaticCssRecipes(pandaConfigSrc: string, recipes: '*' | string[]): string {
  if (recipes !== '*' && recipes.length === 0) {
    throw new Error(
      'staticCss.recipes quedaría vacío ({} = ningún recipe: todos los componentes sin CSS). ' +
      "Para desactivar el scan usa el modo '*'.",
    )
  }
  const valueText = recipes === '*' ? `'*'` : serializeRecipesObject(recipes)
  const block = findStaticCssBlock(pandaConfigSrc)
  if (block) {
    const span = findRecipesValueSpan(pandaConfigSrc, block.braceOpen, block.braceClose)
    if (span) {
      return pandaConfigSrc.slice(0, span.valueStart) + valueText + pandaConfigSrc.slice(span.valueEnd)
    }
    // `staticCss` existe pero no hay un `recipes:` reconocible: puede que no
    // exista (se agrega) o que su valor sea una expresión rara. Solo se agrega
    // si de verdad no hay ninguna clave `recipes` en el bloque.
    const hasRecipesKey = /(^|[{,\s])recipes\s*:/.test(pandaConfigSrc.slice(block.braceOpen + 1, block.braceClose))
    if (hasRecipesKey) {
      throw new Error(
        'staticCss.recipes existe pero con una forma que el editor no sabe reemplazar ' +
        '(¿una variable o una expresión?). Déjalo como está y edítalo a mano.',
      )
    }
    const insertAt = block.braceOpen + 1
    return pandaConfigSrc.slice(0, insertAt) + `\n    recipes: ${valueText},` + pandaConfigSrc.slice(insertAt)
  }
  const staticCssBlock = `  staticCss: {\n    recipes: ${valueText},\n  },\n`
  const anchor = 'export default defineConfig({\n'
  if (pandaConfigSrc.includes(anchor)) return pandaConfigSrc.replace(anchor, anchor + staticCssBlock, 1)
  if (pandaConfigSrc.includes('defineConfig({')) {
    return pandaConfigSrc.replace('defineConfig({', 'defineConfig({\n' + staticCssBlock, 1)
  }
  throw new Error('No se encontró defineConfig({...}) en panda.config.ts: no se puede escribir staticCss.')
}

// ── Recipes manuales — {raiz}/staticcss.json (NUNCA tocado por el scan) ─────
// Mismo patrón que postcss.build.json/fonts-loaded.json: raiz = dirname(themeDir).
export const MANUAL_CONFIG_NAME = 'staticcss.json'

export function manualConfigPath(raiz: string): string {
  return join(raiz, MANUAL_CONFIG_NAME)
}

/** Recipes agregados a mano por el usuario — se preservan siempre, el scan nunca los quita ni los pisa. */
export function readManualRecipes(raiz: string): string[] {
  const p = manualConfigPath(raiz)
  if (!existsSync(p)) return []
  try {
    const d = JSON.parse(readFileSync(p, 'utf8')) as { manual?: unknown }
    return Array.isArray(d.manual) ? d.manual.map(String) : []
  } catch {
    return []
  }
}

export function writeManualRecipes(raiz: string, manual: string[]): boolean {
  const p = manualConfigPath(raiz)
  const clean = [...new Set(manual.map((s) => s.trim()).filter(Boolean))].sort()
  const next = JSON.stringify({ manual: clean }, null, 2) + '\n'
  const prev = existsSync(p) ? readFileSync(p, 'utf8') : ''
  if (prev === next) return false
  writeFileSync(p, next, 'utf8')
  return true
}

// ── Orquestación: leer/escribir el estado completo de la página ─────────────
export interface StaticCssState {
  enabled: boolean
  recipes: string[]
  manual: string[]
  include: string[]
}

/** Lee el estado actual (sin escanear): útil para pintar la página al cargar. */
export function readStaticCssState(projectRoot: string, raiz: string): StaticCssState {
  const configPath = join(projectRoot, 'panda.config.ts')
  const src = existsSync(configPath) ? readFileSync(configPath, 'utf8') : ''
  const current = readStaticCssRecipes(src)
  const manual = readManualRecipes(raiz)
  return {
    enabled: current !== '*',
    recipes: current === '*' ? [] : current,
    manual,
    include: readInclude(src),
  }
}

/** Escribe panda.config.ts + staticcss.json. `enabled: false` restaura `'*'` (revierte todo). */
export function writeStaticCssState(
  projectRoot: string,
  raiz: string,
  opts: { enabled: boolean; recipes: string[]; manual: string[] },
): boolean {
  const configPath = join(projectRoot, 'panda.config.ts')
  if (!existsSync(configPath)) return false
  const src = readFileSync(configPath, 'utf8')
  const finalValue: '*' | string[] = opts.enabled ? [...new Set([...opts.recipes, ...opts.manual])] : '*'
  const next = writeStaticCssRecipes(src, finalValue)
  let changed = false
  if (next !== src) {
    writeFileSync(configPath, next, 'utf8')
    changed = true
  }
  if (writeManualRecipes(raiz, opts.manual)) changed = true
  return changed
}
