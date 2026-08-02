import m from 'mithril'
import { stackStyles } from '../../recipes/stack'
import { cx } from '../../utils/cx'

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
