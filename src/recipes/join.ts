import { cva } from '../../styled-system/css'

export const joinStyles = cva({
  base: {
    display: 'inline-flex',
    overflow: 'hidden',
    rounded: 'field',
  },
  variants: {
    vertical: {
      true: { flexDirection: 'column' },
    },
  },
})
