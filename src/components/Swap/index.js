import m from 'mithril'
import { cva } from '../../styled-system/css'
import { cx } from '../../utils/cx'

const swapStyles = cva({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    position: 'relative',
    w: '5',
    h: '5',
  },
  variants: {
    style: {
      rotate: {},
      flip: {},
    },
  },
})

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
