import m from 'mithril'
import { menuStyles } from '../../recipes/menu'
import { cx } from '../../utils/cx'


export const Menu = {
  view(vnode) {
    const { size, horizontal, className, children, ...rest } = vnode.attrs

    return m('ul', {
      className: cx('menu', menuStyles({ size, horizontal }), className),
      ...rest
    }, children)
  }
}

export const MenuItem = {
  view(vnode) {
    const { active, disabled, className, children, ...rest } = vnode.attrs

    return m('li', {
      className: cx(active && 'menu-active', disabled && 'menu-disabled', className),
    }, m('a', { ...rest }, children))
  }
}

export const MenuTitle = {
  view(vnode) {
    const { className, children, ...rest } = vnode.attrs
    return m('li', { className: cx('menu-title', className), ...rest }, m('span', null, children))
  }
}

export const MenuDropdown = {
  view(vnode) {
    const { className, children, ...rest } = vnode.attrs
    return m('ul', { className: cx('menu-dropdown', className), ...rest }, children)
  }
}

export const MenuDropdownToggle = {
  view(vnode) {
    const { className, children, ...rest } = vnode.attrs
    return m('a', { className: cx('menu-dropdown-toggle', className), ...rest }, children)
  }
}
