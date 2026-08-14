import m from 'mithril'
import { menu } from '../../../styled-system/recipes'
import { cx } from '../../utils/cx'

/**
 * Componente Menu. Menú de navegación (`<ul>`) con tamaño y orientación
 * horizontal opcional.
 *
 * @type {import('mithril').Component<import('./index').MenuAttrs>}
 */
export const Menu = {
  view(vnode) {
    const { size, horizontal, className, ...rest } = vnode.attrs

    return m('ul', {
      className: cx('menu', menu({ size, horizontal }), className),
      ...rest
    }, vnode.children)
  }
}

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
