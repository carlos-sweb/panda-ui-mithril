import m from 'mithril'
import { cx } from '../../../styled-system/css'

export const Footer = {
  view(vnode) {
    const { center, horizontal, vertical, className, children, ...rest } = vnode.attrs

    return m('footer', {
      className: cx(
        'footer',
        center && 'footer-center',
        horizontal && 'footer-horizontal',
        vertical && 'footer-vertical',
        className
      ),
      ...rest
    }, children)
  }
}

export const FooterTitle = {
  view(vnode) {
    const { className, children, ...rest } = vnode.attrs
    return m('span', { className: cx('footer-title', className), ...rest }, children)
  }
}
