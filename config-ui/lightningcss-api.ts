/**
 * lightningcss-api — helpers del editor para el soporte NATIVO de Panda para
 * lightningcss (NO es un plugin de PostCSS — es ortogonal al pipeline que
 * gestiona postcss-api.ts).
 *
 * Panda expone 3 campos de nivel superior en `panda.config.ts`:
 *   lightningcss?: boolean    — usa lightningcss en vez de postcss para optimizar el CSS
 *   browserslist?: string[]   — queries de browserslist (mismo formato que
 *                                `overrideBrowserslist` de autoprefixer)
 *   minify?: boolean          — minifica el CSS generado
 *
 * Cuando `lightningcss: true`, Panda auto-registra internamente
 * `@pandacss/plugin-lightningcss` (ver `@pandacss/node`'s `applyAutoPlugins`,
 * llamado desde `loadConfigAndCreateContext` — se ejecuta tanto en `panda
 * cssgen` como dentro de `@pandacss/dev/postcss`, así que NO hace falta tocar
 * `runRebuild` ni el pipeline PostCSS). Ese plugin implementa el hook interno
 * `css:optimize` de Panda con `lightningcss.transform({ targets:
 * browserslistToTargets(browserslist(config.browserslist)), minify })`.
 *
 * `@pandacss/plugin-lightningcss`, `lightningcss` (binario nativo) y
 * `browserslist` NO requieren instalación aparte: son dependencias
 * transitivas de `@pandacss/node` (que ya trae `@pandacss/dev`, peer dep de
 * cualquier consumidor). `resolveTargets` los resuelve directamente del
 * proyecto consumidor (misma técnica de `createRequire` que
 * `postcss-runner.cjs`), nunca desde config-ui.
 */

import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { createRequire } from 'node:module'

/** Apertura del bloque de campos gestionado por el editor. */
export const LIGHTNINGCSS_MARKER = '/* pum:lightningcss */'
/** Cierre del bloque de campos gestionado por el editor. */
export const LIGHTNINGCSS_MARKER_END = '/* /pum:lightningcss */'

export interface LightningcssConfig {
  enabled: boolean
  browserslist: string[]
  minify: boolean
  /** Polyfillea @layer para navegadores viejos que no lo soportan nativamente — mismo tema que browserslist (targets viejos), campo independiente de Panda (funciona con o sin lightningcss). */
  polyfill: boolean
}

const DEFAULTS: LightningcssConfig = { enabled: false, browserslist: [], minify: false, polyfill: false }

/** Localiza el par de markers dentro de panda.config.ts. */
function findBlock(src: string): { start: number; end: number } | null {
  const start = src.indexOf(LIGHTNINGCSS_MARKER)
  if (start === -1) return null
  const end = src.indexOf(LIGHTNINGCSS_MARKER_END, start + LIGHTNINGCSS_MARKER.length)
  if (end === -1 || end <= start) return null
  return { start, end }
}

/**
 * Lee el bloque gestionado como objeto literal (`new Function`, igual que
 * `evalManagedBlock` en postcss-api.ts). Defaults si no hay bloque o no se
 * puede evaluar (edición manual con sintaxis no soportada).
 */
export function readLightningcssConfig(pandaConfigSrc: string): LightningcssConfig {
  const block = findBlock(pandaConfigSrc)
  if (!block) return { ...DEFAULTS }
  const inner = pandaConfigSrc.slice(block.start + LIGHTNINGCSS_MARKER.length, block.end)
  try {
    const value = new Function(`return ({ ${inner} })`)() as Partial<LightningcssConfig>
    return {
      enabled: value.lightningcss === true,
      browserslist: Array.isArray((value as any).browserslist) ? (value as any).browserslist.map(String) : [],
      minify: value.minify === true,
      polyfill: value.polyfill === true,
    }
  } catch {
    return { ...DEFAULTS }
  }
}

/**
 * Serializa el bloque gestionado. `polyfill` es independiente de
 * `lightningcss`/`browserslist`/`minify` (Panda lo aplica igual sin
 * lightningcss activo) — se escribe solo si está en `true`, sin arrastrar
 * las otras 3 líneas cuando `enabled` es `false`.
 */
function serializeBlock(cfg: LightningcssConfig): string {
  const lines = [`  ${LIGHTNINGCSS_MARKER}`]
  if (cfg.enabled) {
    lines.push(
      `  lightningcss: true,`,
      `  browserslist: ${JSON.stringify(cfg.browserslist)},`,
      `  minify: ${cfg.minify ? 'true' : 'false'},`,
    )
  }
  if (cfg.polyfill) lines.push(`  polyfill: true,`)
  lines.push(`  ${LIGHTNINGCSS_MARKER_END}`)
  return lines.join('\n') + '\n'
}

/**
 * Inserta/actualiza/elimina el bloque marcado en panda.config.ts. El bloque
 * existe si `enabled` o `polyfill` están activos (son independientes); se
 * elimina entero solo cuando AMBOS quedan en su default (`false`) — igual
 * que writeFontfaceConfig cuando no hay familias que emitir. Devuelve el src
 * nuevo (igual al original si no se pudo editar).
 */
export function writeLightningcssConfig(pandaConfigSrc: string, cfg: LightningcssConfig): string {
  const managed = (cfg.enabled || cfg.polyfill) ? serializeBlock(cfg) : ''
  const block = findBlock(pandaConfigSrc)

  if (block) {
    const head = pandaConfigSrc.slice(0, block.start)
    let after = block.end + LIGHTNINGCSS_MARKER_END.length
    // Consume la línea completa del marker de cierre + el salto de línea que
    // ya viene incluido en `managed` cuando se reescribe; si se está
    // eliminando el bloque, también limpia el salto de línea sobrante.
    while (after < pandaConfigSrc.length && pandaConfigSrc[after] === '\n') { after++; break }
    const tail = pandaConfigSrc.slice(after)
    if (!managed) return (head + tail).replace(/\n{3,}/g, '\n\n')
    return head + managed + tail
  }

  if (!managed) return pandaConfigSrc
  const anchor = 'export default defineConfig({\n'
  if (pandaConfigSrc.includes(anchor)) return pandaConfigSrc.replace(anchor, anchor + managed, 1)
  if (pandaConfigSrc.includes('defineConfig({')) {
    return pandaConfigSrc.replace('defineConfig({', 'defineConfig({\n' + managed, 1)
  }
  return pandaConfigSrc
}

// ── Resolución de targets (preview) ──────────────────────────────────────────
/** `require` resuelto desde la ubicación REAL de un paquete del proyecto consumidor (soporta node_modules anidado, no asume hoisting). */
function requireFromPackage(projectRoot: string, pkg: string) {
  const localRequire = createRequire(import.meta.url)
  const pkgJsonPath = localRequire.resolve(`${pkg}/package.json`, { paths: [projectRoot] })
  return createRequire(pkgJsonPath)
}

/** Decodifica el entero de versión de lightningcss (major<<16 | minor<<8 | patch) a texto. */
function decodeVersion(n: number): string {
  const major = (n >> 16) & 0xff
  const minor = (n >> 8) & 0xff
  const patch = n & 0xff
  if (patch) return `${major}.${minor}.${patch}`
  if (minor) return `${major}.${minor}`
  return `${major}`
}

// Las 9 claves documentadas en el .d.ts de lightningcss (Targets) más 3 que
// el runtime instalado (1.31.1) devuelve de más — verificado en vivo contra
// example-pum1, no están en el .d.ts pero sí en el objeto real.
const BROWSER_LABELS: Record<string, string> = {
  android: 'Android', chrome: 'Chrome', edge: 'Edge', firefox: 'Firefox', ie: 'IE',
  ios_saf: 'iOS Safari', opera: 'Opera', safari: 'Safari', samsung: 'Samsung Internet',
  and_chr: 'Chrome (Android)', and_ff: 'Firefox (Android)', op_mob: 'Opera Mobile',
}

export type ResolveTargetsResult =
  | { ok: true; targets: { browser: string; version: string }[] }
  | { ok: false; error: string }

/**
 * Resuelve las queries de browserslist a targets reales de lightningcss,
 * usando el `browserslist`/`lightningcss` DEL PROYECTO CONSUMIDOR (nunca los
 * de config-ui) — misma lógica que `@pandacss/plugin-lightningcss` usa
 * internamente. Queries vacías → defaults del proyecto (.browserslistrc o
 * los de caniuse-lite), igual que hace `applyAutoPlugins` cuando
 * `browserslist` no está fijado.
 */
export function resolveTargets(projectRoot: string, queries: string[]): ResolveTargetsResult {
  try {
    // @pandacss/plugin-lightningcss siempre tiene `lightningcss` y
    // `browserslist` como dependencias directas — resolver desde ahí
    // funciona sin importar si el package manager los hoisteó o no.
    const req = requireFromPackage(projectRoot, '@pandacss/plugin-lightningcss')
    const browserslist = req('browserslist')
    const { browserslistToTargets } = req('lightningcss')
    const list = queries.map((q) => q.trim()).filter(Boolean)
    const resolved = browserslistToTargets(browserslist(list.length ? list : undefined))
    const targets = Object.entries(resolved as Record<string, number>)
      .map(([browser, version]) => ({ browser: BROWSER_LABELS[browser] || browser, version: decodeVersion(version) }))
      .sort((a, b) => a.browser.localeCompare(b.browser))
    return { ok: true, targets }
  } catch (e) {
    return { ok: false, error: String(e instanceof Error ? e.message : e) }
  }
}

/** Lee panda.config.ts desde disco y lo parsea. */
export function readLightningcss(projectRoot: string): LightningcssConfig {
  const p = pandaConfigPath(projectRoot)
  if (!existsSync(p)) return { ...DEFAULTS }
  return readLightningcssConfig(readFileSync(p, 'utf8'))
}

/** Escribe la config en panda.config.ts. Devuelve si cambió. */
export function writeLightningcss(projectRoot: string, cfg: LightningcssConfig): boolean {
  const p = pandaConfigPath(projectRoot)
  if (!existsSync(p)) return false
  const src = readFileSync(p, 'utf8')
  const next = writeLightningcssConfig(src, cfg)
  if (next === src) return false
  writeFileSync(p, next, 'utf8')
  return true
}

function pandaConfigPath(projectRoot: string): string {
  return `${projectRoot}/panda.config.ts`
}
