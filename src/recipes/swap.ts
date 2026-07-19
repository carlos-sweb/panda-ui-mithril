import { cva } from '../../styled-system/css'

export const swapStyles = cva({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    position: 'relative',
    w: '5',
    h: '5',
  },
  variants: {
    style: {
      rotate: {},
      flip: {},
    },
  },
})
