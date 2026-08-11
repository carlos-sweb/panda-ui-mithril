import { cva } from '../../styled-system/css'

export const statusStyles = cva({
  base: {
    display: 'inline-block',
    verticalAlign: 'middle',
    aspectRatio: '1 / 1',
    width: 'token(spacing.2)',
    height: 'token(spacing.2)',
    borderRadius: 'var(--radius-selector)',
    backgroundColor: 'color-mix(in oklab, token(colors.base-content) 20%, transparent)',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundImage: 'radial-gradient(circle at 35% 30%, oklch(1 0 0 / calc(var(--depth, 1) * 0.5)), transparent)',
    boxShadow: '0 2px 3px -1px color-mix(in oklab, currentColor calc(var(--depth, 1) * 100%), transparent)',
  },
  variants: {
    color: {
      neutral: { backgroundColor: 'neutral', color: 'neutral' },
      primary: { backgroundColor: 'primary', color: 'primary' },
      secondary: { backgroundColor: 'secondary', color: 'secondary' },
      accent: { backgroundColor: 'accent', color: 'accent' },
      info: { backgroundColor: 'info', color: 'info' },
      success: { backgroundColor: 'success', color: 'success' },
      warning: { backgroundColor: 'warning', color: 'warning' },
      error: { backgroundColor: 'error', color: 'error' },
    },
    size: {
      xs: { width: 'token(spacing.0.5)', height: 'token(spacing.0.5)' },
      sm: { width: 'token(spacing.1)', height: 'token(spacing.1)' },
      md: { width: 'token(spacing.2)', height: 'token(spacing.2)' },
      lg: { width: 'token(spacing.3)', height: 'token(spacing.3)' },
      xl: { width: 'token(spacing.4)', height: 'token(spacing.4)' },
    },
  },
  defaultVariants: {
    size: 'md',
  },
})
