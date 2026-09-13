import m from 'mithril'
import { ChevronLeft, ChevronRight } from 'lucide-mithril'
import {
  calendar,
} from '../../../styled-system/recipes'
import { cx } from '../../../styled-system/css'
import { t } from '../../i18n'

// Keys of calendar.weekdayShort.*/calendar.month.* in src/i18n.js — the
// real text comes from t(), this only fixes the ORDER (Sunday-first,
// January-first) and is the fallback when the consumer does NOT pass `locale`.
const WEEKDAY_KEYS = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
const MONTH_KEYS = [
  'january', 'february', 'march', 'april', 'may', 'june',
  'july', 'august', 'september', 'october', 'november', 'december',
]

/**
 * Month/day names for a `Calendar`'s `locale` — INDEPENDENT of the
 * library's `setLocale('en'|'es')` (that one only covers aria-labels/internal
 * UI in two languages). A consumer whose app is in French, Portuguese
 * or any other language passes its own `locale` prop with these 19 strings
 * and the calendar uses them as-is, without depending on which locales the
 * library supports. `months` starts in January, `weekdaysShort` starts on Sunday
 * (same order as MONTH_KEYS/WEEKDAY_KEYS).
 * @param {import('./index').CalendarLocale | undefined} locale
 * @param {number} i
 */
function monthName(locale, i) {
  const custom = locale && Array.isArray(locale.months) ? locale.months[i] : undefined
  return custom != null ? custom : t(`calendar.month.${MONTH_KEYS[i]}`)
}
function weekdayShort(locale, i) {
  const custom = locale && Array.isArray(locale.weekdaysShort) ? locale.weekdaysShort[i] : undefined
  return custom != null ? custom : t(`calendar.weekdayShort.${WEEKDAY_KEYS[i]}`)
}

function sameDay(a, b) {
  return !!a && !!b && a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate()
}

/**
 * 42-day grid of the month, aligned to `weekStartsOn` (0=Sunday, US;
 * 1=Monday, most countries outside the US; up to 6=Saturday). Shifts
 * the initial offset instead of assuming Sunday-first — the real date of
 * each cell does not change, only which column it lands in.
 */
function getMonthGrid(year, month, weekStartsOn = 0) {
  const firstDay = new Date(year, month, 1).getDay()
  const offset = (firstDay - weekStartsOn + 7) % 7
  return Array.from({ length: 42 }, (_, i) => new Date(year, month, 1 - offset + i))
}

/** ISO-8601 week number (the week containing that week's Thursday). */
function getISOWeek(date) {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
  const dayNum = d.getUTCDay() || 7
  d.setUTCDate(d.getUTCDate() + 4 - dayNum)
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1))
  return Math.ceil(((d - yearStart) / 86400000 + 1) / 7)
}

/**
 * Cached result of `calendar({})` — the slots without variants (header,
 * navigation, grid, ...) reuse the same classes on every render.
 * @type {ReturnType<typeof calendar>}
 */
const defaultStyles = calendar({})

/**
 * Calendar component. Full month calendar with navigation between
 * months/years and three selection modes:
 *  - `mode="single"` (default): `value` is a `Date`, `onchange` receives a `Date`.
 *  - `mode="range"`: `value` is `{ start: Date|null, end: Date|null }`; when
 *    choosing the second day, a range preview with hover is shown before
 *    confirming.
 *  - `mode="multiple"`: `value` is `Date[]`; each click toggles the day.
 *
 * The header title is clickable and drills down day → month → year
 * (`initialView` allows starting directly in "month" or "year", useful for a
 * date-of-birth picker). `showWeekNumbers` adds the ISO week-number
 * column (always computed Monday-first, by definition of the
 * ISO-8601 standard — independent of `weekStartsOn`).
 *
 * `weekStartsOn` (0=Sunday default, US; 1=Monday, the convention in
 * most countries outside the US; up to 6=Saturday) runs which day falls in the
 * first column, both in the day grid and in its header — the
 * real date of each cell does not change, only the order of the columns.
 *

 * `locale` (month/day names) is INDEPENDENT of the library's
 * `setLocale('en'|'es')` — that one only translates aria-labels/internal UI into two languages.
 * A consumer with its app in French, Portuguese or any other language
 * passes `locale={{ months: [...12], weekdaysShort: [...7] }}` and the calendar
 * uses those strings as-is, without depending on which locales the
 * library supports. Without `locale`, it falls back to the internal `t()` (en/es).
 *
 * @type {import('mithril').Component<import('./index').CalendarAttrs>}
 */
export const Calendar = {
  oninit(vnode) {
    const { value, mode = 'single', initialView } = vnode.attrs
    let initial = new Date()
    if (mode === 'single' && value instanceof Date) initial = value
    else if (mode === 'range' && value && value.start instanceof Date) initial = value.start
    else if (mode === 'multiple' && Array.isArray(value) && value[0] instanceof Date) initial = value[0]

    vnode.state.viewYear = initial.getFullYear()
    vnode.state.viewMonth = initial.getMonth()
    // NOTE: never name this field `view` — Mithril re-reads `vnode.state.view`
    // AFTER running oninit (to support components that reassign it
    // dynamically), so a state field of its own with that name
    // overwrites the component's own render function and blows up with
    // "this.apply is not a function" (this = the string, not a function).
    vnode.state.panel = initialView === 'month' || initialView === 'year' ? initialView : 'day'
    vnode.state.yearPageStart = Math.floor(vnode.state.viewYear / 12) * 12
    vnode.state.hoverDate = null
  },

  view(vnode) {
    const {
      value, mode = 'single', onchange, isDateDisabled, showWeekNumbers, initialView, locale, weekStartsOn = 0, className, ...rest
    } = vnode.attrs
    const { viewYear, viewMonth, panel, yearPageStart, hoverDate } = vnode.state
    const today = new Date()

    const rangeValue = mode === 'range' && value && typeof value === 'object' && !(value instanceof Date)
      ? value : { start: null, end: null }
    const multiValue = mode === 'multiple' && Array.isArray(value) ? value : []

    const goToMonth = (delta) => {
      const d = new Date(viewYear, viewMonth + delta, 1)
      vnode.state.viewYear = d.getFullYear()
      vnode.state.viewMonth = d.getMonth()
    }

    const onTitleClick = () => {
      if (panel === 'day') vnode.state.panel = 'month'
      else if (panel === 'month') {
        vnode.state.yearPageStart = Math.floor(viewYear / 12) * 12
        vnode.state.panel = 'year'
      }
    }

    const onPrev = () => {
      if (panel === 'day') goToMonth(-1)
      else if (panel === 'month') vnode.state.viewYear = viewYear - 1
      else vnode.state.yearPageStart = yearPageStart - 12
    }
    const onNext = () => {
      if (panel === 'day') goToMonth(1)
      else if (panel === 'month') vnode.state.viewYear = viewYear + 1
      else vnode.state.yearPageStart = yearPageStart + 12
    }

    const selectDay = (date) => {
      if (mode === 'multiple') {
        const exists = multiValue.some((d) => sameDay(d, date))
        const next = exists ? multiValue.filter((d) => !sameDay(d, date)) : [...multiValue, date]
        onchange && onchange(next)
        return
      }
      if (mode === 'range') {
        const { start, end } = rangeValue
        if (!start || (start && end)) {
          onchange && onchange({ start: date, end: null })
        } else if (date < start) {
          onchange && onchange({ start: date, end: start })
        } else {
          onchange && onchange({ start, end: date })
        }
        return
      }
      onchange && onchange(date)
    }

    const title = panel === 'year'
      ? `${yearPageStart} – ${yearPageStart + 11}`
      : panel === 'month'
        ? String(viewYear)
        : `${monthName(locale, viewMonth)} ${viewYear}`

    let body
    if (panel === 'month') {
      body = m('div', { className: cx('calendar-picker', defaultStyles.pickerGrid) },
        MONTH_KEYS.map((_, i) => m('button', {
          type: 'button',
          key: `m-${i}`,
          className: calendar({ active: i === viewMonth }).pickerCell,
          onclick: () => { vnode.state.viewMonth = i; vnode.state.panel = 'day' },
        }, monthName(locale, i).slice(0, 3))))
    } else if (panel === 'year') {
      body = m('div', { className: cx('calendar-picker', defaultStyles.pickerGrid) },
        Array.from({ length: 12 }, (_, i) => yearPageStart + i).map((y) => m('button', {
          type: 'button',
          key: `y-${y}`,
          className: calendar({ active: y === viewYear }).pickerCell,
          onclick: () => { vnode.state.viewYear = y; vnode.state.panel = 'month' },
        }, String(y))))
    } else {
      const cells = getMonthGrid(viewYear, viewMonth, weekStartsOn)
      const gridStyles = showWeekNumbers ? calendar({ withWeeknum: true }).grid : defaultStyles.grid
      const gridChildren = []
      if (showWeekNumbers) gridChildren.push(m('span', { key: 'wknum-spacer', className: defaultStyles.weeknum }, ''))
      // Day header aligned to weekStartsOn — the REAL index (0=Sunday
      // ... 6=Saturday, the one used by monthName/weekdayShort and the custom locale)
      // is computed by shifting the displayed position, never the other way around.
      gridChildren.push(...Array.from({ length: 7 }, (_, pos) => {
        const dayIndex = (weekStartsOn + pos) % 7
        return m('span', { key: `wd-${WEEKDAY_KEYS[dayIndex]}`, className: defaultStyles.weekday }, weekdayShort(locale, dayIndex))
      }))

      for (let r = 0; r < 6; r++) {
        const weekCells = cells.slice(r * 7, r * 7 + 7)
        if (showWeekNumbers) {
          gridChildren.push(m('span', { key: `wk-${r}`, className: defaultStyles.weeknum }, String(getISOWeek(weekCells[0]))))
        }
        for (const date of weekCells) {
          const outside = date.getMonth() !== viewMonth
          const disabled = isDateDisabled ? isDateDisabled(date) : false
          let selected = false
          let rangeStart = false
          let rangeEnd = false
          let inRange = false

          if (mode === 'single') {
            selected = value instanceof Date && sameDay(date, value)
          } else if (mode === 'multiple') {
            selected = multiValue.some((d) => sameDay(d, date))
          } else if (mode === 'range') {
            const { start, end } = rangeValue
            rangeStart = sameDay(date, start)
            rangeEnd = sameDay(date, end)
            const effectiveEnd = end || (start && !end ? hoverDate : null)
            if (start && effectiveEnd) {
              const lo = start <= effectiveEnd ? start : effectiveEnd
              const hi = start <= effectiveEnd ? effectiveEnd : start
              if (date > lo && date < hi) inRange = true
            }
          }

          gridChildren.push(m('button', {
            key: date.toISOString(),
            type: 'button',
            className: cx('calendar-date', calendar({
              today: sameDay(date, today),
              selected,
              outside,
              disabled,
              rangeStart,
              rangeEnd,
              inRange,
            }).day),
            disabled,
            onclick: () => selectDay(date),
            onmouseenter: mode === 'range' ? () => { vnode.state.hoverDate = date } : undefined,
          }, String(date.getDate())))
        }
      }

      body = m('div', {
        className: cx('calendar-month', gridStyles),
        onmouseleave: mode === 'range' ? () => { vnode.state.hoverDate = null } : undefined,
      }, gridChildren)
    }

    return m('div', {
      className: cx('calendar', 'cally', defaultStyles.calendar, className),
      ...rest
    }, [
      m('div', { className: cx('calendar-header', defaultStyles.header) }, [
        m('button', {
          type: 'button',
          slot: 'previous',
          'aria-label': t('calendar.previous'),
          className: defaultStyles.nav,
          onclick: onPrev,
        }, m(ChevronLeft, { size: 16, 'stroke-width': 2 })),
        m('button', {
          type: 'button',
          className: defaultStyles.navLabel,
          onclick: panel === 'year' ? undefined : onTitleClick,
        }, title),
        m('button', {
          type: 'button',
          slot: 'next',
          'aria-label': t('calendar.next'),
          className: defaultStyles.nav,
          onclick: onNext,
        }, m(ChevronRight, { size: 16, 'stroke-width': 2 })),
      ]),
      body,
    ])
  }
}

/**
 * CalendarDate component. Individual day of the calendar grid.
 *
 * @type {import('mithril').Component<import('./index').CalendarDateAttrs>}
 */
export const CalendarDate = {
  view(vnode) {
    const { className, ...rest } = vnode.attrs
    return m('div', { className: cx('calendar-date', className), ...rest }, vnode.children)
  }
}

/**
 * CalendarMonth component. Monthly grid of calendar days.
 *
 * @type {import('mithril').Component<import('./index').CalendarMonthAttrs>}
 */
export const CalendarMonth = {
  view(vnode) {
    const { className, ...rest } = vnode.attrs
    return m('div', { className: cx('calendar-month', className), ...rest }, vnode.children)
  }
}

/**
 * CalendarHeader component. Header with navigation between months.
 *
 * @type {import('mithril').Component<import('./index').CalendarHeaderAttrs>}
 */
export const CalendarHeader = {
  view(vnode) {
    const { className, ...rest } = vnode.attrs
    return m('div', { className: cx('calendar-header', className), ...rest }, vnode.children)
  }
}
