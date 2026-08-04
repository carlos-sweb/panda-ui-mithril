import m from 'mithril'
import { selectStyles } from '../../recipes/select'
import { cx } from '../../utils/cx'

/**
 * Componente Select. Menú desplegable (`<select>`) con variantes de color,
 * tamaño y modo ghost. Las opciones se pasan como children (`<option>`).
 *
 * @type {import('mithril').Component<import('./index').SelectAttrs>}
 */
export const Select = {
  view(vnode) {
    const { color, size, ghost, className, ...rest } = vnode.attrs

    return m('select', {
      className: cx('select', selectStyles({ color, size, ghost }), className),
      ...rest
    }, vnode.children)
  }
}
