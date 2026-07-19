import m from 'mithril'
import { cva } from '../../../styled-system/css'
import { cx } from '../../utils/cx'

const fileInputStyles = cva({
  base: {
    display: 'block',
    width: '100%',
    fontSize: 'sm',
    h: '2.75rem',
    px: '1rem',
    borderWidth: '1px',
    borderColor: 'base-300',
    bg: 'transparent',
    rounded: 'field',
    outline: 'none',
    cursor: 'pointer',
    file: { borderRadius: 'inherit', border: 'none', fontSize: 'sm' },
    _focus: { borderColor: 'base-content/20' },
    _disabled: { opacity: '0.5', cursor: 'not-allowed' },
  },
  variants: {
    color: {
      primary: { _focus: { borderColor: 'primary' }, file: { color: 'primary' } },
      secondary: { _focus: { borderColor: 'secondary' }, file: { color: 'secondary' } },
      accent: { _focus: { borderColor: 'accent' }, file: { color: 'accent' } },
      info: { _focus: { borderColor: 'info' }, file: { color: 'info' } },
      success: { _focus: { borderColor: 'success' }, file: { color: 'success' } },
      warning: { _focus: { borderColor: 'warning' }, file: { color: 'warning' } },
      error: { _focus: { borderColor: 'error' }, file: { color: 'error' } },
    },
    size: {
      xs: { h: '1.75rem', px: '0.75rem', text: 'xs' },
      sm: { h: '2.25rem', px: '0.75rem', text: 'sm' },
      md: { h: '2.75rem', px: '1rem', text: 'sm' },
      lg: { h: '3.5rem', px: '1rem', text: 'lg' },
      xl: { h: '4.5rem', px: '1rem', text: 'xl' },
    },
    ghost: {
      true: { borderWidth: '0', bg: 'transparent' },
    },
  },
})

export const FileInput = {
  view(vnode) {
    const { color, size, ghost, className, ...rest } = vnode.attrs

    return m('input', {
      type: 'file',
      className: cx('file-input', fileInputStyles({ color, size, ghost }), className),
      ...rest
    })
  }
}
