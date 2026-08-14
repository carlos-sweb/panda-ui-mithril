import m from 'mithril'
import { join, joinItem } from '../../../styled-system/recipes'
import { cx } from '../../utils/cx'

/**
 * Componente Join. Agrupa elementos adyacentes con esquinas unificadas;
 * `vertical` los apila en columna.
 *
 * @type {import('mithril').Component<import('./index').JoinAttrs>}
 */
export const Join = {
  view(vnode) {
    const { vertical, className, ...rest } = vnode.attrs

    return m('div', {
      className: cx('join', join({ vertical }), className),
      ...rest
    }, vnode.children)
  }
}

/**
 * Elemento dentro de un Join, con los estilos de borde unificados.
 *
 * @type {import('mithril').Component<import('./index').JoinItemAttrs>}
 */
export const JoinItem = {
  view(vnode) {
    const { className, ...rest } = vnode.attrs

    return m('button', {
      className: cx('join-item', joinItem(), className),
      ...rest
    }, vnode.children)
  }
}
