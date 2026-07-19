import { cva } from '../../styled-system/css'

export const toggleStyles = cva({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    cursor: 'pointer',
    rounded: 'full',
    h: '1.25rem',
    w: '2.5rem',
    bg: 'base-content/20',
    transition: 'all 0.2s',
    position: 'relative',
    _before: {
      content: '""',
      display: 'block',
      w: '0.875rem',
      h: '0.875rem',
      rounded: 'full',
      bg: 'base-100',
      transition: 'all 0.2s',
      translate: '0.125rem',
      boxShadow: 'sm',
    },
    _checked: { bg: 'currentColor' },
    // @ts-ignore - compound selector _checked + _before
    _checked_before: { translate: '1.125rem' },
    _disabled: { opacity: '0.5', cursor: 'not-allowed' },
  },
  variants: {
    color: {
      primary: { _checked: { bg: 'primary' } },
      secondary: { _checked: { bg: 'secondary' } },
      accent: { _checked: { bg: 'accent' } },
      info: { _checked: { bg: 'info' } },
      success: { _checked: { bg: 'success' } },
      warning: { _checked: { bg: 'warning' } },
      error: { _checked: { bg: 'error' } },
    },
    size: {
      xs: { h: '0.875rem', w: '2rem', _before: { w: '0.625rem', h: '0.625rem' } },
      sm: { h: '1rem', w: '2.25rem', _before: { w: '0.75rem', h: '0.75rem' } },
      md: { h: '1.25rem', w: '2.5rem', _before: { w: '0.875rem', h: '0.875rem' } },
      lg: { h: '1.5rem', w: '3rem', _before: { w: '1.125rem', h: '1.125rem' } },
      xl: { h: '1.75rem', w: '3.5rem', _before: { w: '1.375rem', h: '1.375rem' } },
    },
  },
})
