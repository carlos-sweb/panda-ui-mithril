import { defineSlotRecipe, defineRecipe } from '@pandacss/dev'

/**
 * Drawer — panel anchored to a screen edge that slides in/out on open/close.
 * Same mechanism as Modal (native dialog + JS exit bridge + per-position
 * @starting-style entrance), but with no "middle" position: it is always anchored to
 * start/end (width = --drawer-size) or top/bottom (height = --drawer-size).
 *
 * The size is communicated with the --drawer-size custom property: the `size` variant
 * defines it on the `drawer` slot (the presets) and the consumer can override it
 * with an arbitrary CSS value (e.g. size="55%") — the `box` slot only consumes it
 * (width for start/end, height for top/bottom depending on the position variant).
 */
export const drawerRecipe = defineSlotRecipe({
  className: 'drawer',
  slots: ['drawer', 'box', 'action', 'backdrop', 'header', 'body', 'footer'],
  base: {
    drawer: {
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
        backdropFilter: 'blur(2px)',
      },
      // Entrance: @starting-style supplies the pre-render state and the
      // transition into the [open] values runs on the first open render.
      '&[open]': {
        display: 'grid',
        placeItems: 'center',
        // The implicit row/column ALWAYS equals the dialog (minmax(0,1fr) =
        // the viewport's defined height/width, minimum 0): with bare `1fr` the
        // minimum is `auto` and the row grows with the content — the panel would
        // follow the content and DrawerBody (flex:1 + minHeight:0 + overflowY:auto)
        // would never get to scroll.
        gridAutoRows: 'minmax(0, 1fr)',
        gridAutoColumns: 'minmax(0, 1fr)',
        '& > .drawer-box': { opacity: '1' },
        '&::backdrop': { opacity: '1', transition: 'opacity 0.2s ease-out' },
      },
      '@starting-style': {
        '&[open] > .drawer-box': { opacity: '0' },
        '&[open]::backdrop': { opacity: '0' },
      },
      // Closed state without the JS bridge (native close via ESC) — instant.
      '&:not([open])': {
        '& > .drawer-box': { opacity: '0' },
        '&::backdrop': { opacity: '0' },
      },
      // Panel exit: the position overrides the keyframe name.
      // Default fallback (start) — the variants replace it.
      '&.drawer-closing > .drawer-box': {
        '@media (prefers-reduced-motion: no-preference)': {
          animation: 'drawer-exit-start 0.2s ease-in forwards',
        },
      },
      '&.drawer-closing::backdrop': {
        '@media (prefers-reduced-motion: no-preference)': {
          animation: 'modal-backdrop-exit 0.2s ease-in forwards',
        },
      },
      '@media (prefers-reduced-motion: reduce)': {
        '& > .drawer-box': { transition: 'none' },
        '&::backdrop': { transition: 'none' },
      },
    },
    box: {
      // The panel is intentionally square: a drawer sits flush against the screen
      // edge (standard pattern in MUI/Ant/Chakra/Mantine) — no inner
      // radius. If a consumer wants a radius, they add it via className.
      position: 'relative',
      gridColumnStart: '1',
      gridRowStart: '1',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: 'base-100',
      boxShadow: '0 25px 50px -12px color-mix(in oklab, black 25%, transparent)',
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
      display: 'flex',
      alignItems: 'center',
      gap: 'token(spacing.2)',
      paddingBlock: 'token(spacing.4)',
      paddingInline: 'token(spacing.6)',
      borderBottom: '1px solid token(colors.base-300)',
      fontSize: 'token(fontSizes.lg)',
      fontWeight: 'token(fontWeights.semibold)',
    },
    body: {
      flex: '1',
      minHeight: '0',
      paddingBlock: 'token(spacing.4)',
      paddingInline: 'token(spacing.6)',
      overflowY: 'auto',
    },
    footer: {
      display: 'flex',
      justifyContent: 'flex-end',
      gap: 'token(spacing.2)',
      paddingBlock: 'token(spacing.4)',
      paddingInline: 'token(spacing.6)',
      borderTop: '1px solid token(colors.base-300)',
    },
  },
  variants: {
    position: {
      top: {
        drawer: {
          '&[open]': { alignItems: 'start', justifyItems: 'stretch' },
          '& > .drawer-box': {
            width: '100%',
            height: 'var(--drawer-size, token(spacing.96))',
          },
          // The [open] transform MUST be the identity: if we only changed the
          // @starting-style, the transition would interpolate translateY(-100%) → scale(1).
          '&[open] > .drawer-box': { transform: 'translateY(0)' },
          '@starting-style': {
            '&[open] > .drawer-box': { opacity: '0', transform: 'translateY(-100%)' },
          },
          '&.drawer-closing > .drawer-box': {
            '@media (prefers-reduced-motion: no-preference)': {
              animation: 'drawer-exit-top 0.2s ease-in forwards',
            },
          },
        },
      },
      bottom: {
        drawer: {
          '&[open]': { alignItems: 'end', justifyItems: 'stretch' },
          '& > .drawer-box': {
            width: '100%',
            height: 'var(--drawer-size, token(spacing.96))',
          },
          '&[open] > .drawer-box': { transform: 'translateY(0)' },
          '@starting-style': {
            '&[open] > .drawer-box': { opacity: '0', transform: 'translateY(100%)' },
          },
          '&.drawer-closing > .drawer-box': {
            '@media (prefers-reduced-motion: no-preference)': {
              animation: 'drawer-exit-bottom 0.2s ease-in forwards',
            },
          },
        },
      },
      start: {
        drawer: {
          '&[open]': { justifyItems: 'start', alignItems: 'stretch' },
          '& > .drawer-box': {
            height: '100%',
            width: 'var(--drawer-size, token(spacing.96))',
          },
          '&[open] > .drawer-box': { transform: 'translateX(0)' },
          '@starting-style': {
            '&[open] > .drawer-box': { opacity: '0', transform: 'translateX(-100%)' },
          },
          '&.drawer-closing > .drawer-box': {
            '@media (prefers-reduced-motion: no-preference)': {
              animation: 'drawer-exit-start 0.2s ease-in forwards',
            },
          },
        },
      },
      end: {
        drawer: {
          '&[open]': { justifyItems: 'end', alignItems: 'stretch' },
          '& > .drawer-box': {
            height: '100%',
            width: 'var(--drawer-size, token(spacing.96))',
          },
          '&[open] > .drawer-box': { transform: 'translateX(0)' },
          '@starting-style': {
            '&[open] > .drawer-box': { opacity: '0', transform: 'translateX(100%)' },
          },
          '&.drawer-closing > .drawer-box': {
            '@media (prefers-reduced-motion: no-preference)': {
              animation: 'drawer-exit-end 0.2s ease-in forwards',
            },
          },
        },
      },
    },
    // The size variant lives on the `drawer` slot (not `box`): DrawerBox renders
    // `drawer({}).box` with no variants, so box-slot variant styles
    // would be dead code — same as in modal.
    size: {
      xs: { drawer: { '--drawer-size': 'token(spacing.64)' } },   // 16rem
      sm: { drawer: { '--drawer-size': 'token(spacing.80)' } },   // 20rem
      md: { drawer: { '--drawer-size': 'token(spacing.96)' } },   // 24rem
      lg: { drawer: { '--drawer-size': 'token(spacing.128)' } },  // 32rem
      xl: { drawer: { '--drawer-size': 'token(spacing.160)' } },  // 40rem
      full: { drawer: { '--drawer-size': '100%' } },
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

export const drawerCloseButtonRecipe = defineRecipe({
  className: 'btn-close-drawer',
  base: {
    position: 'absolute',
    top: '0.75rem',
    insetInlineEnd: '0.75rem',
    zIndex: '1',
  },
})
