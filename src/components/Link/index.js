import m from 'mithril'
import { link } from '../../../styled-system/recipes'
import { cx } from '../../../styled-system/css'

/**
 * Componente Link. Enlace de texto con variante de color; `hover: false`
 * muestra el subrayado solo al pasar el cursor.
 *
 * @type {import('mithril').Component<import('./index').LinkAttrs>}
 */
export const Link = {
  view(vnode) {
    const { color, hover = true, className, ...rest } = vnode.attrs
    return m('a', {
      className: cx( link({ color, hover }), className),
      ...rest
    }, vnode.children)
  }
}
