import m from 'mithril'
import { menuStyles } from '../../recipes/menu'
import { cx } from '../../utils/cx'


export const Menu = {
  view(vnode) {
    const { size, horizontal, className, ...rest } = vnode.attrs

    return m('ul', {
      className: cx('menu', menuStyles({ size, horizontal }), className),
      ...rest
    }, vnode.children)
  }
}

export const MenuItem = {
  view(vnode) {
    const { active, disabled, className, ...rest } = vnode.attrs

    return m('li', {
      className: cx(disabled && 'menu-disabled'),
    }, m('a', { className: cx(active && 'menu-active', className), ...rest }, vnode.children))
  }
}

export const MenuTitle = {
  view(vnode) {
    const { className, ...rest } = vnode.attrs
    return m('li', { className: cx('menu-title', className), ...rest }, m('span', null, vnode.children))
  }
}

export const MenuDropdown = {
  view(vnode) {
    const { className, ...rest } = vnode.attrs
    return m('ul', { className: cx('menu-dropdown', className), ...rest }, vnode.children)
  }
}

export const MenuDropdownToggle = {
  view(vnode) {
    const { className, ...rest } = vnode.attrs
    return m('a', { className: cx('menu-dropdown-toggle', className), ...rest }, vnode.children)
  }
}
