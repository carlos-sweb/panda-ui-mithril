import m from 'mithril'
import { carouselStyles } from '../../recipes/carousel'
import { cx } from '../../utils/cx'


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
