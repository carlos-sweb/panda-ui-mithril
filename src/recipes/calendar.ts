import { sva } from '../../styled-system/css'

// The original implementation has no calendar of its own — it only ships CSS (targeting
// shadow-DOM ::part() selectors) to skin one of three external libraries
// (Cally, react-day-picker, Vanilla Calendar Pro), none of which are
// Mithril-compatible web components we'd want as a dependency here. Since
// this project has real JS via Mithril, built an actual working month-grid
// calendar instead (date math, month navigation, day selection state) —
// styled to match the look of the original's own Cally skin (rounded day
// buttons, muted weekday header, primary-colored "today", base-content
// "selected").
export const calendar = sva({
  slots: ['calendar', 'header', 'nav', 'grid', 'weekday', 'day'],
  base: {
    calendar: {
      display: 'inline-block',
      width: 'token(spacing.72)',
      padding: '0.75rem 1rem',
      borderRadius: 'var(--radius-box)',
      fontSize: 'token(fontSizes.sm)',
      userSelect: 'none',
    },
    header: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 'token(spacing.2)',
      fontWeight: 'token(fontWeights.semibold)',
      fontSize: 'token(fontSizes.md)',
    },
    nav: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 'token(spacing.7)',
      height: 'token(spacing.7)',
      borderRadius: 'var(--radius-field)',
      border: 'none',
      background: 'none',
      color: 'inherit',
      cursor: 'pointer',
      '&:hover': {
        backgroundColor: 'base-200',
      },
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(7, 1fr)',
      gap: 'token(spacing.0.5)',
    },
    weekday: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: 'token(spacing.7)',
      fontSize: '0.7rem',
      opacity: '0.5',
      fontWeight: 'token(fontWeights.normal)',
    },
    day: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: 'token(spacing.7)',
      width: 'token(spacing.7)',
      fontSize: '0.7rem',
      borderRadius: 'var(--radius-field)',
      border: 'none',
      background: 'none',
      color: 'inherit',
      cursor: 'pointer',
      '&:hover': {
        backgroundColor: 'base-200',
      },
    },
  },
  variants: {
    outside: {
      true: { day: { opacity: '0.35' } },
    },
    today: {
      true: {
        day: {
          backgroundColor: 'primary',
          color: 'primary-content',
          '&:hover': { backgroundColor: 'primary' },
        },
      },
    },
    selected: {
      true: {
        day: {
          backgroundColor: 'base-content',
          color: 'base-100',
          '&:hover': { backgroundColor: 'base-content' },
        },
      },
    },
    disabled: {
      true: {
        day: {
          opacity: '0.3',
          cursor: 'not-allowed',
          pointerEvents: 'none',
        },
      },
    },
  },
})
