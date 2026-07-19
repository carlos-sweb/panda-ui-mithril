import m from 'mithril'
import { cva } from '../../../styled-system/css'
import { cx } from '../../utils/cx'

const carouselStyles = cva({
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

export const Carousel = {
  view(vnode) {
    const { direction, className, children, ...rest } = vnode.attrs

    return m('div', {
      className: cx('carousel', carouselStyles({ direction }), className),
      ...rest
    }, children)
  }
}

export const CarouselItem = {
  view(vnode) {
    const { start, center, end, className, children, ...rest } = vnode.attrs

    return m('div', {
      className: cx(
        'carousel-item',
        start && 'carousel-item-start',
        center && 'carousel-item-center',
        end && 'carousel-item-end',
        className
      ),
      style: 'scroll-snap-align: start;',
      ...rest
    }, children)
  }
}
