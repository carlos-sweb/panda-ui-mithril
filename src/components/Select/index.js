import m from 'mithril'
import { selectStyles } from '../../recipes/select'
import { cx } from '../../utils/cx'


export const Select = {
  view(vnode) {
    const { color, size, ghost, className, children, ...rest } = vnode.attrs

    return m('select', {
      className: cx('select', selectStyles({ color, size, ghost }), className),
      ...rest
    }, children)
  }
}
