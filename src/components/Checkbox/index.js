import m from 'mithril'
import { cva } from '../../styled-system/css'
import { cx } from '../../utils/cx'

const checkboxStyles = cva({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    rounded: 'md',
    borderWidth: '2px',
    borderColor: 'base-content/20',
    bg: 'transparent',
    transition: 'all 0.2s',
    _checked: { bg: 'currentColor', borderColor: 'currentColor' },
    _disabled: { opacity: '0.5', cursor: 'not-allowed' },
    _indeterminate: { bg: 'currentColor', borderColor: 'currentColor' },
    _before: {
      content: '""',
      display: 'block',
      w: '3',
      h: '3',
      clipPath: 'polygon(14% 44%, 0 65%, 50% 100%, 100% 16%, 80% 0%, 43% 62%)',
      transition: 'all 0.2s',
      opacity: '0',
      transform: 'scale(0)',
    },
    _checked_before: { opacity: '1', transform: 'scale(1)' },
  },
  variants: {
    color: {
      primary: { borderColor: 'primary', _checked: { bg: 'primary', borderColor: 'primary' } },
      secondary: { borderColor: 'secondary', _checked: { bg: 'secondary', borderColor: 'secondary' } },
      accent: { borderColor: 'accent', _checked: { bg: 'accent', borderColor: 'accent' } },
      info: { borderColor: 'info', _checked: { bg: 'info', borderColor: 'info' } },
      success: { borderColor: 'success', _checked: { bg: 'success', borderColor: 'success' } },
      warning: { borderColor: 'warning', _checked: { bg: 'warning', borderColor: 'warning' } },
      error: { borderColor: 'error', _checked: { bg: 'error', borderColor: 'error' } },
    },
    size: {
      xs: { w: '3', h: '3', _before: { w: '2.5', h: '2.5' } },
      sm: { w: '4', h: '4', _before: { w: '3', h: '3' } },
      md: { w: '5', h: '5', _before: { w: '3.5', h: '3.5' } },
      lg: { w: '6', h: '6', _before: { w: '4', h: '4' } },
      xl: { w: '8', h: '8', _before: { w: '5', h: '5' } },
    },
  },
})

export const Checkbox = {
  view(vnode) {
    const { color, size, checked, disabled, className, onchange, ...rest } = vnode.attrs

    return m('input', {
      type: 'checkbox',
      className: cx('checkbox', checkboxStyles({ color, size }), className),
      checked,
      disabled,
      onchange,
      ...rest
    })
  }
}
