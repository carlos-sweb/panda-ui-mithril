import m from 'mithril'
import { carouselStyles, carouselItemStyles } from '../../recipes/carousel'
import { cx } from '../../utils/cx'


export const Carousel = {
  view(vnode) {
    const { direction, align, start, center, end, className, ...rest } = vnode.attrs
    const resolvedAlign = start ? 'start' : center ? 'center' : end ? 'end' : align

    return m('div', {
      className: cx(
        'carousel',
        resolvedAlign && `carousel-${resolvedAlign}`,
        carouselStyles({ direction, align: resolvedAlign }),
        className
      ),
      ...rest
    }, vnode.children)
  }
}

export const CarouselItem = {
  view(vnode) {
    const { className, ...rest } = vnode.attrs

    return m('div', {
      className: cx('carousel-item', carouselItemStyles(), className),
      ...rest
    }, vnode.children)
  }
}
