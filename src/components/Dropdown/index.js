import m from 'mithril'
import { dropdown } from '../../../styled-system/recipes'
import { cx } from '../../../styled-system/css'
import { Button } from '../Button/index.js'

// Default styles (no variants) for subcomponents used outside a
// Dropdown root or as a fallback. Avoids calling sva on every render.
const defaultStyles = dropdown({})

// Open/close delay (ms) in hover mode, so the menu does not flicker
// when crossing the border between trigger and panel.
const HOVER_DELAY_MS = 150

// Flattens fragments (`tag: '['`) and nested arrays into direct vnodes, just
// like Tabs/Menu, so the cloning below sees DropdownTrigger/Content.
const flatten = (nodes) => nodes.reduce((acc, node) => {
  if (node == null) return acc
  if (Array.isArray(node)) return acc.concat(flatten(node))
  if (node.tag === '[') return acc.concat(flatten(node.children))
  return acc.concat(node)
}, [])

/**
 * Dropdown component. Container that manages a floating panel anchored to a
 * trigger. Supports opening by click or hover, positioning in 12
 * directions, closing by click-outside/Escape/selection, and controlled
 * (`open` + `onchange`) and uncontrolled (`defaultOpen`) modes.
 *
 * Expected children: a `DropdownTrigger` and a `DropdownContent` (in that
 * order). Inside the content the usual menu pattern is used with
 * `Menu`/`MenuItem`/`MenuTitle`.
 *
 * @type {import('mithril').Component<import('./index').DropdownAttrs>}
 */
export const Dropdown = {
  oninit(vnode) {
    vnode.state.open = vnode.attrs.defaultOpen === true
    vnode.state._handlers = null
    vnode.state._hoverTimer = null
    // Mirror of the current state (open + flags) for the native document
    // listeners: Mithril replaces `vnode.attrs` on every render, so an
    // `oncreate` closure would always see the first render's attrs. It is
    // updated on each `view()` and read from `vnode.state` (persistent).
    vnode.state._open = vnode.state.open
    vnode.state._closeOnSelect = true
    vnode.state._closeOnOutside = true
    vnode.state._closeOnEscape = true
  },

  oncreate(vnode) {
    const root = vnode.dom

    // Click outside: closes if the click is not inside the root; if it is
    // inside and lands on a menu item (and closeOnSelect), it closes too. The
    // `.menu-disabled` items do not close (pointer-events already blocks them,
    // but the extra check protects the custom-trigger case).
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

    // Keyboard: Escape closes and returns focus to the trigger; arrows/Home/End
    // navigate among the open panel's `[role="menuitem"]` items.
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
          // The change can come from a native listener (click outside, Escape),
          // outside Mithril's redraw cycle: force the re-render so
          // the parent sees its new `open` value.
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
 * DropdownTrigger component. Button that opens/closes the menu. If it receives a
 * single child vnode (e.g. a library `Button`), it clones it injecting
 * `aria-haspopup`/`aria-expanded` and the handler; if it receives plain text,
 * it renders its own `Button`.
 *
 * @type {import('mithril').Component<import('./index').DropdownTriggerAttrs>}
 */
export const DropdownTrigger = {
  view(vnode) {
    const { __dd, className, ...rest } = vnode.attrs
    const { open, trigger, setOpen } = __dd || {}

    const toggle = (e) => {
      // Respects the child's previous handler (if any) and then toggles.
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

    // Plain text: button with Button's styles.
    return m(Button, {
      ...rest,
      ...interactive,
      className,
    }, vnode.children)
  }
}

/**
 * DropdownContent component. Floating panel positioned relative to the trigger;
 * `role="menu"` and hidden from AT while closed. In `onupdate` it marks
 * the menu items (`Menu > li > a`) with `role="menuitem"` + `tabindex=-1`
 * for the root's keyboard navigation.
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
