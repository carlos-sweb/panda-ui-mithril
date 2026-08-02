import { cva } from '../../styled-system/css'

const itemSelector = '& > li:not(.menu-title) > a, & > li:not(.menu-title) > .menu-dropdown-toggle'

export const menuStyles = cva({
  base: {
    display: 'inline-flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    alignItems: 'stretch',
    width: 'fit-content',
    padding: '0.5rem',
    gap :'0.25rem',
    fontSize: '0.875rem',    

    '& > li': {
      position: 'relative',
      display: 'flex',
      flexShrink: '0',
      flexDirection: 'column',
      flexWrap: 'wrap',
      alignItems: 'stretch',
    },
    '& > li.menu-disabled': {
      color: 'color-mix(in oklab, var(--colors-base-content) 20%, transparent)',
      pointerEvents: 'none',
    },
    [itemSelector]: {
      display: 'grid',
      gridAutoFlow: 'column',
      gridAutoColumns: 'minmax(auto, max-content) auto max-content',
      alignItems: 'center',
      justifyContent: 'start',
      gap: '0.5rem',
      textAlign: 'start',
      borderRadius: 'var(--radius-field)',
      paddingInline: '0.75rem',
      paddingBlock: '0.375rem',
      textDecoration: 'none',
      color: 'inherit',
      cursor: 'pointer',
      userSelect: 'none',
      transitionProperty: 'color, background-color, box-shadow',
      transitionDuration: '0.2s',
      '&:hover': {
        backgroundColor: 'color-mix(in oklab, var(--colors-base-content) 10%, transparent)',
      },
      '&.menu-active': {
        backgroundColor: 'var(--colors-neutral)',
        color: 'var(--colors-neutral-content)',
      },
    },
    '& .menu-title': {
      color: 'color-mix(in oklab, var(--colors-base-content) 40%, transparent)',
      paddingInline: '0.75rem',
      paddingBlock: '0.5rem',
      fontSize: '0.875rem',
      fontWeight: '600',
    },
    '& .menu-dropdown': {
      position: 'relative',
      marginInlineStart: '1rem',
      paddingInlineStart: '0.5rem',
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
      xs: { fontSize: '0.6875rem', [itemSelector]: { paddingInline: '0.5rem', paddingBlock: '0.25rem', fontSize: '0.6875rem' } },
      sm: { fontSize: '0.75rem', [itemSelector]: { paddingInline: '0.625rem', paddingBlock: '0.25rem', fontSize: '0.75rem' } },
      md: { fontSize: '0.875rem', [itemSelector]: { paddingInline: '0.75rem', paddingBlock: '0.375rem', fontSize: '0.875rem' } },
      lg: { fontSize: '1.125rem', [itemSelector]: { paddingInline: '1rem', paddingBlock: '0.375rem', fontSize: '1.125rem' } },
      xl: { fontSize: '1.375rem', [itemSelector]: { paddingInline: '1.25rem', paddingBlock: '0.375rem', fontSize: '1.375rem' } },
    },
  },
  defaultVariants: {
    size: 'md',
  },
})
