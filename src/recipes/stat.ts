import { sva } from '../../styled-system/css'

export const stat = sva({
  slots: ['stats', 'stat', 'title', 'value', 'desc', 'figure', 'actions'],
  base: {
    stats: {
      position: 'relative',
      display: 'inline-grid',
      gridAutoFlow: 'column',
      overflowX: 'auto',
      borderRadius: 'var(--radius-box)',
    },
    stat: {
      display: 'inline-grid',
      width: '100%',
      columnGap: 'token(spacing.4)',
      paddingInline: 'token(spacing.6)',
      paddingBlock: 'token(spacing.4)',
      gridTemplateColumns: 'repeat(1, 1fr)',
    },
    title: {
      color: 'color-mix(in oklab, token(colors.base-content) 60%, transparent)',
      gridColumnStart: '1',
      whiteSpace: 'nowrap',
      fontSize: 'token(fontSizes.sm)',
    },
    value: {
      gridColumnStart: '1',
      whiteSpace: 'nowrap',
      fontSize: 'token(fontSizes.6xl)',
      fontWeight: 'token(fontWeights.extrabold)',
    },
    desc: {
      color: 'color-mix(in oklab, token(colors.base-content) 60%, transparent)',
      gridColumnStart: '1',
      whiteSpace: 'nowrap',
      fontSize: 'token(fontSizes.sm)',
    },
    figure: {
      gridColumnStart: '2',
      gridRowStart: '1',
      gridRow: 'span 3',
      placeSelf: 'center',
      justifySelf: 'end',
    },
    actions: {
      gridColumnStart: '1',
      whiteSpace: 'nowrap',
      marginTop: 'token(spacing.2)',
      display: 'flex',
      gap: 'token(spacing.2)',
    },
  },
  variants: {
    direction: {
      horizontal: {
        stats: {
          gridAutoFlow: 'column',
          overflowX: 'auto',
          overflowY: 'hidden',
          '& > .stat:not(:last-child)': {
            borderInlineEnd: 'var(--border, 1px) dashed color-mix(in oklab, currentColor 10%, transparent)',
            borderBlockEnd: 'none',
          },
        },
      },
      vertical: {
        stats: {
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
  },
  defaultVariants: {
    direction: 'horizontal',
  },
})
