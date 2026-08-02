import { cva } from '../../styled-system/css'

export const stackStyles = cva({
  base: {
    display: 'inline-grid',
    gridTemplateColumns: '3px 4px 1fr 4px 3px',
    gridTemplateRows: '3px 4px 1fr 4px 3px',

    '& > *': {
      height: '100%',
      width: '100%',
      '&:nth-child(n+2)': { width: '100%', opacity: '0.7' },
      '&:nth-child(2)': { zIndex: '2', opacity: '0.9' },
      '&:nth-child(1)': { zIndex: '3', width: '100%' },
    },
  },
  variants: {
    placement: {
      bottom: {
        '& > *': {
          gridColumn: '3 / 4',
          gridRow: '3 / 6',
          '&:nth-child(2)': { gridColumn: '2 / 5', gridRow: '2 / 5' },
          '&:nth-child(1)': { gridColumn: '1 / 6', gridRow: '1 / 4' },
        },
      },
      top: {
        '& > *': {
          gridColumn: '3 / 4',
          gridRow: '1 / 4',
          '&:nth-child(2)': { gridColumn: '2 / 5', gridRow: '2 / 5' },
          '&:nth-child(1)': { gridColumn: '1 / 6', gridRow: '3 / 6' },
        },
      },
      start: {
        '& > *': {
          gridColumn: '1 / 4',
          gridRow: '3 / 4',
          '&:nth-child(2)': { gridColumn: '2 / 5', gridRow: '2 / 5' },
          '&:nth-child(1)': { gridColumn: '3 / 6', gridRow: '1 / 6' },
        },
      },
      end: {
        '& > *': {
          gridColumn: '3 / 6',
          gridRow: '3 / 4',
          '&:nth-child(2)': { gridColumn: '2 / 5', gridRow: '2 / 5' },
          '&:nth-child(1)': { gridColumn: '1 / 4', gridRow: '1 / 6' },
        },
      },
    },
  },
  defaultVariants: {
    placement: 'bottom',
  },
})
