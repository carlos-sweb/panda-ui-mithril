import m from 'mithril'
import { alertStyles } from '../../recipes/alert'
import { cx } from '../../utils/cx'


export const Alert = {
  view(vnode) {
    const { variant, color, direction, className, children, ...rest } = vnode.attrs

    return m('div', {
      role: 'alert',
      className: cx(
        'alert',
        alertStyles({ variant, color, direction }),
        className
      ),
      ...rest
    }, children)
  }
}
