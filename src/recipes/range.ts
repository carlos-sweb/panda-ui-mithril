import { cva } from '../../styled-system/css'

// Faithful to daisyUI's sizing/color/border-radius formulas, but simplified:
// real daisyUI paints the "filled" track portion via a container-query-sized
// box-shadow layer on the thumb (`--range-fill-x/y/spread`, `cqw`/`cqh` units).
// That trick needs `container-type` wired up the DOM tree, so this version
// uses a plain background-color thumb instead of the fill illusion.
export const rangeStyles = cva({
  base: {
    appearance: 'none',
    cursor: 'pointer',
    overflow: 'hidden',
    backgroundColor: 'transparent',
    verticalAlign: 'middle',
    border: 'none',
    width: 'clamp(3rem, 20rem, 100%)',
    '--range-thumb-size': '1.5rem',
    '--range-p': '0.25rem',
    height: 'var(--range-thumb-size)',
    borderRadius: 'calc(var(--radius-selector) + var(--range-p))',
    _focus: { outline: 'none' },
    '&:focus-visible': { outline: '2px solid', outlineOffset: '2px' },
    _disabled: { opacity: '0.3', cursor: 'not-allowed' },

    '&::-webkit-slider-runnable-track': {
      width: '100%',
      backgroundColor: 'color-mix(in oklab, currentColor 10%, transparent)',
      borderRadius: 'var(--radius-selector)',
      height: 'calc(var(--range-thumb-size) * 0.5)',
    },
    '&::-moz-range-track': {
      width: '100%',
      backgroundColor: 'color-mix(in oklab, currentColor 10%, transparent)',
      borderRadius: 'var(--radius-selector)',
      height: 'calc(var(--range-thumb-size) * 0.5)',
    },
    '&::-webkit-slider-thumb': {
      appearance: 'none',
      position: 'relative',
      boxSizing: 'border-box',
      borderRadius: 'calc(var(--radius-selector) + var(--range-p))',
      backgroundColor: 'var(--colors-base-100)',
      height: 'var(--range-thumb-size)',
      width: 'var(--range-thumb-size)',
      border: 'var(--range-p) solid currentColor',
      marginTop: 'calc(var(--range-thumb-size) * -0.25)',
    },
    '&::-moz-range-thumb': {
      position: 'relative',
      boxSizing: 'border-box',
      borderRadius: 'calc(var(--radius-selector) + var(--range-p))',
      backgroundColor: 'var(--colors-base-100)',
      height: 'var(--range-thumb-size)',
      width: 'var(--range-thumb-size)',
      border: 'var(--range-p) solid currentColor',
    },
  },
  variants: {
    color: {
      neutral: { color: 'var(--colors-neutral)' },
      primary: { color: 'var(--colors-primary)' },
      secondary: { color: 'var(--colors-secondary)' },
      accent: { color: 'var(--colors-accent)' },
      info: { color: 'var(--colors-info)' },
      success: { color: 'var(--colors-success)' },
      warning: { color: 'var(--colors-warning)' },
      error: { color: 'var(--colors-error)' },
    },
    size: {
      xs: { '--range-thumb-size': '1rem' },
      sm: { '--range-thumb-size': '1.25rem' },
      md: { '--range-thumb-size': '1.5rem' },
      lg: { '--range-thumb-size': '1.75rem' },
      xl: { '--range-thumb-size': '2rem' },
    },
    vertical: {
      true: {
        writingMode: 'vertical-lr',
        direction: 'rtl',
        width: 'var(--range-thumb-size)',
        height: 'clamp(3rem, 20rem, 100%)',
      },
    },
  },
})
