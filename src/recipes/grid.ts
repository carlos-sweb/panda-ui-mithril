import { sva } from '../../styled-system/css'

export const grid = sva({
  slots: ['root', 'cell'],
  base: {
    root: {
      display: 'grid',
      gap: 'token(spacing.4)',
      '@media (max-width: 768px)': {
        gridTemplateColumns: '1fr',
      },
    },
    cell: {
      minWidth: '0',
    },
  },
  variants: {
    cols: {
      '1': { root: { gridTemplateColumns: 'repeat(1, 1fr)' } },
      '2': { root: { gridTemplateColumns: 'repeat(2, 1fr)' } },
      '3': { root: { gridTemplateColumns: 'repeat(3, 1fr)' } },
      '4': { root: { gridTemplateColumns: 'repeat(4, 1fr)' } },
      '6': { root: { gridTemplateColumns: 'repeat(6, 1fr)' } },
      '12': { root: { gridTemplateColumns: 'repeat(12, 1fr)' } },
    },
    gap: {
      sm: { root: { gap: 'token(spacing.2)' } },
      md: { root: { gap: 'token(spacing.4)' } },
      lg: { root: { gap: 'token(spacing.6)' } },
    },
    span: {
      '1': { cell: { gridColumn: 'span 1' } },
      '2': { cell: { gridColumn: 'span 2' } },
      '3': { cell: { gridColumn: 'span 3' } },
      '4': { cell: { gridColumn: 'span 4' } },
      '6': { cell: { gridColumn: 'span 6' } },
      '12': { cell: { gridColumn: 'span 12' } },
    },
  },
  defaultVariants: {
    cols: '1',
    gap: 'md',
  },
})
