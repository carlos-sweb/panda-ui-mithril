import { cva } from '../../styled-system/css'

export const linkStyles = cva({
  base: {
    cursor: 'pointer',
    textDecoration: 'none',
    _hover: { textDecoration: 'underline' },
  },
  variants: {
    color: {
      neutral: { color: 'neutral' },
      primary: { color: 'primary' },
      secondary: { color: 'secondary' },
      accent: { color: 'accent' },
      info: { color: 'info' },
      success: { color: 'success' },
      warning: { color: 'warning' },
      error: { color: 'error' },
    },
    hover: {
      true: { _hover: { textDecoration: 'underline' } },
      false: { _hover: {} },
    },
  },
})
