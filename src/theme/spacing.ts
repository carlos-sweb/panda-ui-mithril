import { defineTokens } from '@pandacss/dev'

/**
 * Extra spacing scale of panda-ui-mithril.
 *
 * Only the keys beyond Panda's native scale (0.5–96); the native
 * scale is provided by Panda itself and is not overwritten (extending would replace
 * the whole category).
 */

export const spacingTokens = defineTokens({
  spacing: {
    '128': { value: '32rem' },
    '160': { value: '40rem' },
    '192': { value: '48rem' },
    '320': { value: '80rem' },
  },
})
