import m from 'mithril'
import { status } from '../../../styled-system/recipes'
import { cx } from '../../../styled-system/css'

/**
 * Status component. State indicator dot with color
 * and size variants.
 *
 * @type {import('mithril').Component<import('./index').StatusAttrs>}
 */
export const Status = {
  view(vnode) {
    const { color, size, className, ...rest } = vnode.attrs

    return m('span', {
      className: cx( status({ color, size }), className),
      ...rest
    })
  }
}
