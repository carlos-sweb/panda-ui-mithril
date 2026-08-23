import { defineSlotRecipe } from '@pandacss/dev'

export const listRecipe = defineSlotRecipe({
  className : 'list',
  slots: ['list', 'row', 'col'],
  base: {
    list: {
      display: 'flex',
      flexDirection: 'column',
      fontSize: 'token(fontSizes.md)',

      '& > li:not(:last-child)': {
        position: 'relative',
        '&:after': {
          content: '""',
          position: 'absolute',
          insetInline: 'var(--radius-box)',
          bottom: '0',
          borderBottom: 'var(--border, 1px) solid color-mix(in oklab, token(colors.base-content) 5%, transparent)',
        },
      },
    },
    row: {
      '--list-grid-cols': 'minmax(0, auto) 1fr',
      position: 'relative',
      display: 'grid',
      gridAutoFlow: 'column',
      gridTemplateColumns: 'var(--list-grid-cols)',
      gap: 'token(spacing.4)',
      padding: 'token(spacing.4)',
      wordBreak: 'break-word',
      '& > *': { gridRowStart: '1' },

      // Fix del TODO: el radius va solo en los bordes visuales de la lista
      // (primera y última fila), no en todas las filas — antes el hover de
      // filas intermedias mostraba esquinas redondeadas flotando entre
      // separadores rectos. `:only-child` recibe ambos (todas las esquinas).
      '&:first-child': {
        borderStartStartRadius: 'var(--radius-box)',
        borderStartEndRadius: 'var(--radius-box)',
      },
      '&:last-child': {
        borderEndStartRadius: 'var(--radius-box)',
        borderEndEndRadius: 'var(--radius-box)',
      },

      '&:has(.list-col-grow:nth-child(1))': { '--list-grid-cols': '1fr' },
      '&:has(.list-col-grow:nth-child(2))': { '--list-grid-cols': 'minmax(0, auto) 1fr' },
      '&:has(.list-col-grow:nth-child(3))': { '--list-grid-cols': 'minmax(0, auto) minmax(0, auto) 1fr' },
      '&:has(.list-col-grow:nth-child(4))': { '--list-grid-cols': 'minmax(0, auto) minmax(0, auto) minmax(0, auto) 1fr' },
      '&:has(.list-col-grow:nth-child(5))': { '--list-grid-cols': 'minmax(0, auto) minmax(0, auto) minmax(0, auto) minmax(0, auto) 1fr' },
      '&:has(.list-col-grow:nth-child(6))': { '--list-grid-cols': 'minmax(0, auto) minmax(0, auto) minmax(0, auto) minmax(0, auto) minmax(0, auto) 1fr' },
    },
    col: {},
  },
  variants: {
    hover: {
      true: {
        row: {
          '&:hover': { backgroundColor: 'base-200' },
        },
      },
    },
    wrap: {
      true: {
        col: { gridRowStart: '2' },
      },
    },
  },
})
