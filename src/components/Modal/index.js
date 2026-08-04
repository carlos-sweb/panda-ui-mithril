import m from 'mithril'
import { modal } from '../../recipes/modal'
import { cx } from '../../utils/cx'

// Module-level scroll lock with an open-modal counter so nested modals work:
// only the first modal locks the body, only the last one restores it.
let openModalCount = 0
let savedBodyOverflow = ''
let savedBodyPaddingRight = ''

function lockBodyScroll() {
  if (openModalCount === 0) {
    savedBodyOverflow = document.body.style.overflow
    savedBodyPaddingRight = document.body.style.paddingRight
    document.body.style.overflow = 'hidden'
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
    document.body.style.paddingRight = `${scrollbarWidth}px`
  }
  openModalCount++
}

function unlockBodyScroll() {
  openModalCount = Math.max(0, openModalCount - 1)
  if (openModalCount === 0) {
    document.body.style.overflow = savedBodyOverflow
    document.body.style.paddingRight = savedBodyPaddingRight
  }
}

// Slightly above the 0.2s exit animation.
const CLOSE_FALLBACK_MS = 240

// Per-instance wrappers so lock/unlock are idempotent (a double unlock would
// corrupt the module-level counter when several modals overlap).
function lockScroll(vnode) {
  if (vnode.state._scrollLocked) return
  lockBodyScroll()
  vnode.state._scrollLocked = true
}

function unlockScroll(vnode) {
  if (!vnode.state._scrollLocked) return
  unlockBodyScroll()
  vnode.state._scrollLocked = false
}

function finishClose(vnode) {
  const dialog = vnode.dom
  dialog.classList.remove('modal-closing')
  vnode.state._closing = false
  if (dialog.open) {
    // close() fires the native 'close' event → onclose() (idempotent for consumers)
    dialog.close()
  }
  unlockScroll(vnode)
  if (vnode.attrs.onclosed) vnode.attrs.onclosed()
}

function beginClose(vnode) {
  const dialog = vnode.dom
  if (vnode.state._closePromise) return vnode.state._closePromise

  vnode.state._closing = true
  dialog.classList.add('modal-closing')

  // prefers-reduced-motion: the recipe disables the exit animation, so
  // animationend never fires — close immediately instead.
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    finishClose(vnode)
    return Promise.resolve()
  }

  vnode.state._closePromise = new Promise((resolve) => {
    let finished = false

    const finish = () => {
      if (finished) return
      finished = true
      dialog.removeEventListener('animationend', onEnd)
      clearTimeout(timeoutId)
      vnode.state._closePromise = null
      if (vnode.attrs.open) {
        // Reopened during the exit animation — cancel the close.
        vnode.state._closing = false
        dialog.classList.remove('modal-closing')
      } else {
        finishClose(vnode)
      }
      resolve()
    }

    const onEnd = (e) => {
      if (e.animationName === 'modal-exit' || e.animationName === 'modal-backdrop-exit') {
        finish()
      }
    }

    dialog.addEventListener('animationend', onEnd)
    // Safety net: if animationend never fires (display issues, missing keyframes,
    // test environments without a CSS engine), still finish the close.
    const timeoutId = setTimeout(finish, CLOSE_FALLBACK_MS)
  })

  return vnode.state._closePromise
}

export const Modal = {
  oninit(vnode) {
    vnode.state._closing = false
    vnode.state._scrollLocked = false
    vnode.state._closePromise = null
    vnode.state._cancelHandler = null
  },

  oncreate(vnode) {
    const dialog = vnode.dom
    const { open, persistent } = vnode.attrs

    if (persistent) {
      vnode.state._cancelHandler = (e) => e.preventDefault()
      dialog.addEventListener('cancel', vnode.state._cancelHandler)
    }

    if (open) {
      dialog.showModal()
      lockScroll(vnode)
    }
  },

  onupdate(vnode) {
    const dialog = vnode.dom
    const shouldBeOpen = !!vnode.attrs.open

    if (shouldBeOpen) {
      // Cancel any pending close sequence and (re)open.
      vnode.state._closing = false
      dialog.classList.remove('modal-closing')
      if (!dialog.open) {
        dialog.showModal()
        lockScroll(vnode)
      }
      return
    }

    // shouldBeOpen === false
    if (dialog.open) {
      // open prop went false while the dialog is still open → animated close.
      beginClose(vnode)
    } else if (vnode.state._closing || vnode.state._scrollLocked) {
      // The dialog was already closed natively (Escape / backdrop close event)
      // before the re-render — just finish the cleanup (unlock scroll, onclosed).
      finishClose(vnode)
    }
  },

  onbeforeremove(vnode) {
    // Conditional-render consumers unmount the Modal to close it. If an exit
    // animation is in flight, wait for it; otherwise close immediately.
    if (vnode.state._closePromise) return vnode.state._closePromise

    const dialog = vnode.dom
    if (dialog.open) {
      dialog.close()
      if (vnode.attrs.onclosed) vnode.attrs.onclosed()
    }
    vnode.state._closing = false
    unlockScroll(vnode)
    return Promise.resolve()
  },

  onremove(vnode) {
    if (vnode.state._cancelHandler) {
      vnode.dom.removeEventListener('cancel', vnode.state._cancelHandler)
      vnode.state._cancelHandler = null
    }
    unlockScroll(vnode)
  },

  view(vnode) {
    const {
      open,
      position,
      size,
      persistent,
      closable,
      labelledby,
      describedby,
      className,
      onclose,
      onclosed,
      ...rest
    } = vnode.attrs

    const ariaProps = {}
    if (open) ariaProps['aria-modal'] = 'true'
    if (labelledby) ariaProps['aria-labelledby'] = labelledby
    if (describedby) ariaProps['aria-describedby'] = describedby

    return m('dialog', {
      className: cx(
        'modal',
        position && `modal-${position}`,
        size && `modal-${size}`,
        modal({ position, size }).modal,
        className
      ),
      onclose,
      ...ariaProps,
      ...rest
    }, vnode.children)
  }
}

export const ModalBox = {
  view(vnode) {
    const { className, ...rest } = vnode.attrs
    return m('div', { className: cx('modal-box', modal({}).box, className), ...rest }, vnode.children)
  }
}

export const ModalAction = {
  view(vnode) {
    const { className, ...rest } = vnode.attrs
    return m('div', { className: cx('modal-action', modal({}).action, className), ...rest }, vnode.children)
  }
}

export const ModalBackdrop = {
  view(vnode) {
    const { className, onclick, ...rest } = vnode.attrs
    return m('button', {
      type: 'button',
      className: cx('modal-backdrop', modal({}).backdrop, className),
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
