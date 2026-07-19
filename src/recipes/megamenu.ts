import { cva } from '../../styled-system/css'

export const megamenuStyles = cva({
  base: {
    display: 'flex',
    flexDirection: 'column',
    p: '4',
    bg: 'base-100',
    rounded: 'box',
    shadow: 'lg',
  },
  variants: {
    size: {
      xs: { p: '2', text: 'xs' },
      sm: { p: '3', text: 'sm' },
      md: { p: '4', text: 'sm' },
      lg: { p: '6', text: 'md' },
      xl: { p: '8', text: 'lg' },
    },
    wide: { true: { w: 'full' } },
    full: { true: { w: 'full', maxW: '64rem' } },
    vertical: { true: { flexDirection: 'column' } },
  },
})
