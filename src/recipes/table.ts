import { cva } from '../../styled-system/css'

export const tableStyles = cva({
  base: {
    fontSize: '0.875rem',
    position: 'relative',
    width: '100%',
    borderCollapse: 'separate',
    borderSpacing: '0',
    textAlign: 'left',
    borderRadius: 'var(--radius-box)',

    '& :where(th, td)': {
      paddingInline: '1rem',
      paddingBlock: '0.75rem',
      verticalAlign: 'middle',
    },
    '& :where(thead, tfoot)': {
      color: 'color-mix(in oklab, var(--colors-base-content) 60%, transparent)',
      whiteSpace: 'nowrap',
      fontSize: '0.875rem',
      fontWeight: '600',
    },
    '& :where(tfoot tr:first-child :is(td, th))': {
      borderTop: 'var(--border, 1px) solid color-mix(in oklab, var(--colors-base-content) 5%, transparent)',
    },
    '& :where(thead tr :is(td, th), tbody tr:not(:last-child) :is(td, th))': {
      borderBottom: 'var(--border, 1px) solid color-mix(in oklab, var(--colors-base-content) 5%, transparent)',
    },
  },
  variants: {
    size: {
      xs: {
        '& :not(thead, tfoot) tr': { fontSize: '0.6875rem' },
        '& :where(th, td)': { paddingInline: '0.5rem', paddingBlock: '0.25rem' },
      },
      sm: {
        '& :not(thead, tfoot) tr': { fontSize: '0.75rem' },
        '& :where(th, td)': { paddingInline: '0.75rem', paddingBlock: '0.5rem' },
      },
      md: {
        '& :not(thead, tfoot) tr': { fontSize: '0.875rem' },
        '& :where(th, td)': { paddingInline: '1rem', paddingBlock: '0.75rem' },
      },
      lg: {
        '& :not(thead, tfoot) tr': { fontSize: '1.125rem' },
        '& :where(th, td)': { paddingInline: '1.25rem', paddingBlock: '1rem' },
      },
      xl: {
        '& :not(thead, tfoot) tr': { fontSize: '1.375rem' },
        '& :where(th, td)': { paddingInline: '1.5rem', paddingBlock: '1.25rem' },
      },
    },
    zebra: {
      true: {
        '& tbody tr:where(:nth-child(even))': { backgroundColor: 'var(--colors-base-200)' },
      },
    },
    pinRows: {
      true: {
        '& :where(thead tr)': { backgroundColor: 'var(--colors-base-100)', position: 'sticky', top: '0', zIndex: '1' },
        '& :where(tfoot tr)': { backgroundColor: 'var(--colors-base-100)', position: 'sticky', bottom: '0', zIndex: '1' },
      },
    },
    pinCols: {
      true: {
        '& :where(tr th)': { backgroundColor: 'var(--colors-base-100)', position: 'sticky', insetInlineStart: '0', insetInlineEnd: '0' },
      },
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

export const tableRowStyles = cva({
  base: {},
  variants: {
    hover: {
      true: {
        '&:hover': { backgroundColor: 'var(--colors-base-200)' },
      },
    },
  },
})
