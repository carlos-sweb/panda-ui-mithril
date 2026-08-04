import { sva } from '../../styled-system/css'

export const modal = sva({
  slots: ['modal', 'box', 'action', 'backdrop', 'header', 'body', 'footer'],
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
      // Entrance: `@starting-style` supplies the pre-render state so the
      // transition into `[open]` values runs on the first open render.
      // Exit: `.modal-closing` class is added by a tiny JS bridge (animationend
      // listener) — the <dialog> top-layer exit is synchronous and cannot be
      // delayed by CSS alone, so a keyframe animation bridges the gap.
      '&[open]': {
        display: 'grid',
        placeItems: 'center',
        '& > .modal-box': {
          opacity: '1',
          transform: 'scale(1)',
        },
        '&::backdrop': {
          opacity: '1',
          transition: 'opacity 0.2s ease-out',
        },
      },
      '@starting-style': {
        '&[open] > .modal-box': {
          opacity: '0',
          transform: 'scale(0.95)',
        },
        '&[open]::backdrop': {
          opacity: '0',
        },
      },
      // Fallback closed state — when no JS bridge runs (e.g. dialog closed
      // natively by Escape before the re-render), the dialog closes instantly.
      '&:not([open])': {
        '& > .modal-box': {
          opacity: '0',
          transform: 'scale(0.95)',
        },
        '&::backdrop': {
          opacity: '0',
        },
      },
      // Exit animation — triggered by the imperative `modal-closing` class
      // that the JS bridge adds before calling dialog.close().
      '&.modal-closing > .modal-box': {
        '@media (prefers-reduced-motion: no-preference)': {
          animation: 'modal-exit 0.2s ease-in forwards',
        },
      },
      '&.modal-closing::backdrop': {
        '@media (prefers-reduced-motion: no-preference)': {
          animation: 'modal-backdrop-exit 0.2s ease-in forwards',
        },
      },
      '@media (prefers-reduced-motion: reduce)': {
        '& > .modal-box': { transition: 'none' },
        '&::backdrop': { transition: 'none' },
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
      transition: 'opacity 0.2s ease-out, transform 0.2s ease-out',
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
    header: {
      paddingBottom: 'token(spacing.4)',
      borderBottom: '1px solid token(colors.base-300)',
      fontSize: 'token(fontSizes.lg)',
      fontWeight: '600',
    },
    body: {
      paddingBlock: 'token(spacing.4)',
      flex: '1',
      overflowY: 'auto',
    },
    footer: {
      paddingTop: 'token(spacing.4)',
      borderTop: '1px solid token(colors.base-300)',
      display: 'flex',
      justifyContent: 'flex-end',
      gap: 'token(spacing.2)',
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
    // Size variant lives on the `modal` slot (not `box`) because ModalBox renders
    // `modal({}).box` with no variant args — box-slot variant styles are dead code.
    // The `<dialog>` carries the size variant class via `modal({ position, size }).modal`,
    // so descendant selectors on the modal slot are the only way to reach `.modal-box`.
    size: {
      xs: {
        modal: {
          '& > .modal-box': {
            maxWidth: 'token(spacing.80)',
          },
        },
      },
      sm: {
        modal: {
          '& > .modal-box': {
            maxWidth: 'token(spacing.96)',
          },
        },
      },
      md: {
        modal: {
          '& > .modal-box': {
            maxWidth: 'token(spacing.128)',
          },
        },
      },
      lg: {
        modal: {
          '& > .modal-box': {
            maxWidth: 'token(spacing.192)',
          },
        },
      },
    },
  },
})
