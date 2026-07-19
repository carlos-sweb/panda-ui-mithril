import m from 'mithril'
import { cva } from '../../../styled-system/css'
import { cx } from '../../utils/cx'

const linkStyles = cva({
  base: {
    cursor: 'pointer',
    textDecoration: 'none',
    _hover: { textDecoration: 'underline' },
  },
  variants: {
    color: {
      neutral: { color: 'neutral' },
      primary: { color: 'primary' },
      secondary: { color: 'secondary' },
      accent: { color: 'accent' },
      info: { color: 'info' },
      success: { color: 'success' },
      warning: { color: 'warning' },
      error: { color: 'error' },
    },
    hover: {
      true: { _hover: { textDecoration: 'underline' } },
      false: { _hover: {} },
    },
  },
})

export const Link = {
  view(vnode) {
    const { color, hover = true, className, children, ...rest } = vnode.attrs

    return m('a', {
      className: cx('link', linkStyles({ color, hover }), className),
      ...rest
    }, children)
  }
}
