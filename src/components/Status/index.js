import m from 'mithril'
import { statusStyles } from '../../recipes/status'
import { cx } from '../../utils/cx'


export const Status = {
  view(vnode) {
    const { color, size, className, ...rest } = vnode.attrs

    return m('span', {
      className: cx('status', statusStyles({ color, size }), className),
      ...rest
    })
  }
}
