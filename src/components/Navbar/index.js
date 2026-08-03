import m from 'mithril'
import { navbar } from '../../recipes/navbar'
import { cx } from '../../utils/cx'

export const Navbar = {
  view(vnode) {
    const { className, ...rest } = vnode.attrs

    return m('div', {
      className: cx('navbar', navbar({}).navbar, className),
      ...rest
    }, vnode.children)
  }
}

export const NavbarStart = {
  view(vnode) {
    const { className, ...rest } = vnode.attrs
    return m('div', { className: cx('navbar-start', navbar({}).start, className), ...rest }, vnode.children)
  }
}

export const NavbarCenter = {
  view(vnode) {
    const { className, ...rest } = vnode.attrs
    return m('div', { className: cx('navbar-center', navbar({}).center, className), ...rest }, vnode.children)
  }
}

export const NavbarEnd = {
  view(vnode) {
    const { className, ...rest } = vnode.attrs
    return m('div', { className: cx('navbar-end', navbar({}).end, className), ...rest }, vnode.children)
  }
}
