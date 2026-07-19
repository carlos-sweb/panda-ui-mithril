import m from 'mithril'
import { cx } from '../../styled-system/css'

export const Stack = {
  view(vnode) {
    const { placement, className, children, ...rest } = vnode.attrs

    return m('div', {
      className: cx(
        'stack',
        placement && `stack-${placement}`,
        className
      ),
      ...rest
    }, children)
  }
}
