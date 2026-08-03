import { sva } from '../../styled-system/css'

export const modal = sva({
  slots: ['modal', 'box', 'action', 'backdrop'],
  base: {
    modal: {
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
    box: {
      position: 'relative',
      gridColumnStart: '1',
      gridRowStart: '1',
      backgroundColor: 'token(colors.base-100)',
      width: '91.666667%',
      maxWidth: 'token(spacing.128)',
      maxHeight: '100vh',
      padding: 'token(spacing.6)',
      borderRadius: 'var(--radius-box)',
      boxShadow: '0 25px 50px -12px color-mix(in oklab, black 25%, transparent)',
      overflowY: 'auto',
    },
    action: {
      marginTop: 'token(spacing.6)',
      display: 'flex',
      justifyContent: 'flex-end',
      gap: 'token(spacing.2)',
    },
    backdrop: {
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
  },
  variants: {
    position: {
      top: {
        modal: {
          '&[open]': { alignItems: 'start' },
          '& > .modal-box': {
            width: '100%',
            maxWidth: 'none',
            borderRadius: '0 0 var(--radius-box) var(--radius-box)',
          },
        },
      },
      middle: {
        modal: { '&[open]': { alignItems: 'center' } },
      },
      bottom: {
        modal: {
          '&[open]': { alignItems: 'end' },
          '& > .modal-box': {
            width: '100%',
            maxWidth: 'none',
            borderRadius: 'var(--radius-box) var(--radius-box) 0 0',
          },
        },
      },
      start: {
        modal: {
          '&[open]': { justifyItems: 'start' },
          '& > .modal-box': {
            height: '100%',
            maxHeight: 'none',
            width: 'auto',
            borderRadius: '0 var(--radius-box) var(--radius-box) 0',
          },
        },
      },
      end: {
        modal: {
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
  },
})
