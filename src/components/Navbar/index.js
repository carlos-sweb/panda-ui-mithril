import m from 'mithril'
import { Menu as MenuIcon, X } from 'lucide-mithril'
import { navbar } from '../../../styled-system/recipes'
import { cx } from '../../../styled-system/css'
import { Button } from '../Button/index.jsx'
import { Link } from '../Link/index.js'

/**
 * Componente Navbar. Barra de navegación de tres zonas con variantes
 * profesionales (posición sticky/fixed, color semántico, tamaño, borde,
 * sombra, glass) y sub-componentes estratégicos: NavbarBrand (logo/título),
 * NavbarMenu + NavbarLink (grupo de links con estado activo) y NavbarToggle
 * (hamburguesa móvil, se empareja con el Drawer de la librería).
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

    // container: patrón Bootstrap — el contenido se centra con max-width
    // (--navbar-max-w, default 80rem). Las zonas quedan dentro del wrapper.
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
 * Resultado cacheado de `navbar({})` — subcomponentes sin variantes usan las
 * clases default. Evita llamar al sva en cada render.
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

/**
 * Componente NavbarBrand. Logo + título del sitio (patrón Bootstrap
 * `.navbar-brand`). Renderiza un `<a>`; `href` y `onclick` se
 * pasan por attrs.
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
 * Componente NavbarLink. Ítem de navegación con estado `active` (píldora +
 * aria-current) y `disabled` (atenuado, sin puntero).
 *
 * Mismo concepto que Drawer condiciona Modal: NavbarLink es `Link` con
 * propiedades por defecto del contexto navbar — `noUnderline` forzado (el
 * navbar nunca subraya) y la forma de píldora del slot `link`. `color` y
 * `hover` se bloquean: dentro del navbar el look lo decide el navbar, no el
 * link (usar `Link` crudo dentro del navbar es fuera de recomendación).
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
 * Componente NavbarMenu. Grupo horizontal de NavbarLinks (slot `menu`),
 * visible en desktop y oculto <768px — el patrón móvil de la librería es el
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
 * Componente NavbarToggle. Hamburguesa de la navbar (solo móvil): botón ghost
 * cuadrado cuyo icono alterna Menu/X según `open`. Stateless — el consumidor
 * controla `open` y `onclick` (p. ej. para abrir un Drawer).
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
