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
      neutral: { color: 'var(--colors-neutral)', '&:hover': { color: 'color-mix(in oklab, var(--colors-neutral) 80%, #000)' } },
      primary: { color: 'var(--colors-primary)', '&:hover': { color: 'color-mix(in oklab, var(--colors-primary) 80%, #000)' } },
      secondary: { color: 'var(--colors-secondary)', '&:hover': { color: 'color-mix(in oklab, var(--colors-secondary) 80%, #000)' } },
      accent: { color: 'var(--colors-accent)', '&:hover': { color: 'color-mix(in oklab, var(--colors-accent) 80%, #000)' } },
      info: { color: 'var(--colors-info)', '&:hover': { color: 'color-mix(in oklab, var(--colors-info) 80%, #000)' } },
      success: { color: 'var(--colors-success)', '&:hover': { color: 'color-mix(in oklab, var(--colors-success) 80%, #000)' } },
      warning: { color: 'var(--colors-warning)', '&:hover': { color: 'color-mix(in oklab, var(--colors-warning) 80%, #000)' } },
      error: { color: 'var(--colors-error)', '&:hover': { color: 'color-mix(in oklab, var(--colors-error) 80%, #000)' } },
    },
    // Matches daisyUI's `.link-hover` modifier: no underline until hovered.
    hover: {
      true: { textDecoration: 'none', _hover: { textDecoration: 'underline' } },
      false: {},
    },
  },
})
