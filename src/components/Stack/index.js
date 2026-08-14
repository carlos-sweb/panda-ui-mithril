import m from 'mithril'
import { stackRecipe } from '../../recipes/stack'
import { cx } from '../../utils/cx'

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
      className: cx('stack', stackRecipe({ direction, gap, align, justify }), className),
      ...rest,
    }, vnode.children)
  }
}
