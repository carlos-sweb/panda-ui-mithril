import m from 'mithril'
import { mask } from '../../../styled-system/recipes'
import { cx } from '../../../styled-system/css'

/**
 * Componente Mask. Aplica una forma recortada (CSS mask) a una imagen.
 * `shape` elige la silueta (squircle, heart, hexagon, ...), `half` muestra
 * solo la mitad 1 (izquierda) o 2 (derecha) y `size` fija las dimensiones
 * de la imagen (escala PumSize: xs..xl).
 *
 * @type {import('mithril').Component<import('./index').MaskAttrs>}
 */
export const Mask = {
  view(vnode) {
    const { shape, half, size, className, ...rest } = vnode.attrs

    return m('img', {
      className: cx('mask', mask({ shape, half, size }), className),
      ...rest
    })
  }
}
