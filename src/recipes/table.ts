import { defineSlotRecipe  , defineRecipe } from '@pandacss/dev'

export const tableRecipe = defineSlotRecipe({
  className : 'table',
  slots: ['table', 'row', 'data'],
  base: {
    table: {
      fontSize: 'token(fontSizes.md)',
      position: 'relative',
      width: '100%',
      borderCollapse: 'separate',
      borderSpacing: '0',
      textAlign: 'left',
      borderRadius: 'var(--radius-box)',

      // Sortable column (data-driven mode): cursor + spaced icon.
      '& :where(th.sortable)': {
        cursor: 'pointer',
        userSelect: 'none',
        '& svg': { marginInlineStart: 'token(spacing.1)', opacity: '0.5' },
        '&:hover svg': { opacity: '1' },
      },
      // Column with active sort: highlighted header.
      '& :where(th[aria-sort])': {
        color: 'base-content',
        '& svg': { opacity: '1' },
      },

      '& :where(th, td)': {
        paddingInline: 'token(spacing.4)',
        paddingBlock: 'token(spacing.3)',
        verticalAlign: 'middle',
      },
      '& :where(thead, tfoot)': {
        color: 'color-mix(in oklab, token(colors.base-content) 60%, transparent)',
        whiteSpace: 'nowrap',
        fontSize: 'token(fontSizes.md)',
        fontWeight: 'token(fontWeights.semibold)',
      },
      '& :where(tfoot tr:first-child :is(td, th))': {
        borderTop: 'var(--border, 1px) solid color-mix(in oklab, token(colors.base-content) 5%, transparent)',
      },
      '& :where(thead tr :is(td, th), tbody tr:not(:last-child) :is(td, th))': {
        borderBottom: 'var(--border, 1px) solid color-mix(in oklab, token(colors.base-content) 5%, transparent)',
      },
      // Loading cells: the base Skeleton is a block with no dimension;
      // the cell sizes it like a line of text (1em) so it is visible.
      '& .table-cell-loading .skeleton': {
        height: '1em',
        width: '100%',
        borderRadius: '0.25em',
      },
    },
    row: {},
    // Data-driven mode wrapper: the pagination lives inside, spaced and
    // right-aligned (it appears on its own when there is more than one page).
    data: {
      width: '100%',
      '& > .pagination': {
        marginTop: 'token(spacing.4)',
        justifyContent: 'flex-end',
      },
      // Bottom bar with the rows-per-page selector (pageSizeOptions) +
      // Pagination: grouped on the right, the selector floats to the left
      // of the pagination.
      '& > .table-pagination-bar': {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        gap: 'token(spacing.3)',
        marginTop: 'token(spacing.4)',
        flexWrap: 'wrap',
      },
      '& .table-page-size': {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 'token(spacing.2)',
        fontSize: 'token(fontSizes.sm)',
        color: 'color-mix(in oklab, token(colors.base-content) 60%, transparent)',
      },
    },
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
          '& :not(thead, tfoot) tr': { fontSize: 'token(fontSizes.md)' },
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
          '& tbody tr:where(:nth-child(even))': { backgroundColor: 'base-200' },
        },
      },
    },
    // Table with a full grid: outer border + vertical dividers between
    // columns (the horizontal separators are already in the base).
    bordered: {
      true: {
        table: {
          border: '1px solid color-mix(in oklab, token(colors.base-content) 8%, transparent)',
          '& :where(th, td) + :where(th, td)': {
            borderInlineStart: '1px solid color-mix(in oklab, token(colors.base-content) 5%, transparent)',
          },
        },
      },
    },
    pinRows: {
      true: {
        table: {
          '& :where(thead tr)': { backgroundColor: 'base-100', position: 'sticky', top: '0', zIndex: '1' },
          '& :where(tfoot tr)': { backgroundColor: 'base-100', position: 'sticky', bottom: '0', zIndex: '1' },
        },
      },
    },
    // Sticky header: only the thead is pinned to the top inside the
    // scrollable container (pair with TableContainer/Table `maxHeight`). Sticky at
    // the cell level (th) — MUI pattern, more compatible than on `thead`.
    stickyHeader: {
      true: {
        table: {
          '& :where(thead th)': {
            position: 'sticky',
            top: '0',
            zIndex: '1',
            backgroundColor: 'base-100',
          },
        },
      },
    },
    pinCols: {
      true: {
        table: {
          '& :where(tr th)': { backgroundColor: 'base-100', position: 'sticky', insetInlineStart: '0', insetInlineEnd: '0' },
        },
      },
    },
    hover: {
      true: {
        row: {
          '&:hover': { backgroundColor: 'base-200' },
        },
      },
    },
  },
  defaultVariants: {
    size: 'md',
  },
})



export const tableOverflowRecipe = defineRecipe({
  className : 'table-overflow',
  // Both axes: without `maxHeight` the vertical one does not scroll (the content fits);
  // with `maxHeight` (a TableContainer prop) vertical scrolling appears.
  base: { overflow: 'auto' },
})
