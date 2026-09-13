import m from 'mithril'
import { mask } from '../../../styled-system/recipes'
import { cx } from '../../../styled-system/css'

/**
 * Mask component. Applies a clipped shape (CSS mask) to an image.
 * `shape` picks the silhouette (squircle, heart, hexagon, ...), `half` shows
 * only half 1 (left) or 2 (right) and `size` sets the image's dimensions
 * (PumSize scale: xs..xl).
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
