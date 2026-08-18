import m from 'mithril'
import { megamenu } from '../../../styled-system/recipes'
import { cx } from '../../../styled-system/css'

/**
 * Resultado cacheado de `megamenu({})` — los subcomponentes sin variantes
 * reusan las mismas clases en cada render. Evita llamar al sva repetidamente.
 * @type {ReturnType<typeof megamenu>}
 */
const defaultStyles = megamenu({})

/**
 * Componente Megamenu. Barra de navegación con paneles desplegables que
 * se abren al hacer hover/focus sobre cada trigger. `size` controla la
 * altura y `vertical` apila los ítems en columna.
 *
 * @type {import('mithril').Component<import('./index').MegamenuAttrs>}
 */
export const Megamenu = {
  view(vnode) {
    const { size, vertical, className, ...rest } = vnode.attrs

    return m('nav', {
      className: cx('megamenu', megamenu({ size, vertical }).megamenu, className),
      ...rest
    }, vnode.children)
  }
}

/**
 * Componente MegamenuItem. Envuelve un trigger y su panel; al hacer hover o
 * focus sobre el ítem se muestra el panel asociado.
 *
 * @type {import('mithril').Component<import('./index').MegamenuItemAttrs>}
 */
export const MegamenuItem = {
  view(vnode) {
    const { className, ...rest } = vnode.attrs
    return m('div', { className: cx('megamenu-item', defaultStyles.item, className), ...rest }, vnode.children)
  }
}

/**
 * Componente MegamenuTrigger. Botón o enlace que abre el panel. Con `href`
 * renderiza un `<a>`, si no un `<button>`; `active` resalta el trigger y
 * `chevron` añade la flecha de desplegable.
 *
 * @type {import('mithril').Component<import('./index').MegamenuTriggerAttrs>}
 */
export const MegamenuTrigger = {
  view(vnode) {
    const { href, active, chevron = true, className, ...rest } = vnode.attrs

    return m(href ? 'a' : 'button', {
      type: href ? undefined : 'button',
      href,
      className: cx('megamenu-trigger', megamenu({ active, chevron }).trigger, className),
      ...rest
    }, vnode.children)
  }
}

/**
 * Componente MegamenuPanel. Contenido desplegable de un MegamenuItem,
 * posicionado de forma absoluta bajo el trigger.
 *
 * @type {import('mithril').Component<import('./index').MegamenuPanelAttrs>}
 */
export const MegamenuPanel = {
  view(vnode) {
    const { className, ...rest } = vnode.attrs
    return m('div', { className: cx('megamenu-panel', defaultStyles.panel, className), ...rest }, vnode.children)
  }
}

/**
 * Componente MegamenuActive. Capa decorativa que resalta el trigger activo.
 *
 * @type {import('mithril').Component<import('./index').MegamenuActiveAttrs>}
 */
export const MegamenuActive = {
  view(vnode) {
    const { className, ...rest } = vnode.attrs
    return m('span', { className: cx('megamenu-active', defaultStyles.active, className), ...rest })
  }
}
