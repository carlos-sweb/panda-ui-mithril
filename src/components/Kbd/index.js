import m from 'mithril'
import { cva } from '../../styled-system/css'
import { cx } from '../../utils/cx'

const kbdStyles = cva({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'monospace',
    fontWeight: '600',
    rounded: 'md',
    bg: 'base-content/10',
    color: 'base-content',
    borderWidth: '1px',
    borderColor: 'base-content/20',
    px: '0.25em',
  },
  variants: {
    size: {
      xs: { text: '2xs', h: '4', minW: '4', px: '0.125em' },
      sm: { text: 'xs', h: '5', minW: '5', px: '0.25em' },
      md: { text: 'sm', h: '6', minW: '6', px: '0.5em' },
      lg: { text: 'md', h: '7', minW: '7', px: '0.75em' },
      xl: { text: 'lg', h: '8', minW: '8', px: '1em' },
    },
  },
})

export const Kbd = {
  view(vnode) {
    const { size, className, children, ...rest } = vnode.attrs

    return m('kbd', {
      className: cx('kbd', kbdStyles({ size }), className),
      ...rest
    }, children)
  }
}
