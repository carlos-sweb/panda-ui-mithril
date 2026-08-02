import m from 'mithril'
import { swapStyles } from '../../recipes/swap'
import { cx } from '../../utils/cx'


export const Swap = {
  view(vnode) {
    const { active, style, className, on, off, checked, onchange, ...rest } = vnode.attrs

    return m('label', {
      className: cx('swap', swapStyles({ style }), active && 'swap-active', className),
      ...rest
    }, [
      m('input', { type: 'checkbox', checked, onchange }),
      on && m('div', { className: 'swap-on' }, on),
      off && m('div', { className: 'swap-off' }, off),
      vnode.children,
    ])
  }
}
