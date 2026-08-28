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

      // Columna ordenable (modo data-driven): cursor + icono espaciado.
      '& :where(th.sortable)': {
        cursor: 'pointer',
        userSelect: 'none',
        '& svg': { marginInlineStart: 'token(spacing.1)', opacity: '0.5' },
        '&:hover svg': { opacity: '1' },
      },
      // Columna con orden activo: encabezado destacado.
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
      // Celdas de carga (loading): el Skeleton base es un bloque sin dimensión;
      // la celda lo dimensiona como línea de texto (1em) para que sea visible.
      '& .table-cell-loading .skeleton': {
        height: '1em',
        width: '100%',
        borderRadius: '0.25em',
      },
    },
    row: {},
    // Wrapper del modo data-driven: la paginación vive dentro, espaciada y
    // alineada a la derecha (aparece sola cuando hay más de una página).
    data: {
      width: '100%',
      '& > .pagination': {
        marginTop: 'token(spacing.4)',
        justifyContent: 'flex-end',
      },
      // Barra inferior con selector de filas por página (pageSizeOptions) +
      // Pagination: agrupados a la derecha, el selector flota a la izquierda
      // de la paginación.
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
    // Tabla con rejilla completa: borde exterior + divisores verticales entre
    // columnas (los separadores horizontales ya están en el base).
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
  base: { overflowX: 'auto' },
})
