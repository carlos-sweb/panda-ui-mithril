import { cva } from '../../styled-system/css'

// Real daisyUI drives this with CSS Anchor Positioning (anchor-name,
// position-area, anchor()) plus the Popover API and long :has() chains to
// track which trigger is hovered — very new, narrow browser support, and
// exactly the kind of fragile CSS-only trick this project prefers to avoid
// (see js-over-daisyui-purity memory). Ported as a conventional hover/focus
// dropdown instead: each MegamenuItem is its own position:relative wrapper
// with its panel positioned directly beneath it — no anchor-positioning
// needed. Also dropped: the sliding "active" highlight that tracks the
// hovered trigger's exact bounding box (would need JS rect-tracking per
// mouseover) in favor of a plain per-trigger hover background — still marks
// the active item, just doesn't animate a shared highlight between them.
export const megamenuStyles = cva({
  base: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    gap: '0.25rem',
    '--mm-size': '2.5rem',
    '--mm-p': '1rem',
  },
  variants: {
    size: {
      xs: { '--mm-size': '1.5rem', '--mm-p': '0.5rem', fontSize: '0.6875rem' },
      sm: { '--mm-size': '2rem', '--mm-p': '0.75rem', fontSize: '0.75rem' },
      md: { '--mm-size': '2.5rem', '--mm-p': '1rem', fontSize: '0.875rem' },
      lg: { '--mm-size': '3rem', '--mm-p': '1.25rem', fontSize: '1.125rem' },
      xl: { '--mm-size': '3.5rem', '--mm-p': '1.5rem', fontSize: '1.375rem' },
    },
    vertical: {
      true: { flexDirection: 'column', alignItems: 'stretch', width: '100%' },
    },
  },
})

export const megamenuItemStyles = cva({
  base: {
    position: 'relative',

    '& > .megamenu-panel': {
      position: 'absolute',
      top: 'calc(100% + 0.25rem)',
      insetInlineStart: '0',
      zIndex: '20',
      opacity: '0',
      visibility: 'hidden',
      translate: '0 -0.5rem',
      scale: '0.98',
      pointerEvents: 'none',
      transitionProperty: 'opacity, translate, scale, visibility',
      transitionDuration: '0.2s',
      transitionTimingFunction: 'ease-out',
    },
    '&:hover > .megamenu-panel, &:focus-within > .megamenu-panel': {
      opacity: '1',
      visibility: 'visible',
      translate: '0 0',
      scale: '1',
      pointerEvents: 'auto',
    },
  },
})

export const megamenuTriggerStyles = cva({
  base: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    height: 'var(--mm-size)',
    paddingInline: 'var(--mm-p)',
    fontSize: 'inherit',
    borderRadius: 'var(--radius-field)',
    cursor: 'pointer',
    background: 'none',
    border: 'none',
    color: 'inherit',
    fontFamily: 'inherit',
    transitionProperty: 'background-color, color',
    transitionDuration: '0.2s',

    '&:hover, &:focus-visible': {
      backgroundColor: 'color-mix(in oklab, var(--colors-base-content) 10%, transparent)',
    },
  },
  variants: {
    active: {
      true: {
        '&:after': { rotate: '45deg', opacity: '0.5' },
      },
    },
    chevron: {
      true: {
        '&:after': {
          content: '""',
          display: 'block',
          width: '0.375rem',
          height: '0.375rem',
          boxShadow: 'inset 2px 2px',
          rotate: '-135deg',
          opacity: '0.25',
          transitionProperty: 'rotate, opacity',
          transitionDuration: '0.2s',
        },
      },
    },
  },
})

export const megamenuPanelStyles = cva({
  base: {
    borderWidth: 'var(--border, 1px)',
    borderStyle: 'solid',
    borderColor: 'var(--colors-base-300)',
    borderRadius: 'var(--radius-box)',
    backgroundColor: 'var(--colors-base-100)',
    boxShadow: '0 10px 25px color-mix(in oklab, black 20%, transparent)',
    padding: '1rem',
    minWidth: '16rem',
  },
})

export const megamenuActiveStyles = cva({
  base: {
    position: 'absolute',
    inset: '0',
    pointerEvents: 'none',
    borderRadius: 'var(--radius-field)',
    backgroundColor: 'color-mix(in oklab, var(--colors-base-content) 10%, transparent)',
  },
})
