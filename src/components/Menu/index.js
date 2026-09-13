import m from 'mithril'
import { menu } from '../../../styled-system/recipes'
import { cx } from '../../../styled-system/css'

/**
 * MenuItem component. Menu item (`<li>` that wraps an `<a>`); `active`
 * highlights it and `disabled` dims it.
 *
 * @type {import('mithril').Component<import('./index').MenuItemAttrs>}
 */
export const MenuItem = {
  view(vnode) {
    const { active, disabled, className, ...rest } = vnode.attrs
    return m('li', {
      className: cx(disabled && 'menu-disabled'),
    }, m('a', { className: cx(active && 'menu-active', className), ...rest }, vnode.children))
  }
}

/**
 * Menu component. Navigation menu (`<ul>`) with optional size and
 * horizontal orientation. When `autoActive` is true, the menu automatically
 * manages which item is active on click.
 *
 * @type {import('mithril').Component<import('./index').MenuAttrs>}
 */
export const Menu = {
  oninit(vnode) {
    vnode.state._activeIndex = vnode.attrs.defaultActive ?? -1
  },

  view(vnode) {
    const { size, horizontal, autoActive, onActiveChange, defaultActive, className, ...rest } = vnode.attrs

    // When autoActive, inject active prop into MenuItem children
    let children = vnode.children
    if (autoActive && Array.isArray(vnode.children)) {
      children = vnode.children.map((child, i) => {
        if (child && child.tag === MenuItem) {
          // Use index-based active if _activeIndex is set, otherwise respect child's active prop
          const isActive = vnode.state._activeIndex !== -1
            ? i === vnode.state._activeIndex
            : child.attrs.active
          return m(MenuItem, {
            ...child.attrs,
            active: isActive
          }, child.children)
        }
        return child
      })
    }

    return m('ul', {
      className: cx(menu({ size, horizontal }), className),
      onclick: autoActive ? (e) => {
        const clickedLi = e.target.closest('li')
        if (!clickedLi) return

        const listItems = Array.from(vnode.dom.children)
        const index = listItems.indexOf(clickedLi)

        if (index !== -1 && index !== vnode.state._activeIndex) {
          vnode.state._activeIndex = index
          if (onActiveChange) onActiveChange(index)
        }
      } : undefined,
      ...rest
    }, children)
  }
}

/**
 * MenuTitle component. Section title inside the menu.
 *
 * @type {import('mithril').Component<import('./index').MenuTitleAttrs>}
 */
export const MenuTitle = {
  view(vnode) {
    const { className, ...rest } = vnode.attrs
    return m('li', { className: cx('menu-title', className), ...rest }, m('span', null, vnode.children))
  }
}

/**
 * MenuDropdown component. Nested dropdown submenu.
 *
 * @type {import('mithril').Component<import('./index').MenuDropdownAttrs>}
 */
export const MenuDropdown = {
  view(vnode) {
    const { className, ...rest } = vnode.attrs
    return m('ul', { className: cx('menu-dropdown', className), ...rest }, vnode.children)
  }
}

/**
 * MenuDropdownToggle component. Link that opens/closes a dropdown submenu.
 *
 * @type {import('mithril').Component<import('./index').MenuDropdownToggleAttrs>}
 */
export const MenuDropdownToggle = {
  view(vnode) {
    const { className, ...rest } = vnode.attrs
    return m('a', { className: cx('menu-dropdown-toggle', className), ...rest }, vnode.children)
  }
}
