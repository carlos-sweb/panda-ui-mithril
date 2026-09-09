/**
 * advanced-config-api — helpers del editor para un subconjunto curado de
 * campos de nivel superior de `panda.config.ts` que aún no tenían UI propia:
 * `preflight`, `strictTokens`, `strictPropertyValues`, `hash`, `clean`
 * (booleans simples) + `include`/`exclude` (globs, ya usados por el scanner
 * de Static Css Recipes — aquí se agrega el editor para escribirlos).
 *
 * Deliberadamente NO incluye TODO lo que expone `defineConfig` — ver el
 * análisis en la sesión que originó este archivo: `jsxFramework`/`jsxFactory`
 * quedan fijos a Mithril (exponerlos rompería el paquete), `outdir` fijo a
 * `styled-system` (AGENTS.md ya lo documenta como footgun si cambia),
 * `layers`/`separator` necesitan regenerar `pum/index.css` también (fuera de
 * alcance de esta pasada), y `hooks`/`plugins`/`presets` no son serializables
 * a un formulario.
 *
 * `prefix` — SUSPENDIDO a pedido del usuario tras verificar (build real
 * contra `example-pum1` con el paquete instalado, no el repo de
 * panda-ui-mithril) que `prefix.className` rompe TODO el paquete, no solo
 * los 17 recipes con selector CSS literal a otro componente: cada
 * componente importa su recipe desde el `styled-system/recipes` PROPIO de
 * panda-ui-mithril, precompilado y congelado al publicar en npm — el
 * prefijo del consumidor solo reprefija el CSS de SU corrida de Panda,
 * nunca ese JS ya compilado, así que el DOM queda con clases sin prefijo
 * mientras el CSS generado las tiene prefijadas (cero reglas matchean). Ver
 * el bullet `prefix` en AGENTS.md (sección de campos excluidos) para el
 * detalle completo. `cssVar` sí sería seguro (todo pasa por `token()`) pero
 * se retira el campo entero para no reintroducir el riesgo por accidente —
 * si se retoma, debe ser cssVar-only.
 *
 * Mecanismos de escritura, según si el campo YA existe sin marcar en el
 * scaffold de `cli.ts` o no:
 *  - `preflight`/`strictTokens`/`strictPropertyValues`/`hash`/`clean`:
 *    NUEVOS — bloque marcado aditivo `/* pum:advanced *​/` (mismo patrón que
 *    lightningcss-api.ts), se puede insertar/quitar entero.
 *  - `include`/`exclude`: YA EXISTEN sin marcar en el scaffold
 *    (`CONFIG_TEMPLATE` de cli.ts ya escribe `include: [...]`) — reemplazo
 *    quirúrgico del valor por key (mismo balanced-brace scan que
 *    `staticCss.recipes` en staticcss-scan-api.ts), nunca un bloque nuevo.
 */

import { existsSync, readFileSync, writeFileSync } from 'node:fs'

// ── Bloque aditivo: preflight/strictTokens/strictPropertyValues/hash/clean ──
export const ADVANCED_MARKER = '/* pum:advanced */'
export const ADVANCED_MARKER_END = '/* /pum:advanced */'

export interface AdvancedFlags {
  preflight: boolean
  strictTokens: boolean
  strictPropertyValues: boolean
  hash: boolean
  clean: boolean
}

const FLAG_KEYS: (keyof AdvancedFlags)[] =
  ['preflight', 'strictTokens', 'strictPropertyValues', 'hash', 'clean']
// Defaults reales de Panda (ver @pandacss/types/dist/config.d.ts) — lo que
// se muestra cuando el bloque no existe todavía.
const FLAG_DEFAULTS: AdvancedFlags = {
  preflight: true,
  strictTokens: false,
  strictPropertyValues: false,
  hash: false,
  clean: false,
}

function findBlock(src: string, marker: string, markerEnd: string): { start: number; end: number } | null {
  const start = src.indexOf(marker)
  if (start === -1) return null
  const end = src.indexOf(markerEnd, start + marker.length)
  if (end === -1 || end <= start) return null
  return { start, end }
}

/** Lee el bloque gestionado; defaults de Panda si no hay bloque (o no se puede evaluar). */
export function readAdvancedFlags(pandaConfigSrc: string): AdvancedFlags {
  const block = findBlock(pandaConfigSrc, ADVANCED_MARKER, ADVANCED_MARKER_END)
  if (!block) return { ...FLAG_DEFAULTS }
  const inner = pandaConfigSrc.slice(block.start + ADVANCED_MARKER.length, block.end)
  try {
    const value = new Function(`return ({ ${inner} })`)() as Partial<AdvancedFlags>
    const out = { ...FLAG_DEFAULTS }
    for (const k of FLAG_KEYS) if (typeof value[k] === 'boolean') out[k] = value[k] as boolean
    return out
  } catch {
    return { ...FLAG_DEFAULTS }
  }
}

function serializeFlagsBlock(flags: AdvancedFlags): string {
  const lines = [`  ${ADVANCED_MARKER}`, ...FLAG_KEYS.map((k) => `  ${k}: ${flags[k] ? 'true' : 'false'},`)]
  lines.push(`  ${ADVANCED_MARKER_END}`)
  return lines.join('\n') + '\n'
}

/**
 * Escribe el bloque de flags. `enabled: false` (ninguna difiere de
 * FLAG_DEFAULTS) elimina el bloque entero — vuelve a los defaults reales de
 * Panda sin dejar nada explícito en el archivo.
 */
export function writeAdvancedFlags(pandaConfigSrc: string, flags: AdvancedFlags): string {
  const isDefault = FLAG_KEYS.every((k) => flags[k] === FLAG_DEFAULTS[k])
  const managed = isDefault ? '' : serializeFlagsBlock(flags)
  const block = findBlock(pandaConfigSrc, ADVANCED_MARKER, ADVANCED_MARKER_END)

  if (block) {
    const head = pandaConfigSrc.slice(0, block.start)
    let after = block.end + ADVANCED_MARKER_END.length
    if (pandaConfigSrc[after] === '\n') after++
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

// ── Reemplazo quirúrgico: include / exclude (ya existen sin marcar) ─────────
/** Scan balanceado desde un char de apertura; devuelve el índice DESPUÉS del cierre, o -1. */
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

/** Lee un array `key: [...]` de nivel superior de defineConfig. `[]` si no existe o no se puede parsear. */
export function readArrayField(pandaConfigSrc: string, key: string): string[] {
  const re = new RegExp(`\\b${key}\\s*:\\s*\\[`)
  const m = re.exec(pandaConfigSrc)
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

/**
 * Escribe un array `key: [...]` de nivel superior — reemplaza el valor si ya
 * existe (p. ej. `include` del scaffold de cli.ts), lo agrega si no. Array
 * vacío ELIMINA el campo por completo (vuelve al comportamiento default de
 * Panda: `include` vacío = todo, `exclude` vacío = nada excluido).
 */
export function writeArrayField(pandaConfigSrc: string, key: string, values: string[]): string {
  const re = new RegExp(`\\b${key}\\s*:\\s*\\[`)
  const m = re.exec(pandaConfigSrc)
  const valueText = `[\n${values.map((v) => `    ${JSON.stringify(v)},`).join('\n')}\n  ]`

  if (m) {
    const bracketOpen = m.index + m[0].length - 1
    const bracketClose = scanBalanced(pandaConfigSrc, bracketOpen, '[', ']')
    if (bracketClose === -1) return pandaConfigSrc
    if (values.length === 0) {
      // Elimina TODO el campo `key: [...],` (busca hacia atrás el inicio de la línea del key).
      const lineStart = pandaConfigSrc.lastIndexOf('\n', m.index) + 1
      let after = bracketClose
      while (pandaConfigSrc[after] === ',') after++
      while (pandaConfigSrc[after] === '\n') { after++; break }
      return pandaConfigSrc.slice(0, lineStart) + pandaConfigSrc.slice(after)
    }
    return pandaConfigSrc.slice(0, bracketOpen) + valueText + pandaConfigSrc.slice(bracketClose)
  }

  if (values.length === 0) return pandaConfigSrc
  const field = `  ${key}: ${valueText},\n`
  const anchor = 'export default defineConfig({\n'
  if (pandaConfigSrc.includes(anchor)) return pandaConfigSrc.replace(anchor, anchor + field, 1)
  if (pandaConfigSrc.includes('defineConfig({')) {
    return pandaConfigSrc.replace('defineConfig({', 'defineConfig({\n' + field, 1)
  }
  return pandaConfigSrc
}

// ── Orquestación: leer/escribir el estado completo de la página ─────────────
export interface AdvancedState extends AdvancedFlags {
  include: string[]
  exclude: string[]
}

export function readAdvancedState(projectRoot: string): AdvancedState {
  const configPath = `${projectRoot}/panda.config.ts`
  const src = existsSync(configPath) ? readFileSync(configPath, 'utf8') : ''
  return {
    ...readAdvancedFlags(src),
    include: readArrayField(src, 'include'),
    exclude: readArrayField(src, 'exclude'),
  }
}

export function writeAdvancedState(projectRoot: string, state: AdvancedState): boolean {
  const configPath = `${projectRoot}/panda.config.ts`
  if (!existsSync(configPath)) return false
  const src = readFileSync(configPath, 'utf8')
  let next = writeAdvancedFlags(src, {
    preflight: state.preflight,
    strictTokens: state.strictTokens,
    strictPropertyValues: state.strictPropertyValues,
    hash: state.hash,
    clean: state.clean,
  })
  next = writeArrayField(next, 'include', state.include)
  next = writeArrayField(next, 'exclude', state.exclude)
  if (next === src) return false
  writeFileSync(configPath, next, 'utf8')
  return true
}
