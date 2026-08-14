import { defineSlotRecipe } from '@pandacss/dev'

export const columnsRecipe = defineSlotRecipe({
  className : 'columns',
  slots: ['root', 'column'],
  base: {
    root: {
      display: 'flex',
      flexDirection: 'column',
      flexWrap: 'wrap',
      gap: 'token(spacing.2)',
      '@media (min-width: 768px)': {
        flexDirection: 'row',
        gap: 'token(spacing.4)',
      },
    },
    column: {
      flex: '1',
      minWidth: '0',
    },
  },
  variants: {
    gap: {
      sm: {
        root: {
          gap: 'token(spacing.1)',
          '@media (min-width: 768px)': { gap: 'token(spacing.2)' },
        },
      },
      md: {},
      lg: {
        root: {
          gap: 'token(spacing.3)',
          '@media (min-width: 768px)': { gap: 'token(spacing.6)' },
        },
      },
    },
    vertical: {
      true: { root: { flexDirection: 'column' } },
    },
    centered: {
      true: { column: { alignItems: 'center' } },
    },
    width: {
      auto: { column: { flex: 'none' } },
      '1': { column: { flex: '0 0 calc(100% / 12)' } },
      '2': { column: { flex: '0 0 calc(100% / 12 * 2)' } },
      '3': { column: { flex: '0 0 calc(100% / 12 * 3)' } },
      '4': { column: { flex: '0 0 calc(100% / 12 * 4)' } },
      '6': { column: { flex: '0 0 calc(100% / 12 * 6)' } },
      '8': { column: { flex: '0 0 calc(100% / 12 * 8)' } },
      '9': { column: { flex: '0 0 calc(100% / 12 * 9)' } },
      '12': { column: { flex: '0 0 100%' } },
    },
    narrow: {
      true: { column: { flex: 'none' } },
    },
  },
  defaultVariants: {
    gap: 'md',
  },
})
