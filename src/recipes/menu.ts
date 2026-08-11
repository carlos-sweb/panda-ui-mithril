import { cva } from '../../styled-system/css'

const itemSelector = '& > li:not(.menu-title) > a, & > li:not(.menu-title) > .menu-dropdown-toggle'

export const menuStyles = cva({
  base: {
    display: 'inline-flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    alignItems: 'stretch',
    width: 'fit-content',
    padding: 'token(spacing.2)',
    gap :'token(spacing.1)',
    fontSize: 'token(fontSizes.md)',    

    '& > li': {
      position: 'relative',
      display: 'flex',
      flexShrink: '0',
      flexDirection: 'column',
      flexWrap: 'wrap',
      alignItems: 'stretch',
    },
    '& > li.menu-disabled': {
      color: 'color-mix(in oklab, token(colors.base-content) 20%, transparent)',
      pointerEvents: 'none',
    },
    [itemSelector]: {
      display: 'grid',
      gridAutoFlow: 'column',
      gridAutoColumns: 'minmax(auto, max-content) auto max-content',
      alignItems: 'center',
      justifyContent: 'start',
      gap: 'token(spacing.2)',
      textAlign: 'start',
      borderRadius: 'var(--radius-field)',
      paddingInline: 'token(spacing.3)',
      paddingBlock: 'token(spacing.1.5)',
      textDecoration: 'none',
      color: 'inherit',
      cursor: 'pointer',
      userSelect: 'none',
      transitionProperty: 'color, background-color, box-shadow',
      transitionDuration: '0.2s',
      '&:hover': {
        backgroundColor: 'color-mix(in oklab, token(colors.base-content) 10%, transparent)',
      },
      '&.menu-active': {
        backgroundColor: 'neutral',
        color: 'neutral-content',
      },
    },
    '& .menu-title': {
      color: 'color-mix(in oklab, token(colors.base-content) 40%, transparent)',
      paddingInline: 'token(spacing.3)',
      paddingBlock: 'token(spacing.2)',
      fontSize: 'token(fontSizes.md)',
      fontWeight: 'token(fontWeights.semibold)',
    },
    '& .menu-dropdown': {
      position: 'relative',
      marginInlineStart: 'token(spacing.4)',
      paddingInlineStart: 'token(spacing.2)',
      whiteSpace: 'nowrap',
    },
  },
  variants: {
    horizontal: {
      true: {
        display: 'inline-flex',
        flexDirection: 'row',
        alignItems: 'center',
        '& > li': { flexDirection: 'row' },
      },
    },
    size: {
      xs: { fontSize: 'token(fontSizes.xs)', [itemSelector]: { paddingInline: 'token(spacing.2)', paddingBlock: 'token(spacing.1)', fontSize: 'token(fontSizes.xs)' } },
      sm: { fontSize: 'token(fontSizes.sm)', [itemSelector]: { paddingInline: 'token(spacing.2.5)', paddingBlock: 'token(spacing.1)', fontSize: 'token(fontSizes.sm)' } },
      md: { fontSize: 'token(fontSizes.md)', [itemSelector]: { paddingInline: 'token(spacing.3)', paddingBlock: 'token(spacing.1.5)', fontSize: 'token(fontSizes.md)' } },
      lg: { fontSize: 'token(fontSizes.xl)', [itemSelector]: { paddingInline: 'token(spacing.4)', paddingBlock: 'token(spacing.1.5)', fontSize: 'token(fontSizes.xl)' } },
      xl: { fontSize: 'token(fontSizes.3xl)', [itemSelector]: { paddingInline: 'token(spacing.5)', paddingBlock: 'token(spacing.1.5)', fontSize: 'token(fontSizes.3xl)' } },
    },
  },
  defaultVariants: {
    size: 'md',
  },
})
