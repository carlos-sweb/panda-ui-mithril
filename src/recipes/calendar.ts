import { cva } from '../../styled-system/css'

// Real daisyUI has no calendar of its own — it only ships CSS (targeting
// shadow-DOM ::part() selectors) to skin one of three external libraries
// (Cally, react-day-picker, Vanilla Calendar Pro), none of which are
// Mithril-compatible web components we'd want as a dependency here. Since
// this project has real JS via Mithril, built an actual working month-grid
// calendar instead (date math, month navigation, day selection state) —
// styled to match the look of daisyUI's own Cally skin (rounded day
// buttons, muted weekday header, primary-colored "today", base-content
// "selected").
export const calendarStyles = cva({
  base: {
    display: 'inline-block',
    width: '18rem',
    padding: '0.75rem 1rem',
    borderRadius: 'var(--radius-box)',
    fontSize: '0.75rem',
    userSelect: 'none',
  },
})

export const calendarHeaderStyles = cva({
  base: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '0.5rem',
    fontWeight: '600',
    fontSize: '0.875rem',
  },
})

export const calendarNavStyles = cva({
  base: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '1.75rem',
    height: '1.75rem',
    borderRadius: 'var(--radius-field)',
    border: 'none',
    background: 'none',
    color: 'inherit',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: 'var(--colors-base-200)',
    },
  },
})

export const calendarGridStyles = cva({
  base: {
    display: 'grid',
    gridTemplateColumns: 'repeat(7, 1fr)',
    gap: '0.125rem',
  },
})

export const calendarWeekdayStyles = cva({
  base: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '1.75rem',
    fontSize: '0.7rem',
    opacity: '0.5',
    fontWeight: 'normal',
  },
})

export const calendarDayStyles = cva({
  base: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '1.75rem',
    width: '1.75rem',
    fontSize: '0.7rem',
    borderRadius: 'var(--radius-field)',
    border: 'none',
    background: 'none',
    color: 'inherit',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: 'var(--colors-base-200)',
    },
  },
  variants: {
    outside: {
      true: { opacity: '0.35' },
    },
    today: {
      true: {
        backgroundColor: 'var(--colors-primary)',
        color: 'var(--colors-primary-content)',
        '&:hover': { backgroundColor: 'var(--colors-primary)' },
      },
    },
    selected: {
      true: {
        backgroundColor: 'var(--colors-base-content)',
        color: 'var(--colors-base-100)',
        '&:hover': { backgroundColor: 'var(--colors-base-content)' },
      },
    },
    disabled: {
      true: {
        opacity: '0.3',
        cursor: 'not-allowed',
        pointerEvents: 'none',
      },
    },
  },
})
