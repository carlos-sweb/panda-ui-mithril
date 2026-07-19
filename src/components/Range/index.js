import m from 'mithril'
import { cva } from '../../../styled-system/css'
import { cx } from '../../utils/cx'

const rangeStyles = cva({
  base: {
    display: 'block',
    width: '100%',
    h: '2',
    rounded: 'full',
    bg: 'base-content/20',
    outline: 'none',
    appearance: 'none',
    cursor: 'pointer',
    _before: {
      content: '""',
      display: 'block',
      h: '2',
      rounded: 'full',
      bg: 'currentColor',
    },
    _disabled: { opacity: '0.5', cursor: 'not-allowed' },
  },
  variants: {
    color: {
      primary: { color: 'primary' },
      secondary: { color: 'secondary' },
      accent: { color: 'accent' },
      info: { color: 'info' },
      success: { color: 'success' },
      warning: { color: 'warning' },
      error: { color: 'error' },
    },
    size: {
      xs: { h: '1', _before: { h: '1' } },
      sm: { h: '1.5', _before: { h: '1.5' } },
      md: { h: '2', _before: { h: '2' } },
      lg: { h: '2.5', _before: { h: '2.5' } },
      xl: { h: '3', _before: { h: '3' } },
    },
    vertical: {
      true: { writingMode: 'vertical-lr', direction: 'rtl', h: '32', w: '2' },
    },
  },
})

export const Range = {
  view(vnode) {
    const { color, size, vertical, className, ...rest } = vnode.attrs

    return m('input', {
      type: 'range',
      className: cx('range', rangeStyles({ color, size, vertical }), className),
      ...rest
    })
  }
}
