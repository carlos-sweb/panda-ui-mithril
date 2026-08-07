import { cva } from '../../styled-system/css'

export const blockStyles = cva({
  base: {
    '&:not(:last-child)': {
      marginBottom: 'token(spacing.4)',
      '@media (min-width: 768px)': { marginBottom: 'token(spacing.5)' },
      '@media (min-width: 1024px)': { marginBottom: 'token(spacing.6)' },
    },
  },
  variants: {
    spacing: {
      sm: {
        '&:not(:last-child)': {
          marginBottom: 'token(spacing.2)',
          '@media (min-width: 768px)': { marginBottom: 'token(spacing.3)' },
          '@media (min-width: 1024px)': { marginBottom: 'token(spacing.4)' },
        },
      },
      md: {}, // uses base
      lg: {
        '&:not(:last-child)': {
          marginBottom: 'token(spacing.4)',
          '@media (min-width: 768px)': { marginBottom: 'token(spacing.6)' },
          '@media (min-width: 1024px)': { marginBottom: 'token(spacing.8)' },
        },
      },
    },
  },
  defaultVariants: {
    spacing: 'md',
  },
})
