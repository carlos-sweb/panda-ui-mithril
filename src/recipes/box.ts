import { defineRecipe } from '@pandacss/dev'

export const boxRecipe = defineRecipe({
  className:'box',
  base: {
    backgroundColor: 'base-100',
    borderRadius: 'var(--radius-box, 0.5rem)',
    boxShadow: 'var(--shadow-md, 0 4px 6px -1px rgba(0,0,0,0.1))',
    border: '1px solid token(colors.base-300)',
    padding: 'token(spacing.3)',
    '@media (min-width: 768px)': { padding: 'token(spacing.4)' },
    '@media (min-width: 1024px)': { padding: 'token(spacing.5)' },
  },
  variants: {
    padding: {
      sm: {
        padding: 'token(spacing.2)',
        '@media (min-width: 768px)': { padding: 'token(spacing.3)' },
        '@media (min-width: 1024px)': { padding: 'token(spacing.4)' },
      },
      md: {},
      lg: {
        padding: 'token(spacing.4)',
        '@media (min-width: 768px)': { padding: 'token(spacing.6)' },
        '@media (min-width: 1024px)': { padding: 'token(spacing.8)' },
      },
    },
    shadow: {
      sm: { boxShadow: 'var(--shadow-sm, 0 1px 2px rgba(0,0,0,0.05))' },
      md: { boxShadow: 'var(--shadow-md, 0 4px 6px -1px rgba(0,0,0,0.1))' },
      lg: { boxShadow: 'var(--shadow-lg, 0 10px 15px -3px rgba(0,0,0,0.1))' },
      none: { boxShadow: 'none' },
    },
  },
  defaultVariants: {
    padding: 'md',
    shadow: 'md',
  },
})
