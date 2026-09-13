import m from 'mithril'
import { badge } from '../../../styled-system/recipes'
import { cx } from '../../../styled-system/css'

/**
 * Badge component. Small label to mark status, category or count,
 * with color, style (`outline`, `dash`, `soft`, `ghost`) and size variants.
 *
 * @type {import('mithril').Component<import('./index').BadgeAttrs>}
 */
export const Badge = {
  view(vnode) {
    const { color, variant, size, className, ...rest } = vnode.attrs
    
    return m('span', {
      className: cx(
        badge({ color, variant, size }),
        className
      ),
      ...rest
    }, vnode.children)
  }
}
