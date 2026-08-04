import m from 'mithril'
import { navbar } from '../../recipes/navbar'
import { cx } from '../../utils/cx'

/**
 * Componente Navbar. Barra de navegación de tres zonas; los subcomponentes
 * NavbarStart/NavbarCenter/NavbarEnd se distribuyen con el slot correspondiente.
 *
 * @type {import('mithril').Component<import('./index').NavbarAttrs>}
 */
export const Navbar = {
  view(vnode) {
    const { className, ...rest } = vnode.attrs

    return m('div', {
      className: cx('navbar', defaultStyles.navbar, className),
      ...rest
    }, vnode.children)
  }
}

/**
 * Resultado cacheado de `navbar({})` — los subcomponentes no pasan variantes,
 * así que las clases son determinísticas. Evita llamar al sva en cada render.
 * @type {ReturnType<typeof navbar>}
 */
const defaultStyles = navbar({})

/**
 * Componente NavbarStart. Zona izquierda de la navbar.
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
 * Componente NavbarCenter. Zona central de la navbar.
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
 * Componente NavbarEnd. Zona derecha de la navbar.
 *
 * @type {import('mithril').Component<import('./index').NavbarEndAttrs>}
 */
export const NavbarEnd = {
  view(vnode) {
    const { className, ...rest } = vnode.attrs
    return m('div', { className: cx('navbar-end', defaultStyles.end, className), ...rest }, vnode.children)
  }
}
