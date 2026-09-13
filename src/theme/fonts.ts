import { defineTokens } from '@pandacss/dev'

/**
 * Typefaces of panda-ui-mithril. Raw values (no theme variant).
 *
 * Typographic roles: `sans` (body/base), `display` (headings) and `mono`
 * (code/values). `display` starts out sharing the `sans` stack so as
 * not to change the default appearance; assigning another family to the display role
 * (e.g. Playfair Display from the editor) makes the title components
 * use that family.
 */

export const fontsTokens = defineTokens({
  fonts: {
    sans: { value: '"Ubuntu", system-ui, sans-serif' },
    display: { value: '"Ubuntu", system-ui, sans-serif' },
    mono: { value: '"Ubuntu Mono", monospace' },
  },
})
