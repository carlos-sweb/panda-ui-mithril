import m from 'mithril'
import { cva } from '../../styled-system/css'
import { cx } from '../../utils/cx'

const inputStyles = cva({
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
    transition: 'colors 0.2s',
    _focus: { borderColor: 'base-content/20', ring: '2px', ringOffset: '2px', ringColor: 'base-content/20' },
    _placeholder: { color: 'base-content/35' },
    _disabled: { opacity: '0.5', cursor: 'not-allowed' },
  },
  variants: {
    color: {
      primary: { _focus: { borderColor: 'primary', ringColor: 'primary/20' } },
      secondary: { _focus: { borderColor: 'secondary', ringColor: 'secondary/20' } },
      accent: { _focus: { borderColor: 'accent', ringColor: 'accent/20' } },
      info: { _focus: { borderColor: 'info', ringColor: 'info/20' } },
      success: { _focus: { borderColor: 'success', ringColor: 'success/20' } },
      warning: { _focus: { borderColor: 'warning', ringColor: 'warning/20' } },
      error: { _focus: { borderColor: 'error', ringColor: 'error/20' } },
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

export const TextInput = {
  view(vnode) {
    const { color, size, ghost, className, ...rest } = vnode.attrs

    return m('input', {
      type: 'text',
      className: cx('input', inputStyles({ color, size, ghost }), className),
      ...rest
    })
  }
}
