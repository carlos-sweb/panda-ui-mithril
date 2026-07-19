import { cva } from '../../styled-system/css'

export const progressStyles = cva({
  base: {
    display: 'block',
    width: '100%',
    h: '2',
    rounded: 'full',
    bg: 'base-content/20',
    overflow: 'hidden',
    appearance: 'none',
  },
  variants: {
    color: {
      primary: { accentColor: 'primary' },
      secondary: { accentColor: 'secondary' },
      accent: { accentColor: 'accent' },
      info: { accentColor: 'info' },
      success: { accentColor: 'success' },
      warning: { accentColor: 'warning' },
      error: { accentColor: 'error' },
    },
  },
})
