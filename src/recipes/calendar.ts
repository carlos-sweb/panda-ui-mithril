import { defineSlotRecipe } from '@pandacss/dev'

// The original implementation has no calendar of its own — it only ships CSS (targeting
// shadow-DOM ::part() selectors) to skin one of three external libraries
// (Cally, react-day-picker, Vanilla Calendar Pro), none of which are
// Mithril-compatible web components we'd want as a dependency here. Since
// this project has real JS via Mithril, built an actual working month-grid
// calendar instead (date math, month navigation, day selection state) —
// styled to match the look of the original's own Cally skin (rounded day
// buttons, muted weekday header, primary-colored "today", base-content
// "selected").
//
// `pickerGrid`/`pickerCell` power the month- and year-picker views (the
// header title is clickable and drills day -> month -> year, see
// Calendar/index.js) — same visual language as `day` but a 3-column grid
// instead of a 7-column one. `weeknum` is the optional ISO week-number
// column/spacer (`showWeekNumbers`); `navLabel` is the clickable title.
export const calendarRecipe = defineSlotRecipe({
  className : 'calendar',
  slots: ['calendar', 'header', 'nav', 'navLabel', 'grid', 'weekday', 'weeknum', 'day', 'pickerGrid', 'pickerCell'],
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
      flex: 'none',
      borderRadius: 'var(--radius-field)',
      border: 'none',
      background: 'none',
      color: 'inherit',
      cursor: 'pointer',
      '&:hover': {
        backgroundColor: 'base-200',
      },
    },
    navLabel: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '0.25rem 0.5rem',
      borderRadius: 'var(--radius-field)',
      border: 'none',
      background: 'none',
      color: 'inherit',
      font: 'inherit',
      fontWeight: 'inherit',
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
    weeknum: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: 'token(spacing.7)',
      width: 'token(spacing.7)',
      fontSize: '0.65rem',
      opacity: '0.4',
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
    pickerGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: 'token(spacing.1)',
      padding: '0.25rem 0',
    },
    pickerCell: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '0.6rem 0.25rem',
      fontSize: '0.75rem',
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
    rangeStart: {
      true: {
        day: {
          backgroundColor: 'primary',
          color: 'primary-content',
          '&:hover': { backgroundColor: 'primary' },
        },
      },
    },
    rangeEnd: {
      true: {
        day: {
          backgroundColor: 'primary',
          color: 'primary-content',
          '&:hover': { backgroundColor: 'primary' },
        },
      },
    },
    inRange: {
      true: {
        day: {
          borderRadius: '0.25rem',
          backgroundColor: 'color-mix(in oklab, token(colors.primary) 18%, transparent)',
        },
      },
    },
    active: {
      true: {
        pickerCell: {
          backgroundColor: 'primary',
          color: 'primary-content',
          '&:hover': { backgroundColor: 'primary' },
        },
      },
    },
    withWeeknum: {
      true: {
        grid: { gridTemplateColumns: 'token(spacing.7) repeat(7, 1fr)' },
      },
    },
  },
})
