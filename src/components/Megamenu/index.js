import m from 'mithril'
import { cva } from '../../styled-system/css'
import { cx } from '../../utils/cx'

const megamenuStyles = cva({
  base: {
    display: 'flex',
    flexDirection: 'column',
    p: '4',
    bg: 'base-100',
    rounded: 'box',
    shadow: 'lg',
  },
  variants: {
    size: {
      xs: { p: '2', text: 'xs' },
      sm: { p: '3', text: 'sm' },
      md: { p: '4', text: 'sm' },
      lg: { p: '6', text: 'md' },
      xl: { p: '8', text: 'lg' },
    },
    wide: { true: { w: 'full' } },
    full: { true: { w: 'full', maxW: '64rem' } },
    vertical: { true: { flexDirection: 'column' } },
  },
})

export const Megamenu = {
  view(vnode) {
    const { size, wide, full, vertical, className, children, ...rest } = vnode.attrs

    return m('div', {
      className: cx('megamenu', megamenuStyles({ size, wide, full, vertical }), className),
      ...rest
    }, children)
  }
}

export const MegamenuActive = {
  view(vnode) {
    const { className, ...rest } = vnode.attrs
    return m('span', { className: cx('megamenu-active', className), ...rest })
  }
}
