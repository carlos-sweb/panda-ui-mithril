import { cva } from '../../styled-system/css'

export const tableStyles = cva({
  base: {
    display: 'table',
    w: 'full',
    fontSize: 'sm',
  },
  variants: {
    size: {
      xs: { text: 'xs' },
      sm: { text: 'sm' },
      md: { text: 'sm' },
      lg: { text: 'md' },
      xl: { text: 'lg' },
    },
    zebra: {
      true: { '& tbody tr:nth-child(even)': { bg: 'base-200' } },
    },
    pinRows: {
      true: { '& thead tr': { bg: 'base-200', position: 'sticky', top: '0', zIndex: '1' } },
    },
    pinCols: {
      true: {
        '& th': { position: 'sticky', bg: 'base-200' },
        '& th:first-child': { left: '0', zIndex: '2' },
      },
    },
  },
})
