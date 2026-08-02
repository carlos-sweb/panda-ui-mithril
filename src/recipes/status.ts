import { cva } from '../../styled-system/css'

export const statusStyles = cva({
  base: {
    display: 'inline-block',
    verticalAlign: 'middle',
    aspectRatio: '1 / 1',
    width: '0.5rem',
    height: '0.5rem',
    borderRadius: 'var(--radius-selector)',
    backgroundColor: 'color-mix(in oklab, var(--colors-base-content) 20%, transparent)',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundImage: 'radial-gradient(circle at 35% 30%, oklch(1 0 0 / calc(var(--depth, 1) * 0.5)), transparent)',
    boxShadow: '0 2px 3px -1px color-mix(in oklab, currentColor calc(var(--depth, 1) * 100%), transparent)',
  },
  variants: {
    color: {
      neutral: { backgroundColor: 'var(--colors-neutral)', color: 'var(--colors-neutral)' },
      primary: { backgroundColor: 'var(--colors-primary)', color: 'var(--colors-primary)' },
      secondary: { backgroundColor: 'var(--colors-secondary)', color: 'var(--colors-secondary)' },
      accent: { backgroundColor: 'var(--colors-accent)', color: 'var(--colors-accent)' },
      info: { backgroundColor: 'var(--colors-info)', color: 'var(--colors-info)' },
      success: { backgroundColor: 'var(--colors-success)', color: 'var(--colors-success)' },
      warning: { backgroundColor: 'var(--colors-warning)', color: 'var(--colors-warning)' },
      error: { backgroundColor: 'var(--colors-error)', color: 'var(--colors-error)' },
    },
    size: {
      xs: { width: '0.125rem', height: '0.125rem' },
      sm: { width: '0.25rem', height: '0.25rem' },
      md: { width: '0.5rem', height: '0.5rem' },
      lg: { width: '0.75rem', height: '0.75rem' },
      xl: { width: '1rem', height: '1rem' },
    },
  },
})
