import { cva } from '../../styled-system/css'

export const textareaStyles = cva({
  base: {
    display: 'block',
    width: '100%',
    fontSize: 'sm',
    minH: '5rem',
    p: '1rem',
    borderWidth: '1px',
    borderColor: 'base-300',
    bg: 'transparent',
    rounded: 'field',
    outline: 'none',
    transition: 'colors 0.2s',
    _focus: { borderColor: 'base-content/20', ring: '2px', ringOffset: '2px', ringColor: 'base-content/20' },
    _placeholder: { color: 'base-content/35' },
    _disabled: { opacity: '0.5', cursor: 'not-allowed' },
    resize: 'vertical',
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
      xs: { minH: '3rem', px: '0.75rem', py: '0.5rem', text: 'xs' },
      sm: { minH: '4rem', px: '0.75rem', py: '0.625rem', text: 'sm' },
      md: { minH: '5rem', px: '1rem', py: '0.75rem', text: 'sm' },
      lg: { minH: '6.5rem', px: '1rem', py: '1rem', text: 'lg' },
      xl: { minH: '8rem', px: '1rem', py: '1.25rem', text: 'xl' },
    },
    ghost: {
      true: { borderWidth: '0', bg: 'transparent' },
    },
  },
})
