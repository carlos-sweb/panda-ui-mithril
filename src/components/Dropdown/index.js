import m from 'mithril'
import { dropdown } from '../../../styled-system/recipes'
import { cx } from '../../../styled-system/css'
import { Button } from '../Button/index.jsx'

// Estilos por defecto (sin variantes) para los subcomponentes usados fuera de
// un root Dropdown o como fallback. Evita llamar al sva en cada render.
const defaultStyles = dropdown({})

// Delay (ms) de apertura/cierre en modo hover, para que el menú no parpadee
// al cruzar el borde entre trigger y panel.
const HOVER_DELAY_MS = 150

// Aplana fragments (`tag: '['`) y arrays anidados a vnodes directos, igual
// que Tabs/Menu, para que el clonado de abajo vea DropdownTrigger/Content.
const flatten = (nodes) => nodes.reduce((acc, node) => {
  if (node == null) return acc
  if (Array.isArray(node)) return acc.concat(flatten(node))
  if (node.tag === '[') return acc.concat(flatten(node.children))
  return acc.concat(node)
}, [])

/**
 * Componente Dropdown. Contenedor que gestiona un panel flotante anclado a un
 * trigger. Soporta apertura por click o hover, posicionamiento en 12
 * direcciones, cierre por click-fuera/Escape/selección, y modos controlado
 * (`open` + `onchange`) y no controlado (`defaultOpen`).
 *
 * Children esperados: un `DropdownTrigger` y un `DropdownContent` (en ese
 * orden). Dentro del content se usa el patrón habitual de menú con
 * `Menu`/`MenuItem`/`MenuTitle`.
 *
 * @type {import('mithril').Component<import('./index').DropdownAttrs>}
 */
export const Dropdown = {
  oninit(vnode) {
    vnode.state.open = vnode.attrs.defaultOpen === true
    vnode.state._handlers = null
    vnode.state._hoverTimer = null
    // Espejo del estado actual (open + flags) para los listeners nativos de
    // document: Mithril reemplaza `vnode.attrs` en cada render, así que un
    // closure de `oncreate` vería siempre las attrs del primer render. Se
    // actualiza en cada `view()` y se lee desde `vnode.state` (persistente).
    vnode.state._open = vnode.state.open
    vnode.state._closeOnSelect = true
    vnode.state._closeOnOutside = true
    vnode.state._closeOnEscape = true
  },

  oncreate(vnode) {
    const root = vnode.dom

    // Click fuera: cierra si el click no está dentro del root; si está dentro
    // y cae en un item de menú (y closeOnSelect), cierra también. Los items
    // `.menu-disabled` no cierran (pointer-events ya los bloquea, pero el
    // chequeo extra protege el caso de triggers custom).
    const onDocClick = (e) => {
      if (!vnode.state._open) return
      if (root.contains(e.target)) {
        if (vnode.state._closeOnSelect !== false) {
          const item = e.target.closest('.menu > li:not(.menu-title) > a, .menu > li:not(.menu-title) > .menu-dropdown-toggle')
          if (item && !item.closest('.menu-disabled')) {
            vnode.state.setOpen(false)
          }
        }
        return
      }
      if (vnode.state._closeOnOutside !== false) vnode.state.setOpen(false)
    }

    // Teclado: Escape cierra y devuelve foco al trigger; flechas/Home/End
    // navegan entre los items `[role="menuitem"]` del panel abierto.
    const onKey = (e) => {
      if (!vnode.state._open) return
      if (e.key === 'Escape' && vnode.state._closeOnEscape !== false) {
        e.preventDefault()
        vnode.state.setOpen(false)
        const trigger = root.querySelector('[aria-haspopup="menu"]')
        if (trigger) trigger.focus()
        return
      }
      const items = Array.from(root.querySelectorAll('.dropdown-content [role="menuitem"]'))
      if (!items.length) return
      const current = document.activeElement
      let idx = items.indexOf(current)
      if (e.key === 'ArrowDown') { e.preventDefault(); idx = (idx + 1) % items.length }
      else if (e.key === 'ArrowUp') { e.preventDefault(); idx = (idx - 1 + items.length) % items.length }
      else if (e.key === 'Home') { e.preventDefault(); idx = 0 }
      else if (e.key === 'End') { e.preventDefault(); idx = items.length - 1 }
      else return
      items[idx].focus()
    }

    document.addEventListener('click', onDocClick, true)
    document.addEventListener('keydown', onKey)
    vnode.state._handlers = { onDocClick, onKey }
  },

  onremove(vnode) {
    if (vnode.state._handlers) {
      document.removeEventListener('click', vnode.state._handlers.onDocClick, true)
      document.removeEventListener('keydown', vnode.state._handlers.onKey)
    }
    if (vnode.state._hoverTimer) clearTimeout(vnode.state._hoverTimer)
  },

  view(vnode) {
    const { open, defaultOpen, onchange, placement, trigger = 'click', offset, width, closeOnSelect, closeOnOutside, closeOnEscape, className, ...rest } = vnode.attrs

    const isControlled = open !== undefined
    const isOpen = isControlled ? !!open : vnode.state.open

    const setOpen = (next) => {
      if (isControlled) {
        if (onchange && next !== isOpen) {
          onchange(next)
          // El cambio puede venir de un listener nativo (click fuera, Escape),
          // fuera del ciclo de redraw de Mithril: forzar el re-render para
          // que el padre vea su nuevo valor de `open`.
          m.redraw()
        }
        return
      }
      if (vnode.state.open !== next) {
        vnode.state.open = next
        m.redraw()
      }
    }
    vnode.state.setOpen = setOpen
    vnode.state._open = isOpen
    vnode.state._closeOnSelect = closeOnSelect
    vnode.state._closeOnOutside = closeOnOutside
    vnode.state._closeOnEscape = closeOnEscape

    const styles = dropdown({ placement, offset, width, open: isOpen })

    const hoverHandlers = trigger === 'hover' ? {
      onmouseenter: () => {
        if (vnode.state._hoverTimer) clearTimeout(vnode.state._hoverTimer)
        vnode.state._hoverTimer = setTimeout(() => setOpen(true), HOVER_DELAY_MS)
      },
      onmouseleave: () => {
        if (vnode.state._hoverTimer) clearTimeout(vnode.state._hoverTimer)
        vnode.state._hoverTimer = setTimeout(() => setOpen(false), HOVER_DELAY_MS)
      },
    } : undefined

    const children = flatten(vnode.children).map((child) => {
      if (child && child.tag === DropdownTrigger) {
        return m(DropdownTrigger, {
          ...child.attrs,
          __dd: { open: isOpen, trigger, setOpen },
        }, child.children)
      }
      if (child && child.tag === DropdownContent) {
        return m(DropdownContent, {
          ...child.attrs,
          __dd: { open: isOpen, styles },
        }, child.children)
      }
      return child
    })

    return m('div', {
      className: cx('dropdown', styles.dropdown, isOpen && 'dropdown-open', className),
      ...hoverHandlers,
      ...rest
    }, children)
  }
}

/**
 * Componente DropdownTrigger. Botón que abre/cierra el menú. Si recibe un
 * único child vnode (p.ej. un `Button` de la librería), lo clona inyectándole
 * `aria-haspopup`/`aria-expanded` y el handler; si recibe texto plano,
 * renderiza un `Button` propio.
 *
 * @type {import('mithril').Component<import('./index').DropdownTriggerAttrs>}
 */
export const DropdownTrigger = {
  view(vnode) {
    const { __dd, className, ...rest } = vnode.attrs
    const { open, trigger, setOpen } = __dd || {}

    const toggle = (e) => {
      // Respeta el handler previo del child (si lo había) y luego hace toggle.
      if (vnode.state._prevOnclick) vnode.state._prevOnclick(e)
      if (setOpen) setOpen(!open)
    }

    const interactive = {
      'aria-haspopup': 'menu',
      'aria-expanded': open ? 'true' : 'false',
      onclick: trigger === 'click' ? toggle : undefined,
    }

    const child = Array.isArray(vnode.children) && vnode.children.length === 1
      ? vnode.children[0]
      : vnode.children

    if (child && typeof child === 'object' && child.tag) {
      vnode.state._prevOnclick = child.attrs.onclick
      return m(child.tag, {
        ...child.attrs,
        ...interactive,
        className: cx(child.attrs.className, className),
      }, child.children)
    }

    // Texto plano: botón con los estilos de Button.
    return m(Button, {
      ...rest,
      ...interactive,
      className,
    }, vnode.children)
  }
}

/**
 * Componente DropdownContent. Panel flotante posicionado respecto al trigger;
 * `role="menu"` y oculto para AT mientras está cerrado. En `onupdate` marca
 * los items del menú (`Menu > li > a`) con `role="menuitem"` + `tabindex=-1`
 * para la navegación por teclado del root.
 *
 * @type {import('mithril').Component<import('./index').DropdownContentAttrs>}
 */
export const DropdownContent = {
  onupdate(vnode) {
    const dom = vnode.dom
    if (!dom) return
    const items = dom.querySelectorAll('.menu > li:not(.menu-title) > a, .menu > li:not(.menu-title) > .menu-dropdown-toggle')
    items.forEach((el) => {
      el.setAttribute('role', 'menuitem')
      el.setAttribute('tabindex', '-1')
    })
  },

  view(vnode) {
    const { __dd, className, ...rest } = vnode.attrs
    const { open, styles } = __dd || {}

    return m('div', {
      role: 'menu',
      'aria-hidden': open ? undefined : 'true',
      className: cx('dropdown-content', (styles || defaultStyles).content, className),
      ...rest
    }, vnode.children)
  }
}
