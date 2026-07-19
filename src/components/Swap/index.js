import m from 'mithril'
import { swapStyles } from '../../recipes/swap'
import { cx } from '../../utils/cx'


export const Swap = {
  view(vnode) {
    const { active, style, className, on, off, children, ...rest } = vnode.attrs

    return m('label', {
      className: cx('swap', swapStyles({ style }), active && 'swap-active', className),
      ...rest
    }, [
      on && m('div', { className: 'swap-on' }, on),
      off && m('div', { className: 'swap-off' }, off),
      children,
    ])
  }
}
