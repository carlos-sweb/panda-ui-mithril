import m from 'mithril'
import { indicator, indicatorItem } from '../../../styled-system/recipes'
import { cx } from '../../../styled-system/css'

const HORIZONTAL = ['start', 'center', 'end']
const VERTICAL = ['top', 'middle', 'bottom']

/**
 * Indicator component. Overlays a notification badge on its content.
 * `position` is a pair of space-separated tokens (e.g. "end top"),
 * and `item` is the badge content.
 *
 * @type {import('mithril').Component<import('./index').IndicatorAttrs>}
 */
export const Indicator = {
  view(vnode) {
    const { position, className, item, ...rest } = vnode.attrs
    const words = (position || '').split(' ').filter(Boolean)
    const horizontal = words.find((w) => HORIZONTAL.includes(w))
    const vertical = words.find((w) => VERTICAL.includes(w))

    return m('div', {
      className: cx(        
        indicator({ horizontal, vertical }),
        words.map((w) => `indicator-${w}`),
        className
      ),
      ...rest
    }, [
      item && m('span', { className: cx('indicator-item', indicatorItem(), item.attrs?.className) }, item),
      vnode.children,
    ])
  }
}
