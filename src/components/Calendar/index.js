import m from 'mithril'
import { ChevronLeft, ChevronRight } from 'lucide-mithril'
import {
  calendar,
} from '../../recipes/calendar'
import { cx } from '../../utils/cx'

const WEEKDAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

function sameDay(a, b) {
  return !!a && !!b && a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate()
}

function getMonthGrid(year, month) {
  const startDay = new Date(year, month, 1).getDay()
  return Array.from({ length: 42 }, (_, i) => new Date(year, month, 1 - startDay + i))
}

export const Calendar = {
  oninit(vnode) {
    const initial = vnode.attrs.value instanceof Date ? vnode.attrs.value : new Date()
    vnode.state.viewYear = initial.getFullYear()
    vnode.state.viewMonth = initial.getMonth()
  },

  view(vnode) {
    const { value, onchange, isDateDisabled, className, ...rest } = vnode.attrs
    const { viewYear, viewMonth } = vnode.state
    const today = new Date()
    const cells = getMonthGrid(viewYear, viewMonth)

    const goToMonth = (delta) => {
      const d = new Date(viewYear, viewMonth + delta, 1)
      vnode.state.viewYear = d.getFullYear()
      vnode.state.viewMonth = d.getMonth()
    }

    return m('div', {
      className: cx('calendar', 'cally', calendar({}).calendar, className),
      ...rest
    }, [
      m('div', { className: cx('calendar-header', calendar({}).header) }, [
        m('button', {
          type: 'button',
          slot: 'previous',
          'aria-label': 'Previous',
          className: calendar({}).nav,
          onclick: () => goToMonth(-1),
        }, m(ChevronLeft, { size: 16 })),
        m('span', {}, `${MONTH_NAMES[viewMonth]} ${viewYear}`),
        m('button', {
          type: 'button',
          slot: 'next',
          'aria-label': 'Next',
          className: calendar({}).nav,
          onclick: () => goToMonth(1),
        }, m(ChevronRight, { size: 16 })),
      ]),
      m('div', { className: cx('calendar-month', calendar({}).grid) }, [
        ...WEEKDAYS.map((w) => m('span', { key: `wd-${w}`, className: calendar({}).weekday }, w)),
        ...cells.map((date) => {
          const outside = date.getMonth() !== viewMonth
          const disabled = isDateDisabled ? isDateDisabled(date) : false
          return m('button', {
            key: date.toISOString(),
            type: 'button',
            className: cx('calendar-date', calendar({
              today: sameDay(date, today),
              selected: sameDay(date, value),
              outside,
              disabled,
            }).day),
            disabled,
            onclick: () => onchange && onchange(date),
          }, String(date.getDate()))
        }),
      ]),
    ])
  }
}

export const CalendarDate = {
  view(vnode) {
    const { className, ...rest } = vnode.attrs
    return m('div', { className: cx('calendar-date', className), ...rest }, vnode.children)
  }
}

export const CalendarMonth = {
  view(vnode) {
    const { className, ...rest } = vnode.attrs
    return m('div', { className: cx('calendar-month', className), ...rest }, vnode.children)
  }
}

export const CalendarHeader = {
  view(vnode) {
    const { className, ...rest } = vnode.attrs
    return m('div', { className: cx('calendar-header', className), ...rest }, vnode.children)
  }
}
