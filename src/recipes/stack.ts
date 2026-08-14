import { defineRecipe } from '@pandacss/dev'

export const stackRecipe = defineRecipe({
  className:'stack',
  base: {
    display: 'flex',
    flexDirection: 'column',
    gap: 'token(spacing.2)',
    '@media (min-width: 768px)': { gap: 'token(spacing.3)' },
    '@media (min-width: 1024px)': { gap: 'token(spacing.4)' },
  },
  variants: {
    direction: {
      column: { flexDirection: 'column' },
      row: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center' },
    },
    gap: {
      xs: {
        gap: 'token(spacing.1)',
        '@media (min-width: 768px)': { gap: 'token(spacing.1.5)' },
        '@media (min-width: 1024px)': { gap: 'token(spacing.2)' },
      },
      sm: {
        gap: 'token(spacing.1.5)',
        '@media (min-width: 768px)': { gap: 'token(spacing.2)' },
        '@media (min-width: 1024px)': { gap: 'token(spacing.3)' },
      },
      md: {},
      lg: {
        gap: 'token(spacing.3)',
        '@media (min-width: 768px)': { gap: 'token(spacing.5)' },
        '@media (min-width: 1024px)': { gap: 'token(spacing.6)' },
      },
      xl: {
        gap: 'token(spacing.4)',
        '@media (min-width: 768px)': { gap: 'token(spacing.6)' },
        '@media (min-width: 1024px)': { gap: 'token(spacing.8)' },
      },
    },
    align: {
      start: { alignItems: 'flex-start' },
      center: { alignItems: 'center' },
      end: { alignItems: 'flex-end' },
      stretch: { alignItems: 'stretch' },
    },
    justify: {
      start: { justifyContent: 'flex-start' },
      center: { justifyContent: 'center' },
      end: { justifyContent: 'flex-end' },
      between: { justifyContent: 'space-between' },
      around: { justifyContent: 'space-around' },
    },
  },
  defaultVariants: {
    direction: 'column',
    gap: 'md',
    align: 'stretch',
  },
})
