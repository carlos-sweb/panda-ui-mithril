import m from 'mithril'
import { dividerPUM } from '../../../styled-system/recipes'
import { cx } from '../../utils/cx'

/**
 * Componente Divider. Separador horizontal o vertical (role="separator"),
 * con variante de color y `placement` para la etiqueta (start/end).
 *
 * @type {import('mithril').Component<import('./index').DividerAttrs>}
 */
export const Divider = {
  view(vnode) {
    const { color, direction, placement, className, ...rest } = vnode.attrs

    return m('div', {
      role: 'separator',
      className: cx('divider', dividerPUM({ color, direction, placement }), className),
      ...rest
    }, vnode.children)
  }
}
