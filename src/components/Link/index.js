import m from 'mithril'
import { link } from '../../../styled-system/recipes'
import { cx } from '../../../styled-system/css'

/**
 * Componente Link. Enlace de texto con variante de color; `hover: false`
 * muestra el subrayado solo al pasar el cursor y `noUnderline: true` lo
 * elimina por completo (útil en contextos como el navbar, donde NavbarLink
 * lo aplica como default — mismo concepto que Drawer condiciona Modal).
 *
 * @type {import('mithril').Component<import('./index').LinkAttrs>}
 */
export const Link = {
  view(vnode) {
    const { color, hover = true, noUnderline, className, ...rest } = vnode.attrs
    return m('a', {
      className: cx( link({ color, hover, noUnderline }), className),
      ...rest
    }, vnode.children)
  }
}
