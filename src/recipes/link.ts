import { cva } from '../../styled-system/css'

export const linkStyles = cva({
  base: {
    cursor: 'pointer',
    textDecoration: 'underline',
    _focus: { outline: 'none' },
    '&:focus-visible': { outline: '2px solid currentColor', outlineOffset: '2px' },
  },
  variants: {
    color: {
      neutral: { color: 'neutral', '&:hover': { color: 'color-mix(in oklab, token(colors.neutral) 80%, #000)' } },
      primary: { color: 'primary', '&:hover': { color: 'color-mix(in oklab, token(colors.primary) 80%, #000)' } },
      secondary: { color: 'secondary', '&:hover': { color: 'color-mix(in oklab, token(colors.secondary) 80%, #000)' } },
      accent: { color: 'accent', '&:hover': { color: 'color-mix(in oklab, token(colors.accent) 80%, #000)' } },
      info: { color: 'info', '&:hover': { color: 'color-mix(in oklab, token(colors.info) 80%, #000)' } },
      success: { color: 'success', '&:hover': { color: 'color-mix(in oklab, token(colors.success) 80%, #000)' } },
      warning: { color: 'warning', '&:hover': { color: 'color-mix(in oklab, token(colors.warning) 80%, #000)' } },
      error: { color: 'error', '&:hover': { color: 'color-mix(in oklab, token(colors.error) 80%, #000)' } },
    },
    // Matches the original's `.link-hover` modifier: no underline until hovered.
    hover: {
      true: { textDecoration: 'none', _hover: { textDecoration: 'underline' } },
      false: {},
    },
  },
})
