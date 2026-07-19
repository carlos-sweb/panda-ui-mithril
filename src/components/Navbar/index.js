import m from 'mithril'
import { cx } from '../../styled-system/css'

export const Navbar = {
  view(vnode) {
    const { className, children, ...rest } = vnode.attrs

    return m('div', {
      className: cx('navbar', className),
      ...rest
    }, children)
  }
}

export const NavbarStart = {
  view(vnode) {
    const { className, children, ...rest } = vnode.attrs
    return m('div', { className: cx('navbar-start', className), ...rest }, children)
  }
}

export const NavbarCenter = {
  view(vnode) {
    const { className, children, ...rest } = vnode.attrs
    return m('div', { className: cx('navbar-center', className), ...rest }, children)
  }
}

export const NavbarEnd = {
  view(vnode) {
    const { className, children, ...rest } = vnode.attrs
    return m('div', { className: cx('navbar-end', className), ...rest }, children)
  }
}
