import m from 'mithril'
import { drawer, drawerCloseButton } from './../../../styled-system/recipes'
import { cx } from '../../../styled-system/css'
import { ButtonClose } from '../ButtonClose/index.js'

// Slightly above the 0.2s exit animation — safety net so the drawer never
// stays open if `animationend` never fires (no CSS engine, missing keyframes).
const CLOSE_FALLBACK_MS = 240

/**
 * Cierra el drawer CON la animación de salida: añade .drawer-closing, espera
 * animationend (fallback 240ms) y entonces dialog.close(). Es el mismo camino
 * para el cierre por prop (open=false) y para el botón X de buttonClose —
 * interacción 100% JS, sin trucos CSS/form.
 * @param {Object} vnode */
function animateClose(vnode) {
  const dialog = vnode.dom
  if (!dialog.open || vnode.state._closing) return
  // prefers-reduced-motion: la media query CSS desactiva la animación, así
  // que animationend nunca llega — cerrar inmediatamente.
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
  // Safety net: si animationend nunca llega (sin CSS engine en tests,
  // keyframes faltantes), igualmente cerrar.
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
 * Componente Drawer. Usa `<dialog>` nativo con `.showModal()`/`.close()` (mismo
 * bridge que Modal) y las animaciones de deslizamiento por posición. Emite
 * eventos de ciclo de vida: `onopen`, `onclose` (evento nativo del dialog),
 * `onclosed` (tras la animación de salida) y `onchange(next)`.
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
   * Al montar: abre el <dialog> con showModal() si open=true y registra el
   * handler de cancel para persistent. @param {Object} vnode */
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
   * Sincroniza el <dialog> nativo con la prop `open`.
   * - open → true: showModal() si no está abierto y dispara onopen/onchange(true)
   *   SOLO en la transición cerrado→abierto (guardado con `!dialog.open`).
   * - open → false: cierra con la animación (animateClose).
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
   * Para consumidores que desmontan el Drawer. @param {Object} vnode @returns {Promise<void>} */
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
   * Renderiza el <dialog> con clases de posición/tamaño, ARIA y el botón de
   * cierre automático. @param {Object} vnode @returns {import('mithril').Vnode} */
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

    // Tamaño arbitrario (no preset) → custom property dinámica (excepción
    // sancionada: estilos vía custom properties, patrón --mail-color).
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
              // El X es un botón JS puro: onclick dispara el bridge animado
              // (animateClose) — mismo camino que el cierre por prop.
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
 * Resultado cacheado de `drawer({})` — los subcomponentes no pasan variantes.
 * @type {ReturnType<typeof drawer>}
 */
const defaultStyles = drawer({})

// ── Subcomponentes ──────────────────────────────────────────────

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
 * Cabecera del drawer (slot `header`): título + zona del botón de cierre.
 * @type {import('mithril').Component<import('./index').DrawerHeaderAttrs>} */
export const DrawerHeader = {
  view(vnode) {
    const { className, ...rest } = vnode.attrs
    return m('div', { className: cx('drawer-header', defaultStyles.header, className), ...rest }, vnode.children)
  }
}

/**
 * Contenido del drawer (slot `body`) — es el SCROLLER: flex:1 + minHeight:0 +
 * overflowY:auto dentro del panel flex. Encapsulado aquí para que el scroll
 * correcto sea el default (el patrón flex-scroll falla silenciosamente si se
 * aplica al elemento equivocado).
 * @type {import('mithril').Component<import('./index').DrawerBodyAttrs>} */
export const DrawerBody = {
  view(vnode) {
    const { className, ...rest } = vnode.attrs
    return m('div', { className: cx('drawer-body', defaultStyles.body, className), ...rest }, vnode.children)
  }
}

/**
 * Pie del drawer (slot `footer`): borde superior + acciones alineadas a la derecha.
 * @type {import('mithril').Component<import('./index').DrawerFooterAttrs>} */
export const DrawerFooter = {
  view(vnode) {
    const { className, ...rest } = vnode.attrs
    return m('div', { className: cx('drawer-footer', defaultStyles.footer, className), ...rest }, vnode.children)
  }
}
