import { defineRecipe } from '@pandacss/dev'

export const toastRecipe = defineRecipe({
  className:'toast',
  base: {
    position: 'fixed',
    display: 'flex',
    flexDirection: 'column',
    gap: 'token(spacing.2)',
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
      start: { insetInlineStart: 'token(spacing.4)', insetInlineEnd: 'auto', '--toast-x': '0' },
      center: { insetInlineStart: '50%', insetInlineEnd: '50%', '--toast-x': '-50%' },
      end: { insetInlineStart: 'auto', insetInlineEnd: 'token(spacing.4)', '--toast-x': '0' },
    },
    vertical: {
      top: { insetBlockStart: 'token(spacing.4)', insetBlockEnd: 'auto', '--toast-y': '0' },
      middle: { insetBlockStart: '50%', insetBlockEnd: 'auto', '--toast-y': '-50%' },
      bottom: { insetBlockStart: 'auto', insetBlockEnd: 'token(spacing.4)', '--toast-y': '0' },
    },
  },
  defaultVariants: {
    horizontal: 'end',
    vertical: 'bottom',
  },
})
