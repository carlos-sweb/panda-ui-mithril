import { sva } from '../../styled-system/css'

export const grid = sva({
  slots: ['root', 'cell'],
  base: {
    root: {
      display: 'grid',
      gridTemplateColumns: '1fr',
      gap: 'token(spacing.2)',
      '@media (min-width: 640px)': { gap: 'token(spacing.3)' },
      '@media (min-width: 768px)': {
        gap: 'token(spacing.4)',
        gridTemplateColumns: 'repeat(1, 1fr)',
      },
    },
    cell: {
      minWidth: '0',
    },
  },
  variants: {
    cols: {
      '1': {},
      '2': {
        root: {
          '@media (min-width: 768px)': { gridTemplateColumns: 'repeat(2, 1fr)' },
        },
      },
      '3': {
        root: {
          '@media (min-width: 768px)': { gridTemplateColumns: 'repeat(3, 1fr)' },
        },
      },
      '4': {
        root: {
          '@media (min-width: 768px)': { gridTemplateColumns: 'repeat(4, 1fr)' },
        },
      },
      '6': {
        root: {
          '@media (min-width: 768px)': { gridTemplateColumns: 'repeat(6, 1fr)' },
        },
      },
      '12': {
        root: {
          '@media (min-width: 768px)': { gridTemplateColumns: 'repeat(12, 1fr)' },
        },
      },
    },
    gap: {
      sm: {
        root: {
          gap: 'token(spacing.1)',
          '@media (min-width: 640px)': { gap: 'token(spacing.2)' },
        },
      },
      md: {},
      lg: {
        root: {
          gap: 'token(spacing.3)',
          '@media (min-width: 640px)': { gap: 'token(spacing.5)' },
          '@media (min-width: 1024px)': { gap: 'token(spacing.6)' },
        },
      },
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
