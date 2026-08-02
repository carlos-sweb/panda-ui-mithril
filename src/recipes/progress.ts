import { cva } from '../../styled-system/css'

export const progressStyles = cva({
  base: {
    position: 'relative',
    display: 'block',
    width: '100%',
    height: '0.5rem',
    borderRadius: 'var(--radius-box)',
    overflow: 'hidden',
    appearance: 'none',
    color: 'var(--colors-base-content)',
    backgroundColor: 'color-mix(in oklab, currentColor 20%, transparent)',
    accentColor: 'currentColor',
  },
  variants: {
    color: {
      neutral: { color: 'var(--colors-neutral)' },
      primary: { color: 'var(--colors-primary)' },
      secondary: { color: 'var(--colors-secondary)' },
      accent: { color: 'var(--colors-accent)' },
      info: { color: 'var(--colors-info)' },
      success: { color: 'var(--colors-success)' },
      warning: { color: 'var(--colors-warning)' },
      error: { color: 'var(--colors-error)' },
    },
  },
})
