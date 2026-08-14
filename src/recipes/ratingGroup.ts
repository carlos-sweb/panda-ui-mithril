import { defineRecipe } from '@pandacss/dev'

export const ratingGroupRecipe = defineRecipe({
  className:'rating-group',
  base: {
    display: 'inline-flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 'token(spacing.1)',
  },
})

export const ratingGroupLabelRecipe = defineRecipe({
  className:'rating-group-label',
  base: {
    fontSize: 'token(fontSizes.sm)',
    fontWeight: 'token(fontWeights.medium)',
    color: 'base-content',
    opacity: 0.7,
  },
})
