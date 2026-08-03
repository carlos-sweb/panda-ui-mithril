import { sva } from '../../styled-system/css'

export const rating = sva({
  slots: ['root', 'star'],
  base: {
    root: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.125rem',
    },
    star: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 'var(--rating-size)',
      height: 'var(--rating-size)',
      padding: '0',
      border: '0',
      background: 'transparent',
      // fallback keeps the star colored even if the root custom property is absent
      color: 'var(--rating-color, token(colors.warning))',
      cursor: 'pointer',
      '& svg': {
        width: '100%',
        height: '100%',
      },
    },
  },
  variants: {
    size: {
      xs: { root: { '--rating-size': '1rem' } },
      sm: { root: { '--rating-size': '1.25rem' } },
      md: { root: { '--rating-size': '1.5rem' } },
      lg: { root: { '--rating-size': '1.75rem' } },
      xl: { root: { '--rating-size': '2rem' } },
    },
    color: {
      neutral: { root: { '--rating-color': 'token(colors.neutral)' } },
      primary: { root: { '--rating-color': 'token(colors.primary)' } },
      secondary: { root: { '--rating-color': 'token(colors.secondary)' } },
      accent: { root: { '--rating-color': 'token(colors.accent)' } },
      info: { root: { '--rating-color': 'token(colors.info)' } },
      success: { root: { '--rating-color': 'token(colors.success)' } },
      warning: { root: { '--rating-color': 'token(colors.warning)' } },
      error: { root: { '--rating-color': 'token(colors.error)' } },
    },
    state: {
      empty: {
        star: { '& svg': { opacity: '0.25' } },
      },
      full: {},
    },
    readonly: {
      true: { star: { cursor: 'default' } },
      false: { star: { cursor: 'pointer' } },
    },
  },
  defaultVariants: {
    size: 'md',
    color: 'warning',
    readonly: false,
  },
})
