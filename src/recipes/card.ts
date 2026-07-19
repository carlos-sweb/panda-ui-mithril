import { cva } from '../../styled-system/css'

export const cardStyles = cva({
  base: {
    display: 'flex',
    flexDirection: 'column',
    rounded: 'box',
    overflow: 'hidden',
    bg: 'base-100',
  },
  variants: {
    size: {
      xs: { p: '2' },
      sm: { p: '4' },
      md: { p: '6' },
      lg: { p: '8' },
      xl: { p: '10' },
    },
    border: {
      true: { borderWidth: '1px', borderColor: 'base-300' },
    },
    dash: {
      true: { borderWidth: '1px', borderColor: 'base-300', borderStyle: 'dashed' },
    },
    side: {
      true: { flexDirection: 'row' },
    },
    imageFull: {
      true: { '& img': { objectFit: 'cover', w: 'full', h: 'full' } },
    },
  },
})
