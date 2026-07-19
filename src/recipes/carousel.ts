import { cva } from '../../styled-system/css'

export const carouselStyles = cva({
  base: {
    display: 'flex',
    overflowX: 'auto',
    gap: '1',
    scrollSnapType: 'x mandatory',
    w: 'full',
    '&::-webkit-scrollbar': { display: 'none' },
  },
  variants: {
    direction: {
      horizontal: { flexDirection: 'row' },
      vertical: { flexDirection: 'column', overflowY: 'auto', overflowX: 'hidden', h: 'full' },
    },
  },
})
