import m from 'mithril'
import { dividerStyles } from '../../recipes/divider'
import { cx } from '../../utils/cx'


export const Divider = {
  view(vnode) {
    const { color, direction, placement, className, children, ...rest } = vnode.attrs

    return m('div', {
      role: 'separator',
      className: cx('divider', dividerStyles({ color, direction, placement }), className),
      ...rest
    }, children)
  }
}
