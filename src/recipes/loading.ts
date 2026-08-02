import { cva } from '../../styled-system/css'

export const loadingStyles = cva({
  base: {
    display: 'inline-block',
    color: 'currentColor',
    pointerEvents: 'none',
    verticalAlign: 'middle',
    aspectRatio: '1 / 1',
    // daisyUI: width: calc(var(--size-selector, 0.25rem) * 6) — default (md) size
    width: '1.5rem',
  },
  variants: {
    variant: {
      spinner: {
        animation: 'spin 1s linear infinite',
      },
      dots: {
        display: 'inline-flex',
        gap: '0.25em',
        _before: { content: '""', display: 'block', w: '0.5em', h: '0.5em', borderRadius: '9999px', bg: 'currentColor', animation: 'pulse 1.5s ease-in-out infinite' },
        _after: { content: '""', display: 'block', w: '0.5em', h: '0.5em', borderRadius: '9999px', bg: 'currentColor', animation: 'pulse 1.5s ease-in-out 0.25s infinite' },
      },
      ring: {
        height: '100%',
        border: '3px solid currentColor',
        borderColor: 'currentcolor currentcolor transparent transparent',
        borderRadius: '9999px',
        animation: 'spin 1.2s linear infinite',
      },
      ball: {
        height: '100%',
        bg: 'currentColor',
        borderRadius: '9999px',
        animation: 'pulse 1s ease-in-out infinite',
      },
      bars: {
        display: 'inline-flex',
        gap: '0.125em',
        height: '100%',
        alignItems: 'end',
        _before: { content: '""', display: 'block', w: '0.25em', bg: 'currentColor', h: '40%', animation: 'pulse 1s ease-in-out infinite' },
        _after: { content: '""', display: 'block', w: '0.25em', bg: 'currentColor', h: '70%', animation: 'pulse 1s ease-in-out 0.15s infinite' },
      },
      infinity: {
        height: '66%',
        bg: 'currentColor',
        borderRadius: '9999px',
        position: 'relative',
        _before: {
          content: '""',
          position: 'absolute',
          inset: '0',
          borderRadius: 'inherit',
          bg: 'currentColor',
          animation: 'pulse 1.5s ease-in-out infinite',
        },
      },
    },
    size: {
      xs: { width: '1rem' },
      sm: { width: '1.25rem' },
      md: { width: '1.5rem' },
      lg: { width: '1.75rem' },
      xl: { width: '2rem' },
    },
  },
})
