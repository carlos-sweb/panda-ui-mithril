import m from 'mithril'
import { buttonStyles } from '../../recipes/button'
import { cx } from '../../utils/cx'


export const Button = {
  view(vnode) {
    const { color, variant, size, active, disabled, block, wide, square, circle, shape, className, children, ...rest } = vnode.attrs
    const tag = vnode.attrs.href ? 'a' : 'button'

    return m(tag, {
      className: cx(
        'btn',
        buttonStyles({ color, variant, size }),
        active && 'btn-active',
        disabled && 'btn-disabled',
        block && 'btn-block',
        wide && 'btn-wide',
        square && 'btn-square',
        circle && 'btn-circle',
        className
      ),
      disabled: tag === 'button' ? disabled : undefined,
      ...rest
    }, children)
  }
}
