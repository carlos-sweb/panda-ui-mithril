import m from 'mithril'
import { range } from '../../../styled-system/recipes'
import { cx } from '../../../styled-system/css'

/**
 * Range component. Slider (`<input type="range">`) with color,
 * size and vertical orientation variants.
 *
 * @type {import('mithril').Component<import('./index').RangeAttrs>}
 */
export const Range = {
  view(vnode) {
    const { color, size, vertical, className, ...rest } = vnode.attrs

    return m('input', {
      type: 'range',
      className: cx('range', range({ color, size, vertical }), className),
      ...rest
    })
  }
}
