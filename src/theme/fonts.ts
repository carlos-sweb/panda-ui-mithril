import { defineTokens } from '@pandacss/dev'

/**
 * Tipografías de panda-ui-mithril. Valores crudos (sin variante de tema).
 */

export const fontsTokens = defineTokens({
  fonts: {
    sans: { value: '"Ubuntu", system-ui, sans-serif' },
    mono: { value: '"Ubuntu Mono", monospace' },
  },
})
