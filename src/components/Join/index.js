import m from 'mithril'
import { join, joinItem } from '../../../styled-system/recipes'
import { cx } from '../../../styled-system/css'

/**
 * Join component. Groups adjacent elements with unified corners;
 * `vertical` stacks them in a column.
 *
 * @type {import('mithril').Component<import('./index').JoinAttrs>}
 */
export const Join = {
  view(vnode) {
    const { vertical, className, ...rest } = vnode.attrs

    return m('div', {
      className: cx('join', join({ vertical }), className),
      ...rest
    }, vnode.children)
  }
}

/**
 * Element inside a Join, with unified border styles.
 *
 * @type {import('mithril').Component<import('./index').JoinItemAttrs>}
 */
export const JoinItem = {
  view(vnode) {
    const { className, ...rest } = vnode.attrs

    return m('button', {
      className: cx('join-item', joinItem(), className),
      ...rest
    }, vnode.children)
  }
}
