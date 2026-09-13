import m from 'mithril'
import { footer } from '../../../styled-system/recipes'
import { cx } from '../../../styled-system/css'

/**
 * Footer component. Grid page footer; `center` centers the content and
 * `horizontal`/`vertical` control the flow direction.
 *
 * @type {import('mithril').Component<import('./index').FooterAttrs>}
 */
export const Footer = {
  view(vnode) {
    const { center, horizontal, vertical, className, ...rest } = vnode.attrs
    const direction = vertical ? 'vertical' : horizontal ? 'horizontal' : undefined

    return m('footer', {
      className: cx(
        'footer',
        center && 'footer-center',
        direction && `footer-${direction}`,
        footer({ center, direction }).footer,
        className
      ),
      ...rest
    }, vnode.children)
  }
}

/**
 * Cached result of `footer({})` — subcomponents pass no variants,
 * so the classes are deterministic. Avoids calling sva on every render.
 * @type {ReturnType<typeof footer>}
 */
const defaultStyles = footer({})

/**
 * FooterTitle component. Uppercase title of a footer column
 * (the recipe's `title` slot).
 *
 * @type {import('mithril').Component<import('./index').FooterTitleAttrs>}
 */
export const FooterTitle = {
  view(vnode) {
    const { className, ...rest } = vnode.attrs
    return m('span', { className: cx('footer-title', defaultStyles.title, className), ...rest }, vnode.children)
  }
}
