import { cva } from '../../styled-system/css'

// Faithful to the original's sizing/color/border-radius formulas, but simplified:
// the original implementation paints the "filled" track portion via a container-query-sized
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
    '--range-thumb-size': 'token(spacing.6)',
    '--range-p': 'token(spacing.1)',
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
      backgroundColor: 'token(colors.base-100)',
      height: 'var(--range-thumb-size)',
      width: 'var(--range-thumb-size)',
      border: 'var(--range-p) solid currentColor',
      marginTop: 'calc(var(--range-thumb-size) * -0.25)',
    },
    '&::-moz-range-thumb': {
      position: 'relative',
      boxSizing: 'border-box',
      borderRadius: 'calc(var(--radius-selector) + var(--range-p))',
      backgroundColor: 'token(colors.base-100)',
      height: 'var(--range-thumb-size)',
      width: 'var(--range-thumb-size)',
      border: 'var(--range-p) solid currentColor',
    },
  },
  variants: {
    color: {
      neutral: { color: 'token(colors.neutral)' },
      primary: { color: 'token(colors.primary)' },
      secondary: { color: 'token(colors.secondary)' },
      accent: { color: 'token(colors.accent)' },
      info: { color: 'token(colors.info)' },
      success: { color: 'token(colors.success)' },
      warning: { color: 'token(colors.warning)' },
      error: { color: 'token(colors.error)' },
    },
    size: {
      xs: { '--range-thumb-size': 'token(spacing.4)' },
      sm: { '--range-thumb-size': 'token(spacing.5)' },
      md: { '--range-thumb-size': 'token(spacing.6)' },
      lg: { '--range-thumb-size': 'token(spacing.7)' },
      xl: { '--range-thumb-size': 'token(spacing.8)' },
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
  defaultVariants: {
    size: 'md',
  },
})
