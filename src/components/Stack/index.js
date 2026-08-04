import m from 'mithril'
import { stackStyles } from '../../recipes/stack'
import { cx } from '../../utils/cx'

/**
 * Componente Stack. Apila capas superpuestas; `placement` controla hacia
 * dónde se desplaza cada capa (top, bottom, start, end).
 *
 * @type {import('mithril').Component<import('./index').StackAttrs>}
 */
export const Stack = {
  view(vnode) {
    const { placement, className, ...rest } = vnode.attrs

    return m('div', {
      className: cx(
        'stack',
        placement && `stack-${placement}`,
        stackStyles({ placement }),
        className
      ),
      ...rest
    }, vnode.children)
  }
}
