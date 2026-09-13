import { defineTokens } from '@pandacss/dev'
import { colorsTokens, colorsSemanticTokens } from './theme/colors'
import { fontsTokens } from './theme/fonts'
import { spacingTokens } from './theme/spacing'
import { radiiTokens } from './theme/radii'
import { themeKeyframes } from './theme/keyframes'

/**
 * pumTheme — visual identity of panda-ui-mithril.
 *
 * The design's VALUE layer: raw tokens (scales, radii, fonts) and
 * semanticTokens (colors with meaning, light/dark). It is the single source
 * from which the recipes drink (they consume `token(colors.primary)` by name)
 * and the consumer inherits it via the preset or imports it directly
 * (`panda-ui-mithril/theme`) to extend/copy its own identity.
 *
 * The values live in `src/theme/*.ts` (colors/fonts/spacing/radii/keyframes),
 * organized by category. The consumer customizes them by editing those
 * files (e.g. `pum/theme/colors.ts` → `primary` with its color) or via
 * `theme.extend.semanticTokens`.
 *
 * Note: brand colors are defined with a direct raw value (base/dark),
 * without `--pum-*` custom properties.
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
