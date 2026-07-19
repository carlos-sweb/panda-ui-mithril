import m from 'mithril'
import { cx } from '../../../styled-system/css'

export const Toast = {
  view(vnode) {
    const { position, className, children, ...rest } = vnode.attrs

    return m('div', {
      className: cx(
        'toast',
        position && `toast-${position}`,
        className
      ),
      ...rest
    }, children)
  }
}
