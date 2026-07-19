import { cva } from '../../styled-system/css'

export const otpStyles = cva({
  base: {
    display: 'inline-flex',
    gap: '0.25',
    position: 'relative',
  },
  variants: {
    size: {
      xs: { h: '8', text: 'xs' },
      sm: { h: '10', text: 'sm' },
      md: { h: '12', text: 'md' },
      lg: { h: '14', text: 'lg' },
      xl: { h: '16', text: 'xl' },
    },
    color: {
      primary: {},
      secondary: {},
      accent: {},
      info: {},
      success: {},
      warning: {},
      error: {},
    },
    joined: {
      true: { gap: '0' },
    },
  },
})
