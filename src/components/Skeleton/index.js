import m from 'mithril'
import { cx } from '../../styled-system/css'

export const Skeleton = {
  view(vnode) {
    const { text, className, ...rest } = vnode.attrs

    return m('div', {
      className: cx('skeleton', text && 'skeleton-text', className),
      ...rest
    })
  }
}
