import { defineRecipe } from '@pandacss/dev'

export const progressRecipe = defineRecipe({
  className:'progress',
  base: {
    position: 'relative',
    display: 'block',
    width: '100%',
    height: 'token(spacing.2)',
    borderRadius: 'var(--radius-box)',
    overflow: 'hidden',
    appearance: 'none',
    color: 'base-content',
    backgroundColor: 'color-mix(in oklab, currentColor 20%, transparent)',
    accentColor: 'currentColor',
  },
  variants: {
    color: {
      neutral: { color: 'neutral' },
      primary: { color: 'primary' },
      secondary: { color: 'secondary' },
      accent: { color: 'accent' },
      info: { color: 'info' },
      success: { color: 'success' },
      warning: { color: 'warning' },
      error: { color: 'error' },
    },
  },
})
