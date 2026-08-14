import m from 'mithril'
import { badgeRecipe } from '../../recipes/badge'
import { cx } from '../../utils/cx'

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
        'badge',
        badgeRecipe({ color, variant, size }),
        className
      ),
      ...rest
    }, vnode.children)
  }
}
