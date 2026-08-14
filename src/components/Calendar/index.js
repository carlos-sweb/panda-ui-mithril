import m from 'mithril'
import { ChevronLeft, ChevronRight } from 'lucide-mithril'
import {
  calendar,
} from '../../../styled-system/recipes'
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

/**
 * Resultado cacheado de `calendar({})` — los slots sin variantes (cabecera,
 * navegación, rejilla, ...) reusan las mismas clases en cada render.
 * @type {ReturnType<typeof calendar>}
 */
const defaultStyles = calendar({})

/**
 * Componente Calendar. Calendario de mes completo con navegación entre
 * meses y selección de día. `value` es la fecha seleccionada (controlada),
 * `onchange` se dispara al elegir un día e `isDateDisabled` permite
 * deshabilitar fechas concretas.
 *
 * @type {import('mithril').Component<import('./index').CalendarAttrs>}
 */
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
      className: cx('calendar', 'cally', defaultStyles.calendar, className),
      ...rest
    }, [
      m('div', { className: cx('calendar-header', defaultStyles.header) }, [
        m('button', {
          type: 'button',
          slot: 'previous',
          'aria-label': 'Previous',
          className: defaultStyles.nav,
          onclick: () => goToMonth(-1),
        }, m(ChevronLeft, { size: 16, 'stroke-width': 2 })),
        m('span', {}, `${MONTH_NAMES[viewMonth]} ${viewYear}`),
        m('button', {
          type: 'button',
          slot: 'next',
          'aria-label': 'Next',
          className: defaultStyles.nav,
          onclick: () => goToMonth(1),
        }, m(ChevronRight, { size: 16, 'stroke-width': 2 })),
      ]),
      m('div', { className: cx('calendar-month', defaultStyles.grid) }, [
        ...WEEKDAYS.map((w) => m('span', { key: `wd-${w}`, className: defaultStyles.weekday }, w)),
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

/**
 * Componente CalendarDate. Día individual de la rejilla del calendario.
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
 * Componente CalendarMonth. Rejilla mensual de días del calendario.
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
 * Componente CalendarHeader. Cabecera con la navegación entre meses.
 *
 * @type {import('mithril').Component<import('./index').CalendarHeaderAttrs>}
 */
export const CalendarHeader = {
  view(vnode) {
    const { className, ...rest } = vnode.attrs
    return m('div', { className: cx('calendar-header', className), ...rest }, vnode.children)
  }
}
