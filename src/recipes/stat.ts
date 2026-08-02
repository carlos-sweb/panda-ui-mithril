import { cva } from '../../styled-system/css'

export const statsStyles = cva({
  base: {
    position: 'relative',
    display: 'inline-grid',
    gridAutoFlow: 'column',
    overflowX: 'auto',
    borderRadius: 'var(--radius-box)',
  },
  variants: {
    direction: {
      horizontal: {
        gridAutoFlow: 'column',
        overflowX: 'auto',
        overflowY: 'hidden',
        '& > .stat:not(:last-child)': {
          borderInlineEnd: 'var(--border, 1px) dashed color-mix(in oklab, currentColor 10%, transparent)',
          borderBlockEnd: 'none',
        },
      },
      vertical: {
        gridAutoFlow: 'row',
        overflowY: 'auto',
        overflowX: 'hidden',
        '& > .stat:not(:last-child)': {
          borderInlineEnd: 'none',
          borderBlockEnd: 'var(--border, 1px) dashed color-mix(in oklab, currentColor 10%, transparent)',
        },
      },
    },
  },
  defaultVariants: {
    direction: 'horizontal',
  },
})

export const statStyles = cva({
  base: {
    display: 'inline-grid',
    width: '100%',
    columnGap: '1rem',
    paddingInline: '1.5rem',
    paddingBlock: '1rem',
    gridTemplateColumns: 'repeat(1, 1fr)',
  },
})

export const statTitleStyles = cva({
  base: {
    color: 'color-mix(in oklab, var(--colors-base-content) 60%, transparent)',
    gridColumnStart: '1',
    whiteSpace: 'nowrap',
    fontSize: '0.75rem',
  },
})

export const statValueStyles = cva({
  base: {
    gridColumnStart: '1',
    whiteSpace: 'nowrap',
    fontSize: '2rem',
    fontWeight: '800',
  },
})

export const statDescStyles = cva({
  base: {
    color: 'color-mix(in oklab, var(--colors-base-content) 60%, transparent)',
    gridColumnStart: '1',
    whiteSpace: 'nowrap',
    fontSize: '0.75rem',
  },
})

export const statFigureStyles = cva({
  base: {
    gridColumnStart: '2',
    gridRowStart: '1',
    gridRow: 'span 3',
    placeSelf: 'center',
    justifySelf: 'end',
  },
})

export const statActionsStyles = cva({
  base: {
    gridColumnStart: '1',
    whiteSpace: 'nowrap',
    marginTop: '0.5rem',
    display: 'flex',
    gap: '0.5rem',
  },
})
