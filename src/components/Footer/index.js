import m from 'mithril'
import { footerStyles, footerTitleStyles } from '../../recipes/footer'
import { cx } from '../../utils/cx'

export const Footer = {
  view(vnode) {
    const { center, horizontal, vertical, className, ...rest } = vnode.attrs
    const direction = vertical ? 'vertical' : horizontal ? 'horizontal' : undefined

    return m('footer', {
      className: cx(
        'footer',
        center && 'footer-center',
        direction && `footer-${direction}`,
        footerStyles({ center, direction }),
        className
      ),
      ...rest
    }, vnode.children)
  }
}

export const FooterTitle = {
  view(vnode) {
    const { className, ...rest } = vnode.attrs
    return m('span', { className: cx('footer-title', footerTitleStyles(), className), ...rest }, vnode.children)
  }
}
