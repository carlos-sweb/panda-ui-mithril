import m from 'mithril'
import { navbarStyles, navbarStartStyles, navbarCenterStyles, navbarEndStyles } from '../../recipes/navbar'
import { cx } from '../../utils/cx'

export const Navbar = {
  view(vnode) {
    const { className, ...rest } = vnode.attrs

    return m('div', {
      className: cx('navbar', navbarStyles(), className),
      ...rest
    }, vnode.children)
  }
}

export const NavbarStart = {
  view(vnode) {
    const { className, ...rest } = vnode.attrs
    return m('div', { className: cx('navbar-start', navbarStartStyles(), className), ...rest }, vnode.children)
  }
}

export const NavbarCenter = {
  view(vnode) {
    const { className, ...rest } = vnode.attrs
    return m('div', { className: cx('navbar-center', navbarCenterStyles(), className), ...rest }, vnode.children)
  }
}

export const NavbarEnd = {
  view(vnode) {
    const { className, ...rest } = vnode.attrs
    return m('div', { className: cx('navbar-end', navbarEndStyles(), className), ...rest }, vnode.children)
  }
}
