import m from 'mithril'
import { dividerPUM } from '../../../styled-system/recipes'
import { cx } from '../../../styled-system/css'

/**
 * Divider component. Horizontal or vertical separator (role="separator"),
 * with a color variant and `placement` for the label (start/end).
 *
 * @type {import('mithril').Component<import('./index').DividerAttrs>}
 */
export const Divider = {
  view(vnode) {
    const { color, direction, placement, className, ...rest } = vnode.attrs

    return m('div', {
      role: 'separator',
      className: cx('divider', dividerPUM({ color, direction, placement }), className),
      ...rest
    }, vnode.children)
  }
}
