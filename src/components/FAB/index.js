import m from 'mithril'
import { cx } from '../../../styled-system/css'

export const FAB = {
  view(vnode) {
    const { flower, className, children, ...rest } = vnode.attrs

    return m('div', {
      className: cx('fab', flower && 'fab-flower', className),
      ...rest
    }, children)
  }
}

export const FABMain = {
  view(vnode) {
    const { className, children, ...rest } = vnode.attrs

    return m('div', {
      className: cx(className),
      tabindex: '0',
      role: 'button',
      ...rest
    }, children)
  }
}

export const FABAction = {
  view(vnode) {
    const { label, className, children, ...rest } = vnode.attrs

    return m('div', {
      className: cx(className),
      ...rest
    }, [
      label && m('span', { className: 'text-sm' }, label),
      children,
    ])
  }
}
