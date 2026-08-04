import m from 'mithril'
import { maskStyles } from '../../recipes/mask'
import { cx } from '../../utils/cx'

/**
 * Componente Mask. Aplica una forma recortada (CSS mask) a una imagen.
 * `shape` elige la silueta (squircle, heart, hexagon, ...) y `half` muestra
 * solo la mitad 1 (izquierda) o 2 (derecha).
 *
 * @type {import('mithril').Component<import('./index').MaskAttrs>}
 */
export const Mask = {
  view(vnode) {
    const { shape, half, className, ...rest } = vnode.attrs

    return m('img', {
      className: cx('mask', maskStyles({ shape, half }), className),
      ...rest
    })
  }
}
