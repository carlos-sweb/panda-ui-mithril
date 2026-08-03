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
      neutral: { color: 'token(colors.neutral)', '&:hover': { color: 'color-mix(in oklab, token(colors.neutral) 80%, #000)' } },
      primary: { color: 'token(colors.primary)', '&:hover': { color: 'color-mix(in oklab, token(colors.primary) 80%, #000)' } },
      secondary: { color: 'token(colors.secondary)', '&:hover': { color: 'color-mix(in oklab, token(colors.secondary) 80%, #000)' } },
      accent: { color: 'token(colors.accent)', '&:hover': { color: 'color-mix(in oklab, token(colors.accent) 80%, #000)' } },
      info: { color: 'token(colors.info)', '&:hover': { color: 'color-mix(in oklab, token(colors.info) 80%, #000)' } },
      success: { color: 'token(colors.success)', '&:hover': { color: 'color-mix(in oklab, token(colors.success) 80%, #000)' } },
      warning: { color: 'token(colors.warning)', '&:hover': { color: 'color-mix(in oklab, token(colors.warning) 80%, #000)' } },
      error: { color: 'token(colors.error)', '&:hover': { color: 'color-mix(in oklab, token(colors.error) 80%, #000)' } },
    },
    // Matches the original's `.link-hover` modifier: no underline until hovered.
    hover: {
      true: { textDecoration: 'none', _hover: { textDecoration: 'underline' } },
      false: {},
    },
  },
})
