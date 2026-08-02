import { cva } from '../../styled-system/css'

export const modalStyles = cva({
  base: {
    position: 'fixed',
    inset: '0',
    margin: '0',
    padding: '0',
    width: '100%',
    height: '100%',
    maxWidth: 'none',
    maxHeight: 'none',
    border: 'none',
    color: 'inherit',
    backgroundColor: 'transparent',
    overflow: 'clip',
    zIndex: '999',

    '&::backdrop': {
      backgroundColor: 'color-mix(in oklab, black 40%, transparent)',
    },
    '&[open]': {
      display: 'grid',
      placeItems: 'center',
    },
    '& > .modal-box': {
      transitionProperty: 'translate, scale, opacity',
      transitionDuration: '0.2s',
      transitionTimingFunction: 'ease-out',
    },
  },
  variants: {
    position: {
      top: {
        '&[open]': { alignItems: 'start' },
        '& > .modal-box': {
          width: '100%',
          maxWidth: 'none',
          borderRadius: '0 0 var(--radius-box) var(--radius-box)',
        },
      },
      middle: {
        '&[open]': { alignItems: 'center' },
      },
      bottom: {
        '&[open]': { alignItems: 'end' },
        '& > .modal-box': {
          width: '100%',
          maxWidth: 'none',
          borderRadius: 'var(--radius-box) var(--radius-box) 0 0',
        },
      },
      start: {
        '&[open]': { justifyItems: 'start' },
        '& > .modal-box': {
          height: '100%',
          maxHeight: 'none',
          width: 'auto',
          borderRadius: '0 var(--radius-box) var(--radius-box) 0',
        },
      },
      end: {
        '&[open]': { justifyItems: 'end' },
        '& > .modal-box': {
          height: '100%',
          maxHeight: 'none',
          width: 'auto',
          borderRadius: 'var(--radius-box) 0 0 var(--radius-box)',
        },
      },
    },
  },
})

export const modalBoxStyles = cva({
  base: {
    position: 'relative',
    gridColumnStart: '1',
    gridRowStart: '1',
    backgroundColor: 'var(--colors-base-100)',
    width: '91.666667%',
    maxWidth: '32rem',
    maxHeight: '100vh',
    padding: '1.5rem',
    borderRadius: 'var(--radius-box)',
    boxShadow: '0 25px 50px -12px color-mix(in oklab, black 25%, transparent)',
    overflowY: 'auto',
  },
})

export const modalActionStyles = cva({
  base: {
    marginTop: '1.5rem',
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '0.5rem',
  },
})

export const modalBackdropStyles = cva({
  base: {
    position: 'absolute',
    inset: '0',
    gridColumnStart: '1',
    gridRowStart: '1',
    zIndex: '-1',
    color: 'transparent',
    cursor: 'pointer',
    border: 'none',
    background: 'none',
  },
})
