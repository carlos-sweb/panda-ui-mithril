import { defineRecipe } from '@pandacss/dev'

export const fieldsetRecipe = defineRecipe({
  className:'fieldset',
  base: {
    display: 'grid',
    gap: 'token(spacing.1.5)',
    paddingBlock: 'token(spacing.1)',
    fontSize: 'token(fontSizes.sm)',
    gridTemplateColumns: '1fr',
    gridAutoRows: 'max-content',
  },
})

export const fieldsetLegendRecipe = defineRecipe({
  className:'fieldset-legend',
  base: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 'token(spacing.2)',
    paddingBlock: 'token(spacing.2)',
    marginBlockEnd: '-0.25rem',
    marginInlineEnd: 'auto',
    fontWeight: 'token(fontWeights.semibold)',
    color: 'base-content',
  },
})
