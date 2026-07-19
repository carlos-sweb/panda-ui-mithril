import m from 'mithril'
import { cx } from '../../styled-system/css'

export const Modal = {
  view(vnode) {
    const { open, position, className, children, ...rest } = vnode.attrs

    return m('dialog', {
      className: cx(
        'modal',
        position && `modal-${position}`,
        open && 'modal-open',
        className
      ),
      ...rest
    }, children)
  }
}

export const ModalBox = {
  view(vnode) {
    const { className, children, ...rest } = vnode.attrs
    return m('div', { className: cx('modal-box', className), ...rest }, children)
  }
}

export const ModalAction = {
  view(vnode) {
    const { className, children, ...rest } = vnode.attrs
    return m('form', { method: 'dialog', className: cx('modal-action', className) },
      m('button', { ...rest }, children)
    )
  }
}

export const ModalBackdrop = {
  view(vnode) {
    const { className, onclick, ...rest } = vnode.attrs
    return m('form', {
      method: 'dialog',
      className: cx('modal-backdrop', className),
      ...rest
    }, m('button', { onclick }, 'close'))
  }
}

export const ModalToggle = {
  view(vnode) {
    const { for: htmlFor, className, ...rest } = vnode.attrs
    return m('button', {
      className: cx('modal-toggle', className),
      ...rest
    })
  }
}
