import { cva } from '../../styled-system/css'

export const toastStyles = cva({
  base: {
    position: 'fixed',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    background: 'transparent',
    width: 'max-content',
    maxWidth: 'calc(100vw - 2rem)',
    zIndex: '999',
    translate: 'var(--toast-x, 0) var(--toast-y, 0)',
    '& > *': {
      animation: 'toast 0.25s ease-out',
    },
  },
  variants: {
    horizontal: {
      start: { insetInlineStart: '1rem', insetInlineEnd: 'auto', '--toast-x': '0' },
      center: { insetInlineStart: '50%', insetInlineEnd: '50%', '--toast-x': '-50%' },
      end: { insetInlineStart: 'auto', insetInlineEnd: '1rem', '--toast-x': '0' },
    },
    vertical: {
      top: { insetBlockStart: '1rem', insetBlockEnd: 'auto', '--toast-y': '0' },
      middle: { insetBlockStart: '50%', insetBlockEnd: 'auto', '--toast-y': '-50%' },
      bottom: { insetBlockStart: 'auto', insetBlockEnd: '1rem', '--toast-y': '0' },
    },
  },
  defaultVariants: {
    horizontal: 'end',
    vertical: 'bottom',
  },
})
