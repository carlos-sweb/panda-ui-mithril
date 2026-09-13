import m from 'mithril'
import { buttonGroup } from '../../../styled-system/recipes'
import { cx } from '../../../styled-system/css'

/**
 * ButtonGroup — groups buttons horizontally with unified borders.
 * The group's variants propagate to the children unless they define their own.
 *
 * @type {import('mithril').Component<import('./index').ButtonGroupAttrs>}
 */
export const ButtonGroup = {
  view(vnode) {
    const { color, variant, size, vertical, borderWidth, className, ...rest } = vnode.attrs

    return m('div', {
      className: cx( buttonGroup({ vertical }), className),
      ...rest,
    }, (Array.isArray(vnode.children) ? vnode.children : [vnode.children]).map((child) => {
      if (!child || typeof child === 'string' || typeof child === 'number') return child
      return m(child.tag, {
        ...child.attrs,
        color: child.attrs?.color || color,
        variant: child.attrs?.variant || variant,
        size: child.attrs?.size || size,
        borderWidth: child.attrs?.borderWidth || borderWidth,
      }, child.children)
    }))
  }
}
