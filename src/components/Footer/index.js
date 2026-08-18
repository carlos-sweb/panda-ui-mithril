import m from 'mithril'
import { footer } from '../../../styled-system/recipes'
import { cx } from '../../../styled-system/css'

/**
 * Componente Footer. Pie de página en grid; `center` centra el contenido y
 * `horizontal`/`vertical` controlan la dirección del flujo.
 *
 * @type {import('mithril').Component<import('./index').FooterAttrs>}
 */
export const Footer = {
  view(vnode) {
    const { center, horizontal, vertical, className, ...rest } = vnode.attrs
    const direction = vertical ? 'vertical' : horizontal ? 'horizontal' : undefined

    return m('footer', {
      className: cx(
        'footer',
        center && 'footer-center',
        direction && `footer-${direction}`,
        footer({ center, direction }).footer,
        className
      ),
      ...rest
    }, vnode.children)
  }
}

/**
 * Resultado cacheado de `footer({})` — los subcomponentes no pasan variantes,
 * así que las clases son determinísticas. Evita llamar al sva en cada render.
 * @type {ReturnType<typeof footer>}
 */
const defaultStyles = footer({})

/**
 * Componente FooterTitle. Título en mayúsculas de una columna del footer
 * (slot `title` de la recipe).
 *
 * @type {import('mithril').Component<import('./index').FooterTitleAttrs>}
 */
export const FooterTitle = {
  view(vnode) {
    const { className, ...rest } = vnode.attrs
    return m('span', { className: cx('footer-title', defaultStyles.title, className), ...rest }, vnode.children)
  }
}
