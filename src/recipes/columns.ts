import { sva } from '../../styled-system/css'

export const columns = sva({
  slots: ['root', 'column'],
  base: {
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: 'token(spacing.4)',
      '@media (max-width: 768px)': {
        flexDirection: 'column',
      },
    },
    column: {
      flex: '1',
      minWidth: '0',
    },
  },
  variants: {
    gap: {
      sm: { root: { gap: 'token(spacing.2)' } },
      md: { root: { gap: 'token(spacing.4)' } },
      lg: { root: { gap: 'token(spacing.6)' } },
    },
    vertical: {
      true: { root: { flexDirection: 'column', '@media (max-width: 768px)': { flexDirection: 'column' } } },
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
