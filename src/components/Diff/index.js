import m from 'mithril'
import { cx } from '../../../styled-system/css'

export const Diff = {
  view(vnode) {
    const { className, children, ...rest } = vnode.attrs

    return m('figure', {
      className: cx('diff', className),
      ...rest
    }, children)
  }
}

export const DiffItem1 = {
  view(vnode) {
    const { className, children, ...rest } = vnode.attrs
    return m('div', { className: cx('diff-item-1', className), ...rest }, children)
  }
}

export const DiffItem2 = {
  view(vnode) {
    const { className, children, ...rest } = vnode.attrs
    return m('div', { className: cx('diff-item-2', className), ...rest }, children)
  }
}

export const DiffResizer = {
  view(vnode) {
    const { className, ...rest } = vnode.attrs
    return m('div', { className: cx('diff-resizer', className), ...rest })
  }
}
