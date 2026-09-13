import m from 'mithril'
import { modal, modalCloseButton } from './../../../styled-system/recipes'
import { cx } from '../../../styled-system/css'
import { ButtonClose } from '../ButtonClose/index.js'

// Slightly above the 0.2s exit animation — safety net so the dialog never
// stays open if `animationend` never fires (no CSS engine, missing keyframes).
const CLOSE_FALLBACK_MS = 240

/**
 * Closes the modal WITH the exit animation: adds .modal-closing, waits for
 * animationend (240ms fallback) and then dialog.close(). It is the same path
 * for closing via prop (open=false) and for buttonClose's X button —
 * 100% JS interaction, no CSS/form tricks.
 * @param {Object} vnode */
function animateClose(vnode) {
  const dialog = vnode.dom
  if (!dialog.open || vnode.state._closing) return
  // prefers-reduced-motion: the CSS media query disables the animation,
  // so animationend never fires — close immediately instead.
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    dialog.close()
    if (vnode.attrs.onclosed) vnode.attrs.onclosed()
    return
  }
  vnode.state._closing = true
  dialog.classList.add('modal-closing')
  const finish = () => {
    dialog.classList.remove('modal-closing')
    vnode.state._closing = false
    dialog.close()
    if (vnode.attrs.onclosed) vnode.attrs.onclosed()
  }
  // Safety net: if animationend never fires (no CSS engine in tests,
  // missing keyframes, display issues), still close the dialog.
  const timeoutId = setTimeout(finish, CLOSE_FALLBACK_MS)
  dialog.addEventListener('animationend', () => {
    clearTimeout(timeoutId)
    finish()
  }, { once: true })
}

/**
 * Modal component. Uses the native `<dialog>` with `.showModal()`/`.close()`.
 * The entrance/exit animations and the body scroll lock are handled by
 * modern CSS (:has(), @starting-style, transition-behavior: allow-discrete).
 *
 * @type {import('mithril').Component<import('./index').ModalAttrs>}
 */
export const Modal = {
  /** @param {Object} vnode */
  oninit(vnode) {
    vnode.state._cancelHandler = null
    vnode.state._closing = false
  },

  /**
   * On mount: opens the <dialog> with showModal() if open=true,
   * and registers the cancel handler for persistent.
   * @param {Object} vnode */
  oncreate(vnode) {
    const dialog = vnode.dom
    const { open, persistent } = vnode.attrs

    if (persistent) {
      vnode.state._cancelHandler = (e) => e.preventDefault()
      dialog.addEventListener('cancel', vnode.state._cancelHandler)
    }

    if (open) dialog.showModal()
  },

  /**
   * Synchronizes the native <dialog> with the `open` prop.
   * - open → true: showModal() if it is not open.
   * - open → false: closes with the animation (animateClose).
   * @param {Object} vnode */
  onupdate(vnode) {
    const dialog = vnode.dom
    if (vnode.attrs.open) {
      if (!dialog.open) dialog.showModal()
      return
    }
    if (dialog.open && !vnode.state._closing) {
      animateClose(vnode)
    }
  },

  /**
   * For consumers that unmount the Modal. If the dialog is still open,
   * closes it and fires onclosed. @param {Object} vnode @returns {Promise<void>} */
  onbeforeremove(vnode) {
    if (vnode.dom.open) {
      vnode.dom.close()
      if (vnode.attrs.onclosed) vnode.attrs.onclosed()
    }
    return Promise.resolve()
  },

  /** On unmount: cleans up the cancel listener. @param {Object} vnode */
  onremove(vnode) {
    if (vnode.state._cancelHandler) {
      vnode.dom.removeEventListener('cancel', vnode.state._cancelHandler)
      vnode.state._cancelHandler = null
    }
  },

  /**
   * Renders the <dialog> with position/size classes and ARIA attributes.
   * @param {Object} vnode
   * @returns {import('mithril').Vnode} */
  view(vnode) {
    const {
      open, position, size, persistent, closable, buttonClose,
      labelledby, describedby, className, onclose, onclosed,
      ...rest
    } = vnode.attrs

    /** @type {Record<string, string>} */
    const ariaProps = {}
    if (open) ariaProps['aria-modal'] = 'true'
    if (labelledby) ariaProps['aria-labelledby'] = labelledby
    if (describedby) ariaProps['aria-describedby'] = describedby

    const children = buttonClose
      ? (Array.isArray(vnode.children) ? vnode.children : [vnode.children]).map((child) => {
          // Inject ButtonClose into the first ModalBox child
          if (child && child.tag === ModalBox && !child._buttonCloseInjected) {
            child._buttonCloseInjected = true
            const boxChildren = Array.isArray(child.children) ? [...child.children] : [child.children]
            boxChildren.push(
              // The X is a pure JS button: onclick triggers the animated bridge
              // (animateClose) — same path as closing via prop.
              m(ButtonClose, {
                className: modalCloseButton(),
                onclick: () => animateClose(vnode),
              })
            )
            return m(ModalBox, child.attrs, boxChildren)
          }
          return child
        })
      : vnode.children

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
    }, children)
  }
}

/**
 * Cached result of `modal({})` — the subcomponents pass no variants,
 * so the classes are deterministic. Avoids calling the sva on every render.
 * @type {ReturnType<typeof modal>}
 */
const defaultStyles = modal({})

// ── Subcomponents ──────────────────────────────────────────────

/** @type {import('mithril').Component<import('./index').ModalBoxAttrs>} */
export const ModalBox = {
  view(vnode) {
    const { className, ...rest } = vnode.attrs
    return m('div', { className: cx('modal-box', defaultStyles.box, className), ...rest }, vnode.children)
  }
}

/** @type {import('mithril').Component<import('./index').ModalActionAttrs>} */
export const ModalAction = {
  view(vnode) {
    const { className, ...rest } = vnode.attrs
    return m('div', { className: cx('modal-action', defaultStyles.action, className), ...rest }, vnode.children)
  }
}

/** @type {import('mithril').Component<import('./index').ModalBackdropAttrs>} */
export const ModalBackdrop = {
  view(vnode) {
    const { className, onclick, ...rest } = vnode.attrs
    return m('button', {
      type: 'button',
      className: cx('modal-backdrop', defaultStyles.backdrop, className),
      'aria-label': 'Close',
      onclick,
      ...rest
    })
  }
}

/** @type {import('mithril').Component<import('./index').ModalToggleAttrs>} */
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
