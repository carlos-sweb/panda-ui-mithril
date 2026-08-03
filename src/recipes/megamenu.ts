import { sva } from '../../styled-system/css'

export const megamenu = sva({
  slots: ['megamenu', 'item', 'trigger', 'panel', 'active'],
  base: {
    megamenu: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      gap: 'token(spacing.1)',
      '--mm-size': 'token(spacing.10)',
      '--mm-p': 'token(spacing.4)',
    },
    item: {
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
    trigger: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      gap: 'token(spacing.3)',
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
        backgroundColor: 'color-mix(in oklab, token(colors.base-content) 10%, transparent)',
      },
    },
    panel: {
      borderWidth: 'var(--border, 1px)',
      borderStyle: 'solid',
      borderColor: 'token(colors.base-300)',
      borderRadius: 'var(--radius-box)',
      backgroundColor: 'token(colors.base-100)',
      boxShadow: '0 10px 25px color-mix(in oklab, black 20%, transparent)',
      padding: 'token(spacing.4)',
      minWidth: 'token(spacing.64)',
    },
    active: {
      position: 'absolute',
      inset: '0',
      pointerEvents: 'none',
      borderRadius: 'var(--radius-field)',
      backgroundColor: 'color-mix(in oklab, token(colors.base-content) 10%, transparent)',
    },
  },
  variants: {
    size: {
      xs: { megamenu: { '--mm-size': 'token(spacing.6)', '--mm-p': 'token(spacing.2)', fontSize: 'token(fontSizes.xs)' } },
      sm: { megamenu: { '--mm-size': 'token(spacing.8)', '--mm-p': 'token(spacing.3)', fontSize: 'token(fontSizes.sm)' } },
      md: { megamenu: { '--mm-size': 'token(spacing.10)', '--mm-p': 'token(spacing.4)', fontSize: 'token(fontSizes.base)' } },
      lg: { megamenu: { '--mm-size': 'token(spacing.12)', '--mm-p': 'token(spacing.5)', fontSize: 'token(fontSizes.xl)' } },
      xl: { megamenu: { '--mm-size': 'token(spacing.14)', '--mm-p': 'token(spacing.6)', fontSize: 'token(fontSizes.3xl)' } },
    },
    vertical: {
      true: { megamenu: { flexDirection: 'column', alignItems: 'stretch', width: '100%' } },
    },
    active: {
      true: {
        trigger: {
          '&:after': { rotate: '45deg', opacity: '0.5' },
        },
      },
    },
    chevron: {
      true: {
        trigger: {
          '&:after': {
            content: '""',
            display: 'block',
            width: 'token(spacing.1.5)',
            height: 'token(spacing.1.5)',
            boxShadow: 'inset 2px 2px',
            rotate: '-135deg',
            opacity: '0.25',
            transitionProperty: 'rotate, opacity',
            transitionDuration: '0.2s',
          },
        },
      },
    },
  },
  defaultVariants: {
    size: 'md',
  },
})
