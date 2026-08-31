/**
 * theme-io — helpers puros de lectura/escritura de los archivos del theme
 * (`pum/theme/*.ts` en un consumidor, `src/theme/*.ts` en este repo).
 *
 * Compartidos entre el servidor del editor (`config-ui/server.ts`) y el CLI
 * (`scripts/cli.ts`, migración del layout legacy `pum/theme.ts` de archivo
 * único → carpeta `pum/theme/`).
 *
 * Todos los helpers trabajan sobre STRINGS (no tocan el filesystem) para que
 * la migración del CLI pueda operar sobre el contenido legacy antes de que
 * `copyPum` lo sobrescriba.
 */

// ── Lectura ────────────────────────────────────────────────────────────────

/** Extrae bloques `{...}` balanceados. El marker debe ser una llamada
 * (`defineTokens({...}`) o asignación (`const keyframes = {...}`) — se ignora
 * la mera aparición dentro de un `import` o comentario. */
export function extractBalanced(src: string, marker: string): string | null {
  let found = -1
  let idx = 0
  while ((idx = src.indexOf(marker, idx)) !== -1) {
    // El char siguiente debe abrir una llamada o asignación: `(` o `=`.
    if (/^\s*(\(|=)/.test(src.slice(idx + marker.length))) {
      found = idx
      break
    }
    idx += marker.length
  }
  if (found === -1) return null
  const openIdx = src.indexOf('{', found)
  if (openIdx === -1) return null
  let depth = 0
  for (let i = openIdx; i < src.length; i++) {
    const ch = src[i]
    if (ch === '{') depth++
    else if (ch === '}') {
      depth--
      if (depth === 0) return src.slice(openIdx, i + 1)
    }
  }
  return null
}

/** Extrae el bloque balanceado de la categoría `name` dentro de un bloque
 * (p. ej. `colors: {...}` dentro de `defineTokens({...})`). */
export function extractCategory(block: string, name: string): string | null {
  const re = new RegExp(`['"]?${name}['"]?\\s*:\\s*\\{`)
  const m = re.exec(block)
  if (!m) return null
  const openIdx = block.indexOf('{', m.index)
  let depth = 0
  for (let i = openIdx; i < block.length; i++) {
    const ch = block[i]
    if (ch === '{') depth++
    else if (ch === '}') {
      depth--
      if (depth === 0) return block.slice(openIdx, i + 1)
    }
  }
  return null
}

/** colors.ts → { name: { base, dark } } (semanticTokens con base/_dark). */
export function parseColors(src: string): Record<string, { base: string; dark: string }> {
  const out: Record<string, { base: string; dark: string }> = {}
  const re = /'?([a-zA-Z0-9-]+)'?:\s*\{\s*value:\s*\{\s*base:\s*'([^']*)',\s*_dark:\s*'([^']*)'\s*\}\s*,?\s*\}/g
  let m: RegExpExecArray | null
  while ((m = re.exec(src))) out[m[1]] = { base: m[2], dark: m[3] }
  return out
}

/** fonts/spacing/radii (y colores raw tipo white/black) → { name: 'value' }. */
export function parseFlat(src: string): Record<string, string> {
  const out: Record<string, string> = {}
  // La llave de cierre del token puede ir seguida de coma y del cierre de la
  // categoría; capturamos TODOS los tokens, no solo el último.
  const re = /'?([a-zA-Z0-9-]+)'?:\s*\{\s*value:\s*'([^']*)'\s*\}/g
  let m: RegExpExecArray | null
  while ((m = re.exec(src))) out[m[1]] = m[2]
  return out
}

// ── Escritura (regex dirigida, estructura conocida) ─────────────────────────
// No-op silencioso si el token no existe en el src (estructura desconocida):
// el valor simplemente no se reemplaza y queda el default.

/** Reemplaza base y _dark de los tokens semantic de color dados. */
export function writeColorsSrc(
  src: string,
  colors: Record<string, { base: string; dark: string }>,
): string {
  let out = src
  for (const [name, c] of Object.entries(colors)) {
    const reBase = new RegExp(
      `('?${name}'?:\\s*\\{\\s*value:\\s*\\{\\s*)base:\\s*'[^']*'(,\\s*_dark:\\s*'[^']*'\\s*\\}\\s*,?\\s*\\})`,
    )
    if (reBase.test(out)) {
      out = out.replace(reBase, `$1base: '${c.base ?? ''}'$2`)
      out = out.replace(
        new RegExp(
          `('?${name}'?:\\s*\\{\\s*value:\\s*\\{\\s*base:\\s*'[^']*',\\s*)_dark:\\s*'[^']*'`,
        ),
        `$1_dark: '${c.dark ?? ''}'`,
      )
    }
  }
  return out
}

/** Reemplaza el value de tokens planos dados (fonts/spacing/radii/raw colors). */
export function writeFlatSrc(src: string, values: Record<string, string>): string {
  let out = src
  for (const [name, value] of Object.entries(values)) {
    // Captura solo hasta la llave de cierre del token: la coma final (si la
    // hay) queda fuera del grupo y no se toca. Funciona para tokens
    // intermedios y para el último de cada categoría.
    const re = new RegExp(`('?${name}'?:\\s*\\{\\s*value:\\s*)'[^']*'(\\s*\\})`)
    if (re.test(out)) {
      out = out.replace(re, `$1'${value}'$2`)
    }
  }
  return out
}
