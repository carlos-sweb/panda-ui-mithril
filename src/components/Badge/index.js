import m from 'mithril'
import { badgeStyles } from '../../recipes/badge'
import { cx } from '../../utils/cx'


export const Badge = {
  view(vnode) {
    const { color, variant, size, className, children, ...rest } = vnode.attrs

    return m('span', {
      className: cx(
        'badge',
        badgeStyles({ color, variant, size }),
        className
      ),
      ...rest
    }, children)
  }
}
