import m from 'mithril'
import { button } from '../../../styled-system/recipes'
import { cx } from '../../../styled-system/css'

/**
 * Button component. Button with color, style and size variants.
 * If it receives `href` it renders an `<a>`, otherwise a `<button>`;
 * `block`/`wide` control the width and `square`/`circle` the shape.
 *
 * @type {import('mithril').Component<import('./index').ButtonAttrs>}
 */
export const Button = {
  view(vnode) {
    const { color, variant, size, active, disabled, block, wide, square, circle, borderWidth, className, ...rest } = vnode.attrs
    const isLink = !!vnode.attrs.href

    const styles = cx(
      button({
        color,
        variant,
        size,
        active,
        shape: circle ? 'circle' : square ? 'square' : undefined,
        fluid: wide ? 'wide' : block ? 'block' : undefined,
        borderWidth,
      }),
      className
    )

    if (isLink) {
      return m('a', { className: styles, 'data-active': active || undefined, ...rest }, vnode.children)
    }

    return m('button', { className: styles, disabled, 'data-active': active || undefined, ...rest }, vnode.children)
  }
}
