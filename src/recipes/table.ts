import { sva } from '../../styled-system/css'

export const table = sva({
  slots: ['table', 'row'],
  base: {
    table: {
      fontSize: 'token(fontSizes.base)',
      position: 'relative',
      width: '100%',
      borderCollapse: 'separate',
      borderSpacing: '0',
      textAlign: 'left',
      borderRadius: 'var(--radius-box)',

      '& :where(th, td)': {
        paddingInline: 'token(spacing.4)',
        paddingBlock: 'token(spacing.3)',
        verticalAlign: 'middle',
      },
      '& :where(thead, tfoot)': {
        color: 'color-mix(in oklab, token(colors.base-content) 60%, transparent)',
        whiteSpace: 'nowrap',
        fontSize: 'token(fontSizes.base)',
        fontWeight: '600',
      },
      '& :where(tfoot tr:first-child :is(td, th))': {
        borderTop: 'var(--border, 1px) solid color-mix(in oklab, token(colors.base-content) 5%, transparent)',
      },
      '& :where(thead tr :is(td, th), tbody tr:not(:last-child) :is(td, th))': {
        borderBottom: 'var(--border, 1px) solid color-mix(in oklab, token(colors.base-content) 5%, transparent)',
      },
    },
    row: {},
  },
  variants: {
    size: {
      xs: {
        table: {
          '& :not(thead, tfoot) tr': { fontSize: 'token(fontSizes.xs)' },
          '& :where(th, td)': { paddingInline: 'token(spacing.2)', paddingBlock: 'token(spacing.1)' },
        },
      },
      sm: {
        table: {
          '& :not(thead, tfoot) tr': { fontSize: 'token(fontSizes.sm)' },
          '& :where(th, td)': { paddingInline: 'token(spacing.3)', paddingBlock: 'token(spacing.2)' },
        },
      },
      md: {
        table: {
          '& :not(thead, tfoot) tr': { fontSize: 'token(fontSizes.base)' },
          '& :where(th, td)': { paddingInline: 'token(spacing.4)', paddingBlock: 'token(spacing.3)' },
        },
      },
      lg: {
        table: {
          '& :not(thead, tfoot) tr': { fontSize: 'token(fontSizes.xl)' },
          '& :where(th, td)': { paddingInline: 'token(spacing.5)', paddingBlock: 'token(spacing.4)' },
        },
      },
      xl: {
        table: {
          '& :not(thead, tfoot) tr': { fontSize: 'token(fontSizes.3xl)' },
          '& :where(th, td)': { paddingInline: 'token(spacing.6)', paddingBlock: 'token(spacing.5)' },
        },
      },
    },
    zebra: {
      true: {
        table: {
          '& tbody tr:where(:nth-child(even))': { backgroundColor: 'token(colors.base-200)' },
        },
      },
    },
    pinRows: {
      true: {
        table: {
          '& :where(thead tr)': { backgroundColor: 'token(colors.base-100)', position: 'sticky', top: '0', zIndex: '1' },
          '& :where(tfoot tr)': { backgroundColor: 'token(colors.base-100)', position: 'sticky', bottom: '0', zIndex: '1' },
        },
      },
    },
    pinCols: {
      true: {
        table: {
          '& :where(tr th)': { backgroundColor: 'token(colors.base-100)', position: 'sticky', insetInlineStart: '0', insetInlineEnd: '0' },
        },
      },
    },
    hover: {
      true: {
        row: {
          '&:hover': { backgroundColor: 'token(colors.base-200)' },
        },
      },
    },
  },
  defaultVariants: {
    size: 'md',
  },
})
