import m from 'mithril'
import { modalStyles, modalBoxStyles, modalActionStyles, modalBackdropStyles } from '../../recipes/modal'
import { cx } from '../../utils/cx'

// Real daisyUI supports several ways to open a modal (native <dialog>
// .showModal(), the [popover] attribute, a hidden checkbox + :checked, or
// :target). Since this library wraps Mithril specifically to use real JS,
// `open` drives the dialog's actual .showModal()/.close() here — that gets
// us the real ::backdrop, focus trap, and native Escape-to-close for free,
// instead of reimplementing them in CSS.
function syncOpenState(dialog, shouldBeOpen) {
  if (shouldBeOpen && !dialog.open) dialog.showModal()
  if (!shouldBeOpen && dialog.open) dialog.close()
}

export const Modal = {
  oncreate(vnode) {
    syncOpenState(vnode.dom, !!vnode.attrs.open)
  },

  onupdate(vnode) {
    syncOpenState(vnode.dom, !!vnode.attrs.open)
  },

  view(vnode) {
    const { open, position, className, onclose, ...rest } = vnode.attrs

    return m('dialog', {
      className: cx('modal', position && `modal-${position}`, modalStyles({ position }), className),
      onclose,
      ...rest
    }, vnode.children)
  }
}

export const ModalBox = {
  view(vnode) {
    const { className, ...rest } = vnode.attrs
    return m('div', { className: cx('modal-box', modalBoxStyles(), className), ...rest }, vnode.children)
  }
}

export const ModalAction = {
  view(vnode) {
    const { className, ...rest } = vnode.attrs
    return m('div', { className: cx('modal-action', modalActionStyles(), className), ...rest }, vnode.children)
  }
}

export const ModalBackdrop = {
  view(vnode) {
    const { className, onclick, ...rest } = vnode.attrs
    return m('button', {
      type: 'button',
      className: cx('modal-backdrop', modalBackdropStyles(), className),
      'aria-label': 'Close',
      onclick,
      ...rest
    })
  }
}

export const ModalToggle = {
  view(vnode) {
    const { className, ...rest } = vnode.attrs
    return m('button', {
      type: 'button',
      className: cx('modal-toggle', className),
      ...rest
    })
  }
}
