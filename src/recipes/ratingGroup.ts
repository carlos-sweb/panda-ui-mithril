import { cva } from '../../styled-system/css'

export const ratingGroupStyles = cva({
  base: {
    display: 'inline-flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 'token(spacing.1)',
  },
})

export const ratingGroupLabel = cva({
  base: {
    fontSize: 'token(fontSizes.sm)',
    fontWeight: 'token(fontWeights.medium)',
    color: 'token(colors.base-content)',
    opacity: 0.7,
  },
})
