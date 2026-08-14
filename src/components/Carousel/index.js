import m from 'mithril'
import { carousel, carouselItem } from '../../../styled-system/recipes'
import { cx } from '../../utils/cx'


/**
 * Carousel — a scrollable, snap-based slide container.
 *
 * Navigation is handled entirely by native CSS scroll-snap (see the `carousel`
 * recipe, `cva()` single-slot: `scroll-snap-type: x/y mandatory` with
 * `scroll-behavior: smooth`), so there is no JS slide logic to maintain.
 * Consumers navigate by scrolling, by dragging, or by scrolling an external
 * control into view (`scrollIntoView({ behavior: 'smooth' })`); modern CSS
 * features like `@starting-style` don't apply here since the carousel has no
 * enter/leave transitions.
 *
 * @param {object} vnode - Mithril vnode
 * @param {'horizontal'|'vertical'} [vnode.attrs.direction='horizontal'] - Scroll axis:
 *   `horizontal` (row, `overflow-x`) or `vertical` (column, `overflow-y`).
 * @param {'start'|'center'|'end'} [vnode.attrs.align='start'] - Scroll-snap alignment
 *   of each slide. Overridden by the boolean shortcuts below.
 * @param {boolean} [vnode.attrs.start] - Shorthand for `align: 'start'` (default).
 * @param {boolean} [vnode.attrs.center] - Shorthand for `align: 'center'`.
 * @param {boolean} [vnode.attrs.end] - Shorthand for `align: 'end'`.
 * @param {string} [vnode.attrs.className] - Extra CSS class(es) appended to the
 *   base `carousel` class and recipe output.
 * @param {object} [vnode.attrs] - Any other attributes are spread onto the `div`.
 * @param {import('mithril').Children} [vnode.children] - Slides, typically `CarouselItem`s.
 * @returns {import('mithril').Vnode} A `div.carousel` element.
 */
export const Carousel = {
  view(vnode) {
    const { direction, align, start, center, end, className, ...rest } = vnode.attrs
    const resolvedAlign = start ? 'start' : center ? 'center' : end ? 'end' : align

    return m('div', {
      className: cx(
        'carousel',
        resolvedAlign && `carousel-${resolvedAlign}`,
        carousel({ direction, align: resolvedAlign }),
        className
      ),
      ...rest
    }, vnode.children)
  }
}

/**
 * CarouselItem — a single slide inside a `Carousel`.
 *
 * Renders a `div.carousel-item` (recipe: `cva()`, `flex: none` with
 * `scroll-snap-align` inherited from the parent carousel). Purely presentational.
 *
 * @param {object} vnode - Mithril vnode
 * @param {string} [vnode.attrs.className] - Extra CSS class(es) appended to the
 *   base `carousel-item` class and recipe output.
 * @param {object} [vnode.attrs] - Any other attributes are spread onto the `div`.
 * @param {import('mithril').Children} [vnode.children] - Slide content.
 * @returns {import('mithril').Vnode} A `div.carousel-item` element.
 */
export const CarouselItem = {
  view(vnode) {
    const { className, ...rest } = vnode.attrs

    return m('div', {
      className: cx('carousel-item', carouselItem(), className),
      ...rest
    }, vnode.children)
  }
}
