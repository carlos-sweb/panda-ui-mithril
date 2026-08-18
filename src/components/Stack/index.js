import m from 'mithril'
import { stackPUM } from '../../../styled-system/recipes'
import { cx } from '../../../styled-system/css'

/**
 * Stack — apila hijos vertical u horizontalmente con gap configurable
 * y responsive. Inspirado en MUI/Chakra/Primer Stack.
 *
 * @type {import('mithril').Component<import('./index').StackAttrs>}
 */
export const Stack = {
  view(vnode) {
    const { direction, gap, align, justify, className, ...rest } = vnode.attrs

    return m('div', {
      className: cx(  stackPUM({ direction, gap, align, justify }), className ),
      ...rest,
    }, vnode.children)
  }
}
