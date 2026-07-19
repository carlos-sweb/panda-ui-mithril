import { cva } from '../../styled-system/css'

export const radioStyles = cva({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    rounded: 'full',
    borderWidth: '2px',
    borderColor: 'base-content/20',
    bg: 'transparent',
    transition: 'all 0.2s',
    _checked: { borderColor: 'currentColor' },
    _disabled: { opacity: '0.5', cursor: 'not-allowed' },
    _before: {
      content: '""',
      display: 'block',
      w: '2',
      h: '2',
      rounded: 'full',
      bg: 'currentColor',
      transition: 'all 0.2s',
      opacity: '0',
      transform: 'scale(0)',
    },
    // @ts-ignore - compound selector _checked + _before
    _checked_before: { opacity: '1', transform: 'scale(1)' },
  },
  variants: {
    color: {
      primary: { borderColor: 'primary', _checked: { borderColor: 'primary' } },
      secondary: { borderColor: 'secondary', _checked: { borderColor: 'secondary' } },
      accent: { borderColor: 'accent', _checked: { borderColor: 'accent' } },
      info: { borderColor: 'info', _checked: { borderColor: 'info' } },
      success: { borderColor: 'success', _checked: { borderColor: 'success' } },
      warning: { borderColor: 'warning', _checked: { borderColor: 'warning' } },
      error: { borderColor: 'error', _checked: { borderColor: 'error' } },
    },
    size: {
      xs: { w: '3', h: '3', _before: { w: '1.5', h: '1.5' } },
      sm: { w: '4', h: '4', _before: { w: '2', h: '2' } },
      md: { w: '5', h: '5', _before: { w: '2.5', h: '2.5' } },
      lg: { w: '6', h: '6', _before: { w: '3', h: '3' } },
      xl: { w: '8', h: '8', _before: { w: '4', h: '4' } },
    },
  },
})
