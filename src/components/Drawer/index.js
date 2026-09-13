import m from 'mithril'
import { drawer, drawerCloseButton } from './../../../styled-system/recipes'
import { cx } from '../../../styled-system/css'
import { ButtonClose } from '../ButtonClose/index.js'

// Slightly above the 0.2s exit animation — safety net so the drawer never
// stays open if `animationend` never fires (no CSS engine, missing keyframes).
const CLOSE_FALLBACK_MS = 240

/**
 * Closes the drawer WITH the exit animation: adds .drawer-closing, waits for
 * animationend (240ms fallback) and then dialog.close(). It is the same path
 * for closing via prop (open=false) and for buttonClose's X button —
 * 100% JS interaction, no CSS/form tricks.
 * @param {Object} vnode */
function animateClose(vnode) {
  const dialog = vnode.dom
  if (!dialog.open || vnode.state._closing) return
  // prefers-reduced-motion: the CSS media query disables the animation, so
  // animationend never arrives — close immediately.
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    dialog.close()
    if (vnode.attrs.onclosed) vnode.attrs.onclosed()
    if (vnode.attrs.onchange) vnode.attrs.onchange(false)
    return
  }
  vnode.state._closing = true
  dialog.classList.add('drawer-closing')
  const finish = () => {
    dialog.classList.remove('drawer-closing')
    vnode.state._closing = false
    dialog.close()
    if (vnode.attrs.onclosed) vnode.attrs.onclosed()
    if (vnode.attrs.onchange) vnode.attrs.onchange(false)
  }
  // Safety net: if animationend never arrives (no CSS engine in tests,
  // missing keyframes), close anyway.
  const timeoutId = setTimeout(finish, CLOSE_FALLBACK_MS)
  dialog.addEventListener('animationend', () => {
    clearTimeout(timeoutId)
    finish()
  }, { once: true })
}

// Preset sizes handled by the recipe's `size` variant. Any other value (e.g.
// "55%" or 200) is passed through as the `--drawer-size` custom property.
const SIZE_PRESETS = ['xs', 'sm', 'md', 'lg', 'xl', 'full']

/**
 * Drawer component. Uses native `<dialog>` with `.showModal()`/`.close()` (the
 * same bridge as Modal) and the slide animations per position. Emits
 * lifecycle events: `onopen`, `onclose` (native dialog event),
 * `onclosed` (after the exit animation) and `onchange(next)`.
 *
 * @type {import('mithril').Component<import('./index').DrawerAttrs>}
 */
export const Drawer = {
  /** @param {Object} vnode */
  oninit(vnode) {
    vnode.state._cancelHandler = null
    vnode.state._closing = false
  },

  /**
   * On mount: opens the <dialog> with showModal() if open=true and registers
   * the cancel handler for persistent. @param {Object} vnode */
  oncreate(vnode) {
    const dialog = vnode.dom
    const { open, persistent } = vnode.attrs

    if (persistent) {
      vnode.state._cancelHandler = (e) => e.preventDefault()
      dialog.addEventListener('cancel', vnode.state._cancelHandler)
    }

    if (open) {
      dialog.showModal()
      if (vnode.attrs.onopen) vnode.attrs.onopen()
      if (vnode.attrs.onchange) vnode.attrs.onchange(true)
    }
  },

  /**
   * Syncs the native <dialog> with the `open` prop.
   * - open → true: showModal() if not open and fires onopen/onchange(true)
   *   ONLY on the closed→open transition (guarded with `!dialog.open`).
   * - open → false: closes with the animation (animateClose).
   * @param {Object} vnode */
  onupdate(vnode) {
    const dialog = vnode.dom
    if (vnode.attrs.open) {
      if (!dialog.open) {
        dialog.showModal()
        if (vnode.attrs.onopen) vnode.attrs.onopen()
        if (vnode.attrs.onchange) vnode.attrs.onchange(true)
      }
      return
    }
    if (dialog.open && !vnode.state._closing) {
      animateClose(vnode)
    }
  },

  /**
   * For consumers that unmount the Drawer. @param {Object} vnode @returns {Promise<void>} */
  onbeforeremove(vnode) {
    if (vnode.dom.open) {
      vnode.dom.close()
      if (vnode.attrs.onclosed) vnode.attrs.onclosed()
      if (vnode.attrs.onchange) vnode.attrs.onchange(false)
    }
    return Promise.resolve()
  },

  /** @param {Object} vnode */
  onremove(vnode) {
    if (vnode.state._cancelHandler) {
      vnode.dom.removeEventListener('cancel', vnode.state._cancelHandler)
      vnode.state._cancelHandler = null
    }
  },

  /**
   * Renders the <dialog> with position/size classes, ARIA and the automatic
   * close button. @param {Object} vnode @returns {import('mithril').Vnode} */
  view(vnode) {
    const {
      open, position = 'start', size, persistent, buttonClose,
      labelledby, describedby, className, onclose, onclosed, onopen, onchange,
      ...rest
    } = vnode.attrs

    /** @type {Record<string, string>} */
    const ariaProps = {}
    if (open) ariaProps['aria-modal'] = 'true'
    if (labelledby) ariaProps['aria-labelledby'] = labelledby
    if (describedby) ariaProps['aria-describedby'] = describedby

    // Arbitrary size (not a preset) → dynamic custom property (sanctioned
    // exception: styles via custom properties, the --mail-color pattern).
    const extraStyle = (size !== undefined && !SIZE_PRESETS.includes(size))
      ? { '--drawer-size': size }
      : null

    const children = buttonClose
      ? (Array.isArray(vnode.children) ? vnode.children : [vnode.children]).map((child) => {
          // Inject ButtonClose into the first DrawerBox child
          if (child && child.tag === DrawerBox && !child._buttonCloseInjected) {
            child._buttonCloseInjected = true
            const boxChildren = Array.isArray(child.children) ? [...child.children] : [child.children]
            boxChildren.push(
              // The X is a pure JS button: onclick fires the animated bridge
              // (animateClose) — same path as closing via prop.
              m(ButtonClose, {
                className: drawerCloseButton(),
                onclick: () => animateClose(vnode),
              })
            )
            return m(DrawerBox, child.attrs, boxChildren)
          }
          return child
        })
      : vnode.children

    return m('dialog', {
      className: cx(
        'drawer',
        position && `drawer-${position}`,
        SIZE_PRESETS.includes(size) && size && `drawer-${size}`,
        drawer({ position, size }).drawer,
        className
      ),
      style: extraStyle || undefined,
      onclose,
      ...ariaProps,
      ...rest
    }, children)
  }
}

/**
 * Cached result of `drawer({})` — subcomponents pass no variants.
 * @type {ReturnType<typeof drawer>}
 */
const defaultStyles = drawer({})

// ── Subcomponents ──────────────────────────────────────────────

/** @type {import('mithril').Component<import('./index').DrawerBoxAttrs>} */
export const DrawerBox = {
  view(vnode) {
    const { className, ...rest } = vnode.attrs
    return m('div', { className: cx('drawer-box', defaultStyles.box, className), ...rest }, vnode.children)
  }
}

/** @type {import('mithril').Component<import('./index').DrawerActionAttrs>} */
export const DrawerAction = {
  view(vnode) {
    const { className, ...rest } = vnode.attrs
    return m('div', { className: cx('drawer-action', defaultStyles.action, className), ...rest }, vnode.children)
  }
}

/** @type {import('mithril').Component<import('./index').DrawerBackdropAttrs>} */
export const DrawerBackdrop = {
  view(vnode) {
    const { className, onclick, ...rest } = vnode.attrs
    return m('button', {
      type: 'button',
      className: cx('drawer-backdrop', defaultStyles.backdrop, className),
      'aria-label': 'Close',
      onclick,
      ...rest
    })
  }
}

/**
 * Drawer header (slot `header`): title + close button area.
 * @type {import('mithril').Component<import('./index').DrawerHeaderAttrs>} */
export const DrawerHeader = {
  view(vnode) {
    const { className, ...rest } = vnode.attrs
    return m('div', { className: cx('drawer-header', defaultStyles.header, className), ...rest }, vnode.children)
  }
}

/**
 * Drawer content (slot `body`) — it is the SCROLLER: flex:1 + minHeight:0 +
 * overflowY:auto inside the flex panel. Encapsulated here so that correct
 * scrolling is the default (the flex-scroll pattern fails silently if it is
 * applied to the wrong element).
 * @type {import('mithril').Component<import('./index').DrawerBodyAttrs>} */
export const DrawerBody = {
  view(vnode) {
    const { className, ...rest } = vnode.attrs
    return m('div', { className: cx('drawer-body', defaultStyles.body, className), ...rest }, vnode.children)
  }
}

/**
 * Drawer footer (slot `footer`): top border + actions aligned to the right.
 * @type {import('mithril').Component<import('./index').DrawerFooterAttrs>} */
export const DrawerFooter = {
  view(vnode) {
    const { className, ...rest } = vnode.attrs
    return m('div', { className: cx('drawer-footer', defaultStyles.footer, className), ...rest }, vnode.children)
  }
}
