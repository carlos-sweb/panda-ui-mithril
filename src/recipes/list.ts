import { cva } from '../../styled-system/css'

export const listStyles = cva({
  base: {
    display: 'flex',
    flexDirection: 'column',
    fontSize: '0.875rem',

    '& > li:not(:last-child)': {
      position: 'relative',
      '&:after': {
        content: '""',
        position: 'absolute',
        insetInline: 'var(--radius-box)',
        bottom: '0',
        borderBottom: 'var(--border, 1px) solid color-mix(in oklab, var(--colors-base-content) 5%, transparent)',
      },
    },
  },
})

export const listRowStyles = cva({
  base: {
    '--list-grid-cols': 'minmax(0, auto) 1fr',
    position: 'relative',
    display: 'grid',
    gridAutoFlow: 'column',
    gridTemplateColumns: 'var(--list-grid-cols)',
    gap: '1rem',
    padding: '1rem',
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
  variants: {
    // TODO (reported 2026-08-02): borderRadius above applies to every row
    // unconditionally, so on hover the fill color makes middle rows look odd
    // (rounded corners floating between straight-edged neighbors). Real
    // daisyUI has this same quirk. Requested fix: only round the hover fill
    // on `:last-child` — or `:first-child` when the list has no title row —
    // so only the visual edge of the list rounds, not every row.
    hover: {
      true: {
        '&:hover': { backgroundColor: 'var(--colors-base-200)' },
      },
    },
  },
})

export const listColStyles = cva({
  base: {},
  variants: {
    wrap: {
      true: { gridRowStart: '2' },
    },
  },
})
