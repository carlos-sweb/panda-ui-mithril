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
      borderRadius: 'var(--radius-box)',
      wordBreak: 'break-word',
      '& > *': { gridRowStart: '1' },

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
    // TODO (reported 2026-08-02): borderRadius above applies to every row
    // unconditionally, so on hover the fill color makes middle rows look odd
    // (rounded corners floating between straight-edged neighbors). Real
    // the original implementation has this same quirk. Requested fix: only round the hover fill
    // on `:last-child` — or `:first-child` when the list has no title row —
    // so only the visual edge of the list rounds, not every row.
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
