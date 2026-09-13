import m from 'mithril'
import { select } from '../../../styled-system/recipes'
import { cx } from '../../../styled-system/css'

/**
 * Select component. Dropdown menu (`<select>`) with color,
 * size and ghost mode variants. The options are passed as children (`<option>`).
 *
 * @type {import('mithril').Component<import('./index').SelectAttrs>}
 */
export const Select = {
  view(vnode) {
    const { color, size, ghost, className, ...rest } = vnode.attrs

    return m('select', {
      className: cx('select', select({ color, size, ghost }), className),
      ...rest
    }, vnode.children)
  }
}
