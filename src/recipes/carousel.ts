import { cva } from '../../styled-system/css'

export const carouselStyles = cva({
  base: {
    display: 'inline-flex',
    overflowX: 'scroll',
    scrollSnapType: 'x mandatory',
    scrollbarWidth: 'none',
    scrollBehavior: 'smooth',
    '&::-webkit-scrollbar': { display: 'none' },

    '& .carousel-item': { scrollSnapAlign: 'start' },
  },
  variants: {
    direction: {
      horizontal: {
        flexDirection: 'row',
        overflowX: 'scroll',
        scrollSnapType: 'x mandatory',
      },
      vertical: {
        flexDirection: 'column',
        overflowY: 'scroll',
        overflowX: 'hidden',
        scrollSnapType: 'y mandatory',
      },
    },
    align: {
      start: { '& .carousel-item': { scrollSnapAlign: 'start' } },
      center: { '& .carousel-item': { scrollSnapAlign: 'center' } },
      end: { '& .carousel-item': { scrollSnapAlign: 'end' } },
    },
  },
  defaultVariants: {
    direction: 'horizontal',
    align: 'start',
  },
})

export const carouselItemStyles = cva({
  base: {
    position: 'relative',
    boxSizing: 'content-box',
    display: 'flex',
    flex: 'none',
  },
})
