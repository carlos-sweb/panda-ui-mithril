import { defineTokens } from '@pandacss/dev'

/**
 * Escala de espaciado extra de panda-ui-mithril.
 *
 * Solo las claves más allá de la escala nativa de Panda (0.5–96); la escala
 * nativa la provee Panda mismo y no se sobrescribe (extender reemplazaría
 * toda la categoría).
 */

export const spacingTokens = defineTokens({
  spacing: {
    '128': { value: '32rem' },
    '160': { value: '40rem' },
    '192': { value: '48rem' },
    '320': { value: '80rem' },
  },
})
