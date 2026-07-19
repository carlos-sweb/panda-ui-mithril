import m from 'mithril'
import { cva } from '../../../styled-system/css'
import { cx } from '../../utils/cx'

const progressStyles = cva({
  base: {
    display: 'block',
    width: '100%',
    h: '2',
    rounded: 'full',
    bg: 'base-content/20',
    overflow: 'hidden',
    appearance: 'none',
  },
  variants: {
    color: {
      primary: { accentColor: 'primary' },
      secondary: { accentColor: 'secondary' },
      accent: { accentColor: 'accent' },
      info: { accentColor: 'info' },
      success: { accentColor: 'success' },
      warning: { accentColor: 'warning' },
      error: { accentColor: 'error' },
    },
  },
})

export const Progress = {
  view(vnode) {
    const { color, value, max, className, ...rest } = vnode.attrs

    return m('progress', {
      className: cx('progress', progressStyles({ color }), className),
      value,
      max: max || 100,
      ...rest
    })
  }
}
