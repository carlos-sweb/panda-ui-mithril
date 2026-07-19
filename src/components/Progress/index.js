import m from 'mithril'
import { progressStyles } from '../../recipes/progress'
import { cx } from '../../utils/cx'


export const Progress = {
  view(vnode) {
    const { color, value, max, className, ...rest } = vnode.attrs

    return m('progress', {
      className: cx('progress', progressStyles({ color }), className),
      value,
      max: max || 100,
      ...rest
    })
  }
}
