import m from 'mithril'
import { buttonStyles } from '../../recipes/button'
import { cx } from '../../utils/cx'


export const Button = {
  view(vnode) {
    const { color, variant, size, active, disabled, block, wide, square, circle, className, ...rest } = vnode.attrs
    const isLink = !!vnode.attrs.href

    const styles = cx(
      buttonStyles({
        color,
        variant,
        size,
        active,
        shape: circle ? 'circle' : square ? 'square' : undefined,
        fluid: wide ? 'wide' : block ? 'block' : undefined,
      }),
      className
    )

    if (isLink) {
      return (
        <a className={styles} {...rest}>
          {vnode.children}
        </a>
      )
    }

    return (
      <button className={styles} disabled={disabled} {...rest}>
        {vnode.children}
      </button>
    )
  }
}
