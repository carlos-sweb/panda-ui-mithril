import m from 'mithril'
import { kbdStyles } from '../../recipes/kbd'
import { cx } from '../../utils/cx'

/**
 * Componente Kbd. Representa una tecla del teclado (`<kbd>`), con tamaño
 * ajustable via `size`.
 *
 * @type {import('mithril').Component<import('./index').KbdAttrs>}
 */
export const Kbd = {
  view(vnode) {
    const { size, className, ...rest } = vnode.attrs

    return m('kbd', {
      className: cx('kbd', kbdStyles({ size }), className),
      ...rest
    }, vnode.children)
  }
}
