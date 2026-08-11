import { sva } from '../../styled-system/css'

export const timeline = sva({
  slots: ['timeline', 'box'],
  base: {
    timeline: {
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
        backgroundColor: 'base-300',
      },
      '& .timeline-middle': {
        gridColumnStart: '2',
        gridRowStart: '2',
      },
    },
    box: {
      border: 'var(--border, 1px) solid token(colors.base-300)',
      borderRadius: 'var(--radius-box)',
      backgroundColor: 'base-100',
      paddingInline: 'token(spacing.4)',
      paddingBlock: 'token(spacing.2)',
      fontSize: 'token(fontSizes.sm)',
      boxShadow: '0 1px 2px 0 oklch(0% 0 0 / 0.05)',
    },
  },
  variants: {
    direction: {
      horizontal: {
        timeline: {
          flexDirection: 'row',
          '& > li': {
            gridTemplateColumns: 'minmax(0, 1fr) auto minmax(0, 1fr)',
            gridTemplateRows: 'minmax(0, 1fr) auto minmax(0, 1fr)',
          },
          '& > li > hr': { width: '100%', height: 'token(spacing.1)' },
          '& > li > hr:first-child': { gridColumnStart: '1', gridRowStart: '2' },
          '& > li > hr:last-child': { gridColumnStart: '3', gridRowStart: '2' },
          '& .timeline-start': { gridColumn: '1 / 4', gridRowStart: '1', alignSelf: 'end', justifySelf: 'center', margin: 'token(spacing.1)' },
          '& .timeline-end': { gridColumn: '1 / 4', gridRowStart: '3', alignSelf: 'start', justifySelf: 'center', margin: 'token(spacing.1)' },
        },
      },
      // TODO (reported 2026-08-02): no gap/minHeight between <li> rows here,
      // so items with short start/end content end up flush or overlapping
      // vertically. The original implementation doesn't need one because its rows are laid
      // out in a browser context with default block spacing this port
      // doesn't replicate — needs an explicit gap (or per-row minHeight) on
      // `& > li` for vertical mode.
      vertical: {
        timeline: {
          flexDirection: 'column',
          '& > li': {
            justifyItems: 'center',
            gridTemplateColumns: 'minmax(0, 1fr) auto minmax(0, 1fr)',
            gridTemplateRows: 'minmax(0, 1fr) auto minmax(0, 1fr)',
          },
          '& > li > hr': { width: 'token(spacing.1)', height: '100%' },
          '& > li > hr:first-child': { gridColumnStart: '2', gridRowStart: '1' },
          '& > li > hr:last-child': { gridColumnStart: '2', gridRowStart: '3' },
          '& .timeline-start': { gridColumn: '1 / 2', gridRow: '1 / 4', alignSelf: 'center', justifySelf: 'end' },
          '& .timeline-end': { gridColumn: '3 / 4', gridRow: '1 / 4', alignSelf: 'center', justifySelf: 'start' },
        },
      },
    },
    snapIcon: {
      true: {
        timeline: { '& > li': { alignItems: 'start' } },
      },
    },
  },
  defaultVariants: {
    direction: 'horizontal',
  },
})
