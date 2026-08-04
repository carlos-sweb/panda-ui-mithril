import m from 'mithril'
import { rangeStyles } from '../../recipes/range'
import { cx } from '../../utils/cx'

/**
 * Componente Range. Control deslizante (`<input type="range">`) con variantes
 * de color, tamaño y orientación vertical.
 *
 * @type {import('mithril').Component<import('./index').RangeAttrs>}
 */
export const Range = {
  view(vnode) {
    const { color, size, vertical, className, ...rest } = vnode.attrs

    return m('input', {
      type: 'range',
      className: cx('range', rangeStyles({ color, size, vertical }), className),
      ...rest
    })
  }
}
