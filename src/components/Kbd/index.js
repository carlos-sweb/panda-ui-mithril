import m from 'mithril'
import { kbd } from '../../../styled-system/recipes'
import { cx } from '../../../styled-system/css'

/**
 * Kbd component. Represents a keyboard key (`<kbd>`), with adjustable
 * size via `size`.
 *
 * @type {import('mithril').Component<import('./index').KbdAttrs>}
 */
export const Kbd = {
  view(vnode) {
    const { size, className, ...rest } = vnode.attrs
        
    return m('kbd', {
      className: cx( kbd({ size }), className),
      ...rest
    }, vnode.children)
  }
}
