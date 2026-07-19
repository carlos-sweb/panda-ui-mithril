import { cva } from '../../styled-system/css'

export const collapseStyles = cva({
  base: {
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  },
  variants: {
    arrow: { true: {} },
    plus: { true: {} },
    open: { true: { _open: { maxHeight: '9999px' } } },
    close: { true: {} },
  },
})
