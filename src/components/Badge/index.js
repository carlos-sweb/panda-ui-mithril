import m from 'mithril'
import { badge } from '../../../styled-system/recipes'
import { cx } from '../../../styled-system/css'

/**
 * Componente Badge. Etiqueta pequeña para marcar estado, categoría o conteo,
 * con variantes de color, estilo (`outline`, `dash`, `soft`, `ghost`) y tamaño.
 *
 * @type {import('mithril').Component<import('./index').BadgeAttrs>}
 */
export const Badge = {
  view(vnode) {
    const { color, variant, size, className, ...rest } = vnode.attrs
    
    return m('span', {
      className: cx(
        badge({ color, variant, size }),
        className
      ),
      ...rest
    }, vnode.children)
  }
}
