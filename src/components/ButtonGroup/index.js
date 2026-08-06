import m from 'mithril'
import { buttonGroupStyles } from '../../recipes/buttonGroup'
import { cx } from '../../utils/cx'

/**
 * ButtonGroup — agrupa botones horizontalmente unificando bordes.
 * Las variantes del grupo se propagan a los hijos si estos no las definen.
 *
 * @type {import('mithril').Component<import('./index').ButtonGroupAttrs>}
 */
export const ButtonGroup = {
  view(vnode) {
    const { color, variant, size, vertical, className, ...rest } = vnode.attrs

    return m('div', {
      className: cx('btn-group', buttonGroupStyles({ vertical }), className),
      ...rest,
    }, (Array.isArray(vnode.children) ? vnode.children : [vnode.children]).map((child) => {
      if (!child || typeof child === 'string' || typeof child === 'number') return child
      return m(child.tag, {
        ...child.attrs,
        color: child.attrs?.color || color,
        variant: child.attrs?.variant || variant,
        size: child.attrs?.size || size,
      }, child.children)
    }))
  }
}
