import m from 'mithril'
import { cx } from '../../../styled-system/css'

export const Label = {
  view(vnode) {
    const { floating, className, children, ...rest } = vnode.attrs

    return m(floating ? 'label' : 'span', {
      className: cx(floating ? 'floating-label' : 'label', className),
      ...rest
    }, children)
  }
}
