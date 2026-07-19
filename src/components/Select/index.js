import m from 'mithril'
import { cva } from '../../../styled-system/css'
import { cx } from '../../utils/cx'

const selectStyles = cva({
  base: {
    display: 'block',
    width: '100%',
    fontSize: 'sm',
    h: '2.75rem',
    px: '1rem',
    pr: '2.5rem',
    borderWidth: '1px',
    borderColor: 'base-300',
    bg: 'transparent',
    rounded: 'field',
    outline: 'none',
    cursor: 'pointer',
    appearance: 'none',
    bgImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
    bgPosition: 'right 0.5rem center',
    bgRepeat: 'no-repeat',
    bgSize: '1.5em 1.5em',
    _focus: { borderColor: 'base-content/20' },
    _disabled: { opacity: '0.5', cursor: 'not-allowed' },
  },
  variants: {
    color: {
      primary: { _focus: { borderColor: 'primary' } },
      secondary: { _focus: { borderColor: 'secondary' } },
      accent: { _focus: { borderColor: 'accent' } },
      info: { _focus: { borderColor: 'info' } },
      success: { _focus: { borderColor: 'success' } },
      warning: { _focus: { borderColor: 'warning' } },
      error: { _focus: { borderColor: 'error' } },
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

export const Select = {
  view(vnode) {
    const { color, size, ghost, className, children, ...rest } = vnode.attrs

    return m('select', {
      className: cx('select', selectStyles({ color, size, ghost }), className),
      ...rest
    }, children)
  }
}
