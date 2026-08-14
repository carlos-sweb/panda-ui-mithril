import m from 'mithril'
import { statusRecipe } from '../../recipes/status'
import { cx } from '../../utils/cx'

/**
 * Componente Status. Punto indicador de estado con variante de color
 * y tamaño.
 *
 * @type {import('mithril').Component<import('./index').StatusAttrs>}
 */
export const Status = {
  view(vnode) {
    const { color, size, className, ...rest } = vnode.attrs

    return m('span', {
      className: cx('status', statusRecipe({ color, size }), className),
      ...rest
    })
  }
}
