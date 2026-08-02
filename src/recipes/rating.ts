import { cva } from '../../styled-system/css'

export const ratingStyles = cva({
  base: {
    position: 'relative',
    display: 'inline-flex',
    alignItems: 'center',
    '--size': '1.5rem',

    '& > input': {
      cursor: 'pointer',
      appearance: 'none',
      border: 'none',
      padding: '0',
      borderRadius: '0',
      width: 'var(--size)',
      height: 'var(--size)',
      backgroundColor: 'var(--rating-color, var(--colors-base-content))',
      opacity: '0.2',
    },
    '& > input:checked, & > input:has(~ input:checked), & > input[aria-checked="true"]': {
      opacity: '1',
    },
  },
  variants: {
    size: {
      xs: { '--size': '1rem' },
      sm: { '--size': '1.25rem' },
      md: { '--size': '1.5rem' },
      lg: { '--size': '1.75rem' },
      xl: { '--size': '2rem' },
    },
    color: {
      neutral: { '--rating-color': 'var(--colors-neutral)' },
      primary: { '--rating-color': 'var(--colors-primary)' },
      secondary: { '--rating-color': 'var(--colors-secondary)' },
      accent: { '--rating-color': 'var(--colors-accent)' },
      info: { '--rating-color': 'var(--colors-info)' },
      success: { '--rating-color': 'var(--colors-success)' },
      warning: { '--rating-color': 'var(--colors-warning)' },
      error: { '--rating-color': 'var(--colors-error)' },
    },
  },
})
