import m from 'mithril'
import { menu } from '../../../styled-system/recipes'
import { cx } from '../../../styled-system/css'

/**
 * Componente MenuItem. Ítem del menú (`<li>` que envuelve un `<a>`); `active`
 * lo resalta y `disabled` lo atenúa.
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
 * Componente Menu. Menú de navegación (`<ul>`) con tamaño y orientación
 * horizontal opcional. Cuando `autoActive` es true, el menú gestiona
 * automáticamente cuál ítem está activo al hacer click.
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
 * Componente MenuTitle. Título de sección dentro del menú.
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
 * Componente MenuDropdown. Submenú desplegable anidado.
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
 * Componente MenuDropdownToggle. Enlace que abre/cierra un submenú desplegable.
 *
 * @type {import('mithril').Component<import('./index').MenuDropdownToggleAttrs>}
 */
export const MenuDropdownToggle = {
  view(vnode) {
    const { className, ...rest } = vnode.attrs
    return m('a', { className: cx('menu-dropdown-toggle', className), ...rest }, vnode.children)
  }
}
