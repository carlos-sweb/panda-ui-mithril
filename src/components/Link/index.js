import m from 'mithril'
import { link } from '../../../styled-system/recipes'
import { cx } from '../../../styled-system/css'

/**
 * Link component. Text link with a color variant; `hover: false`
 * shows the underline only on hover and `noUnderline: true`
 * removes it entirely (useful in contexts like the navbar, where NavbarLink
 * applies it as the default — same concept as Drawer conditioning Modal).
 *
 * @type {import('mithril').Component<import('./index').LinkAttrs>}
 */
export const Link = {
  view(vnode) {
    const { color, hover = true, noUnderline, className, ...rest } = vnode.attrs
    return m('a', {
      className: cx( link({ color, hover, noUnderline }), className),
      ...rest
    }, vnode.children)
  }
}
