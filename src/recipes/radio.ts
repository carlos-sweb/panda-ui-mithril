import { cva } from '../../styled-system/css'

export const radioStyles = cva({
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
    '--radio-size': '1.5rem',
    width: 'var(--radio-size)',
    height: 'var(--radio-size)',
    padding: '0.25rem',
    _before: { content: '""', display: 'block', width: '100%', height: '100%', borderRadius: '9999px' },
    '&:focus-visible': { outline: '2px solid currentColor' },
    '&:checked, &[aria-checked="true"]': {
      backgroundColor: 'var(--colors-base-100)',
      borderColor: 'currentColor',
      animation: 'radio 0.2s ease-out',
      _before: { backgroundColor: 'currentColor' },
    },
    _disabled: { opacity: '0.2', cursor: 'not-allowed' },
  },
  variants: {
    color: {
      neutral: { '--input-color': 'var(--colors-neutral)' },
      primary: { '--input-color': 'var(--colors-primary)' },
      secondary: { '--input-color': 'var(--colors-secondary)' },
      accent: { '--input-color': 'var(--colors-accent)' },
      info: { '--input-color': 'var(--colors-info)' },
      success: { '--input-color': 'var(--colors-success)' },
      warning: { '--input-color': 'var(--colors-warning)' },
      error: { '--input-color': 'var(--colors-error)' },
    },
    size: {
      xs: { '--radio-size': '1rem', padding: '0.125rem' },
      sm: { '--radio-size': '1.25rem', padding: '0.1875rem' },
      md: { '--radio-size': '1.5rem', padding: '0.25rem' },
      lg: { '--radio-size': '1.75rem', padding: '0.3125rem' },
      xl: { '--radio-size': '2rem', padding: '0.375rem' },
    },
  },
})
