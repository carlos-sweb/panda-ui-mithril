import { cva } from '../../styled-system/css'

export const timelineStyles = cva({
  base: {
    position: 'relative',
    display: 'flex',

    '& > li': {
      position: 'relative',
      display: 'grid',
      flexShrink: '0',
      alignItems: 'center',
    },
    '& hr': {
      border: 'none',
      backgroundColor: 'var(--colors-base-300)',
    },
    '& .timeline-middle': {
      gridColumnStart: '2',
      gridRowStart: '2',
    },
  },
  variants: {
    direction: {
      horizontal: {
        flexDirection: 'row',
        '& > li': {
          gridTemplateColumns: 'minmax(0, 1fr) auto minmax(0, 1fr)',
          gridTemplateRows: 'minmax(0, 1fr) auto minmax(0, 1fr)',
        },
        '& > li > hr': { width: '100%', height: '0.25rem' },
        '& > li > hr:first-child': { gridColumnStart: '1', gridRowStart: '2' },
        '& > li > hr:last-child': { gridColumnStart: '3', gridRowStart: '2' },
        '& .timeline-start': { gridColumn: '1 / 4', gridRowStart: '1', alignSelf: 'end', justifySelf: 'center', margin: '0.25rem' },
        '& .timeline-end': { gridColumn: '1 / 4', gridRowStart: '3', alignSelf: 'start', justifySelf: 'center', margin: '0.25rem' },
      },
      // TODO (reported 2026-08-02): no gap/minHeight between <li> rows here,
      // so items with short start/end content end up flush or overlapping
      // vertically. Real daisyUI doesn't need one because its rows are laid
      // out in a browser context with default block spacing this port
      // doesn't replicate — needs an explicit gap (or per-row minHeight) on
      // `& > li` for vertical mode.
      vertical: {
        flexDirection: 'column',
        '& > li': {
          justifyItems: 'center',
          gridTemplateColumns: 'minmax(0, 1fr) auto minmax(0, 1fr)',
          gridTemplateRows: 'minmax(0, 1fr) auto minmax(0, 1fr)',
        },
        '& > li > hr': { width: '0.25rem', height: '100%' },
        '& > li > hr:first-child': { gridColumnStart: '2', gridRowStart: '1' },
        '& > li > hr:last-child': { gridColumnStart: '2', gridRowStart: '3' },
        '& .timeline-start': { gridColumn: '1 / 2', gridRow: '1 / 4', alignSelf: 'center', justifySelf: 'end' },
        '& .timeline-end': { gridColumn: '3 / 4', gridRow: '1 / 4', alignSelf: 'center', justifySelf: 'start' },
      },
    },
    snapIcon: {
      true: {
        '& > li': { alignItems: 'start' },
      },
    },
  },
  defaultVariants: {
    direction: 'horizontal',
  },
})

export const timelineBoxStyles = cva({
  base: {
    border: 'var(--border, 1px) solid var(--colors-base-300)',
    borderRadius: 'var(--radius-box)',
    backgroundColor: 'var(--colors-base-100)',
    paddingInline: '1rem',
    paddingBlock: '0.5rem',
    fontSize: '0.75rem',
    boxShadow: '0 1px 2px 0 oklch(0% 0 0 / 0.05)',
  },
})
