import { cva } from '../../styled-system/css'

export const blockStyles = cva({
  base: {
    '&:not(:last-child)': {
      marginBottom: 'token(spacing.6)',
    },
  },
  variants: {
    spacing: {
      sm: { '&:not(:last-child)': { marginBottom: 'token(spacing.4)' } },
      md: { '&:not(:last-child)': { marginBottom: 'token(spacing.6)' } },
      lg: { '&:not(:last-child)': { marginBottom: 'token(spacing.8)' } },
    },
  },
  defaultVariants: {
    spacing: 'md',
  },
})
