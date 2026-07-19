import m from 'mithril'
import { cva } from '../../styled-system/css'
import { cx } from '../../utils/cx'

const joinStyles = cva({
  base: {
    display: 'inline-flex',
    overflow: 'hidden',
    rounded: 'field',
  },
  variants: {
    vertical: {
      true: { flexDirection: 'column' },
    },
  },
})

export const Join = {
  view(vnode) {
    const { vertical, className, children, ...rest } = vnode.attrs

    return m('div', {
      className: cx('join', joinStyles({ vertical }), className),
      ...rest
    }, children)
  }
}

export const JoinItem = {
  view(vnode) {
    const { className, children, ...rest } = vnode.attrs

    return m('button', {
      className: cx('join-item', className),
      ...rest
    }, children)
  }
}
