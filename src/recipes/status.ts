import { cva } from '../../styled-system/css'

export const statusStyles = cva({
  base: {
    display: 'inline-block',
    rounded: 'full',
  },
  variants: {
    color: {
      neutral: { bg: 'neutral' },
      primary: { bg: 'primary' },
      secondary: { bg: 'secondary' },
      accent: { bg: 'accent' },
      info: { bg: 'info' },
      success: { bg: 'success' },
      warning: { bg: 'warning' },
      error: { bg: 'error' },
    },
    size: {
      xs: { w: '2', h: '2' },
      sm: { w: '2.5', h: '2.5' },
      md: { w: '3', h: '3' },
      lg: { w: '3.5', h: '3.5' },
      xl: { w: '4', h: '4' },
    },
  },
})
