import { cva } from '../../styled-system/css'

export const progressStyles = cva({
  base: {
    position: 'relative',
    display: 'block',
    width: '100%',
    height: 'token(spacing.2)',
    borderRadius: 'var(--radius-box)',
    overflow: 'hidden',
    appearance: 'none',
    color: 'token(colors.base-content)',
    backgroundColor: 'color-mix(in oklab, currentColor 20%, transparent)',
    accentColor: 'currentColor',
  },
  variants: {
    color: {
      neutral: { color: 'token(colors.neutral)' },
      primary: { color: 'token(colors.primary)' },
      secondary: { color: 'token(colors.secondary)' },
      accent: { color: 'token(colors.accent)' },
      info: { color: 'token(colors.info)' },
      success: { color: 'token(colors.success)' },
      warning: { color: 'token(colors.warning)' },
      error: { color: 'token(colors.error)' },
    },
  },
})
