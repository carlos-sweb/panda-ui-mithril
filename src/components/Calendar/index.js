import m from 'mithril'
import { ChevronLeft, ChevronRight } from 'lucide-mithril'
import {
  calendar,
} from '../../../styled-system/recipes'
import { cx } from '../../../styled-system/css'
import { t } from '../../i18n'

// Claves de calendar.weekdayShort.*/calendar.month.* en src/i18n.js — el
// texto real sale de t(), esto solo fija el ORDEN (domingo-primero,
// enero-primero) y es el fallback cuando el consumidor NO pasa `locale`.
const WEEKDAY_KEYS = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
const MONTH_KEYS = [
  'january', 'february', 'march', 'april', 'may', 'june',
  'july', 'august', 'september', 'october', 'november', 'december',
]

/**
 * Nombres de mes/día para el `locale` de un `Calendar` — INDEPENDIENTE del
 * `setLocale('en'|'es')` de la librería (ese solo cubre aria-labels/UI
 * interna en dos idiomas). Un consumidor cuya app está en francés, portugués
 * o cualquier otro idioma pasa su propio `locale` prop con estos 19 strings
 * y el calendario los usa tal cual, sin depender de qué locales soporte la
 * librería. `months` empieza en enero, `weekdaysShort` empieza en domingo
 * (mismo orden que MONTH_KEYS/WEEKDAY_KEYS).
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
 * Rejilla de 42 días del mes, alineada a `weekStartsOn` (0=domingo, EE.UU.;
 * 1=lunes, la mayoría de países fuera de EE.UU.; hasta 6=sábado). Desplaza
 * el offset inicial en vez de asumir domingo-primero — la fecha real de
 * cada celda no cambia, solo qué columna le toca.
 */
function getMonthGrid(year, month, weekStartsOn = 0) {
  const firstDay = new Date(year, month, 1).getDay()
  const offset = (firstDay - weekStartsOn + 7) % 7
  return Array.from({ length: 42 }, (_, i) => new Date(year, month, 1 - offset + i))
}

/** Número de semana ISO-8601 (semana que contiene el jueves de esa semana). */
function getISOWeek(date) {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
  const dayNum = d.getUTCDay() || 7
  d.setUTCDate(d.getUTCDate() + 4 - dayNum)
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1))
  return Math.ceil(((d - yearStart) / 86400000 + 1) / 7)
}

/**
 * Resultado cacheado de `calendar({})` — los slots sin variantes (cabecera,
 * navegación, rejilla, ...) reusan las mismas clases en cada render.
 * @type {ReturnType<typeof calendar>}
 */
const defaultStyles = calendar({})

/**
 * Componente Calendar. Calendario de mes completo con navegación entre
 * meses/años y tres modos de selección:
 *  - `mode="single"` (default): `value` es un `Date`, `onchange` recibe un `Date`.
 *  - `mode="range"`: `value` es `{ start: Date|null, end: Date|null }`; al
 *    elegir el segundo día se muestra un preview de rango con hover antes
 *    de confirmar.
 *  - `mode="multiple"`: `value` es `Date[]`; cada click alterna el día.
 *
 * El título del header es clickeable y hace drill-down día → mes → año
 * (`initialView` permite arrancar directo en "month" o "year", útil para un
 * selector de fecha de nacimiento). `showWeekNumbers` agrega la columna de
 * número de semana ISO (siempre calculada lunes-primero, por definición del
 * estándar ISO-8601 — independiente de `weekStartsOn`).
 *
 * `weekStartsOn` (0=domingo default, EE.UU.; 1=lunes, la convención en la
 * mayoría de países fuera de EE.UU.; hasta 6=sábado) corre qué día cae en la
 * primera columna, tanto en la rejilla de días como en su cabecera — la
 * fecha real de cada celda no cambia, solo el orden de las columnas.
 *

 * `locale` (nombres de mes/día) es INDEPENDIENTE del `setLocale('en'|'es')`
 * de la librería — ese solo traduce aria-labels/UI interna a dos idiomas.
 * Un consumidor con su app en francés, portugués o cualquier otro idioma
 * pasa `locale={{ months: [...12], weekdaysShort: [...7] }}` y el calendario
 * usa esos strings tal cual, sin depender de qué locales soporte la
 * librería. Sin `locale`, cae al `t()` interno (en/es).
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
    // NOTA: nunca nombrar este campo `view` — Mithril relee `vnode.state.view`
    // DESPUÉS de correr oninit (para soportar components que la reasignan
    // dinámicamente), así que un campo de estado propio con ese nombre
    // pisa la función de render del propio componente y revienta con
    // "this.apply is not a function" (this = el string, no una función).
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
      // Cabecera de días alineada a weekStartsOn — el índice REAL (0=domingo
      // ... 6=sábado, el que usan monthName/weekdayShort y el locale custom)
      // se calcula desplazando la posición mostrada, nunca al revés.
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
