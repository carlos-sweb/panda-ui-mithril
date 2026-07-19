import { cva } from '../../styled-system/css'

export const menuStyles = cva({
  base: {
    display: 'flex',
    flexDirection: 'column',
    rounded: 'box',
    bg: 'base-100',
    p: '2',
    fontSize: 'sm',
  },
  variants: {
    size: {
      xs: { text: 'xs', p: '1' },
      sm: { text: 'sm', p: '1.5' },
      md: { text: 'sm', p: '2' },
      lg: { text: 'md', p: '2.5' },
      xl: { text: 'lg', p: '3' },
    },
    horizontal: {
      true: { flexDirection: 'row' },
    },
  },
})
