import { defineTokens, defineSemanticTokens } from '@pandacss/dev'
import { colorsTokens, colorsSemanticTokens } from './theme/colors'
import { fontsTokens } from './theme/fonts'
import { spacingTokens } from './theme/spacing'
import { radiiTokens } from './theme/radii'
import { themeKeyframes } from './theme/keyframes'

/**
 * pumTheme — identidad visual de panda-ui-mithril.
 *
 * La capa de VALORES del diseño: tokens crudos (escalas, radios, fuentes) y
 * semanticTokens (colores con significado, light/dark). Es la fuente única de
 * la que beben las recipes (que consumen `token(colors.primary)` por nombre)
 * y el consumidor la hereda vía el preset o la importa directamente
 * (`panda-ui-mithril/theme`) para extender/copiar su propia identidad.
 *
 * Los valores viven en `src/theme/*.ts` (colors/fonts/spacing/radii/keyframes),
 * organizados por categoría. El consumidor los personaliza editando esos
 * archivos (p. ej. `pum/theme/colors.ts` → `primary` con su color) o vía
 * `theme.extend.semanticTokens`.
 *
 * Nota: los colores de marca se definen con valor raw directo (base/dark),
 * sin custom properties `--pum-*`.
 */

export const pumTheme = {
  tokens: defineTokens({
    colors: colorsTokens.colors,
    radii: radiiTokens.radii,
    fonts: fontsTokens.fonts,
    spacing: spacingTokens.spacing,
  }),
  semanticTokens: colorsSemanticTokens,
  keyframes: themeKeyframes,
}
