import m from 'mithril'
import { rangeStyles } from '../../recipes/range'
import { cx } from '../../utils/cx'


export const Range = {
  view(vnode) {
    const { color, size, vertical, className, ...rest } = vnode.attrs

    return m('input', {
      type: 'range',
      className: cx('range', rangeStyles({ color, size, vertical }), className),
      ...rest
    })
  }
}
