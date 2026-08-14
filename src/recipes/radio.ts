import { defineRecipe } from '@pandacss/dev'

export const radioRecipe = defineRecipe({
  className:'radio',
  base: {
    position: 'relative',
    display: 'inline-block',
    flexShrink: '0',
    verticalAlign: 'middle',
    cursor: 'pointer',
    appearance: 'none',
    borderRadius: '9999px',
    '--input-color': 'color-mix(in oklab, currentColor 20%, transparent)',
    border: 'var(--border, 1px) solid var(--input-color)',
    boxShadow: '0 1px oklch(0% 0 0 / 0.1) inset',
    color: 'var(--input-color)',
    '--radio-size': 'token(spacing.6)',
    width: 'var(--radio-size)',
    height: 'var(--radio-size)',
    padding: 'token(spacing.1)',
    _before: { content: '""', display: 'block', width: '100%', height: '100%', borderRadius: '9999px' },
    '&:focus-visible': { outline: '2px solid currentColor' },
    '&:checked, &[aria-checked="true"]': {
      backgroundColor: 'base-100',
      borderColor: 'currentColor',
      animation: 'radio 0.2s ease-out',
      _before: { backgroundColor: 'currentColor' },
    },
    _disabled: { opacity: '0.2', cursor: 'not-allowed' },
  },
  variants: {
    color: {
      neutral: { '--input-color': 'token(colors.neutral)' },
      primary: { '--input-color': 'token(colors.primary)' },
      secondary: { '--input-color': 'token(colors.secondary)' },
      accent: { '--input-color': 'token(colors.accent)' },
      info: { '--input-color': 'token(colors.info)' },
      success: { '--input-color': 'token(colors.success)' },
      warning: { '--input-color': 'token(colors.warning)' },
      error: { '--input-color': 'token(colors.error)' },
    },
    size: {
      xs: { '--radio-size': 'token(spacing.4)', padding: 'token(spacing.0.5)' },
      sm: { '--radio-size': 'token(spacing.5)', padding: '0.1875rem' },
      md: { '--radio-size': 'token(spacing.6)', padding: 'token(spacing.1)' },
      lg: { '--radio-size': 'token(spacing.7)', padding: '0.3125rem' },
      xl: { '--radio-size': 'token(spacing.8)', padding: 'token(spacing.1.5)' },
    },
  },
  defaultVariants: {
    size: 'md',
  },
})
