import m from 'mithril'
import { Menu as MenuIcon, X } from 'lucide-mithril'
import { navbar } from '../../../styled-system/recipes'
import { cx } from '../../../styled-system/css'
import { Button } from '../Button/index.js'
import { Link } from '../Link/index.js'

/**
 * Navbar component. Three-zone navigation bar with professional
 * variants (sticky/fixed position, semantic color, size, border,
 * shadow, glass) and strategic sub-components: NavbarBrand (logo/title),
 * NavbarMenu + NavbarLink (group of links with active state) and NavbarToggle
 * (mobile hamburger, pairs with the library's Drawer).
 *
 * @type {import('mithril').Component<import('./index').NavbarAttrs>}
 */
export const Navbar = {
  view(vnode) {
    const {
      position, color, size, border, shadow, glass, container,
      className, ...rest
    } = vnode.attrs

    const styles = navbar({ position, color, size, border, shadow, glass })

    // container: Bootstrap pattern — the content is centered with max-width
    // (--navbar-max-w, default 80rem). The zones stay inside the wrapper.
    const children = container
      ? m('div', { className: cx('navbar-container', styles.container) }, vnode.children)
      : vnode.children

    return m('div', {
      className: cx('navbar', styles.navbar, className),
      ...rest
    }, children)
  }
}

/**
 * Cached result of `navbar({})` — subcomponents without variants use the
 * default classes. Avoids calling the sva on every render.
 * @type {ReturnType<typeof navbar>}
 */
const defaultStyles = navbar({})

/**
 * NavbarStart component. Left zone of the navbar.
 *
 * @type {import('mithril').Component<import('./index').NavbarStartAttrs>}
 */
export const NavbarStart = {
  view(vnode) {
    const { className, ...rest } = vnode.attrs
    return m('div', { className: cx('navbar-start', defaultStyles.start, className), ...rest }, vnode.children)
  }
}

/**
 * NavbarCenter component. Center zone of the navbar.
 *
 * @type {import('mithril').Component<import('./index').NavbarCenterAttrs>}
 */
export const NavbarCenter = {
  view(vnode) {
    const { className, ...rest } = vnode.attrs
    return m('div', { className: cx('navbar-center', defaultStyles.center, className), ...rest }, vnode.children)
  }
}

/**
 * NavbarEnd component. Right zone of the navbar.
 *
 * @type {import('mithril').Component<import('./index').NavbarEndAttrs>}
 */
export const NavbarEnd = {
  view(vnode) {
    const { className, ...rest } = vnode.attrs
    return m('div', { className: cx('navbar-end', defaultStyles.end, className), ...rest }, vnode.children)
  }
}

/**
 * NavbarBrand component. Logo + site title (Bootstrap
 * `.navbar-brand` pattern). Renders an `<a>`; `href` and `onclick` are
 * passed through attrs.
 *
 * @type {import('mithril').Component<import('./index').NavbarBrandAttrs>}
 */
export const NavbarBrand = {
  view(vnode) {
    const { className, ...rest } = vnode.attrs
    return m('a', {
      className: cx('navbar-brand', defaultStyles.brand, className),
      ...rest
    }, vnode.children)
  }
}

/**
 * NavbarLink component. Navigation item with `active` state (pill +
 * aria-current) and `disabled` (dimmed, no pointer).
 *
 * Same concept as Drawer conditioning Modal: NavbarLink is `Link` with
 * default properties from the navbar context — `noUnderline` forced (the
 * navbar never underlines) and the pill shape of the `link` slot. `color` and
 * `hover` are locked: inside the navbar the look is decided by the navbar, not the
 * link (using raw `Link` inside the navbar is out of recommendation).
 *
 * @type {import('mithril').Component<import('./index').NavbarLinkAttrs>}
 */
export const NavbarLink = {
  view(vnode) {
    const { active, disabled, color, hover, noUnderline, className, ...rest } = vnode.attrs
    const styles = navbar({ active, disabled })
    return m(Link, {
      noUnderline: true,
      className: cx('navbar-link', styles.link, className),
      'aria-current': active ? 'page' : undefined,
      'aria-disabled': disabled ? 'true' : undefined,
      ...rest
    }, vnode.children)
  }
}

/**
 * NavbarMenu component. Horizontal group of NavbarLinks (slot `menu`),
 * visible on desktop and hidden <768px — the library's mobile pattern is the
 * Drawer + NavbarToggle (JS-first).
 *
 * @type {import('mithril').Component<import('./index').NavbarMenuAttrs>}
 */
export const NavbarMenu = {
  view(vnode) {
    const { className, ...rest } = vnode.attrs
    return m('div', { className: cx('navbar-menu', defaultStyles.menu, className), ...rest }, vnode.children)
  }
}

/**
 * NavbarToggle component. Navbar hamburger (mobile only): square ghost
 * button whose icon alternates Menu/X according to `open`. Stateless — the consumer
 * controls `open` and `onclick` (e.g. to open a Drawer).
 *
 * @type {import('mithril').Component<import('./index').NavbarToggleAttrs>}
 */
export const NavbarToggle = {
  view(vnode) {
    const { open, className, ...rest } = vnode.attrs
    return m(Button, {
      variant: 'ghost',
      square: true,
      className: cx('navbar-toggle', defaultStyles.toggle, className),
      'aria-expanded': open ? 'true' : 'false',
      'aria-label': 'Toggle navigation',
      ...rest
    }, m(open ? X : MenuIcon, { size: 20 }))
  }
}
