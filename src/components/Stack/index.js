import m from 'mithril'
import { stackStyles } from '../../recipes/stack'
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
      className: cx('stack', stackStyles({ direction, gap, align, justify }), className),
      ...rest,
    }, vnode.children)
  }
}
