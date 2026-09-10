import { Component, Vnode } from 'mithril'
import { ComponentAttrs } from '../../types'

export type CalendarMode = 'single' | 'range' | 'multiple'
export type CalendarView = 'day' | 'month' | 'year'
export interface CalendarRangeValue {
  start: Date | null
  end: Date | null
}

/**
 * Custom month/weekday names for `Calendar`'s `locale` prop — INDEPENDENT of
 * the library's own `setLocale('en'|'es')` (that one only covers aria-labels
 * / internal UI strings in two languages). Pass this so the calendar reads
 * correctly in any language, e.g. French:
 *
 *   const fr: CalendarLocale = {
 *     months: ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'],
 *     weekdaysShort: ['di', 'lu', 'ma', 'me', 'je', 've', 'sa'],
 *   }
 *   <Calendar locale={fr} ... />
 *
 * Both arrays are optional (a missing entry falls back to the library's
 * built-in en/es name for that index) — `months` starts at January,
 * `weekdaysShort` starts at Sunday, matching `Date#getMonth()`/`getDay()`.
 */
export interface CalendarLocale {
  /** 12 full month names, starting at January. */
  months?: string[]
  /** 7 short weekday labels, starting at Sunday. */
  weekdaysShort?: string[]
}

export interface CalendarAttrs extends ComponentAttrs {
  /** @default 'single' */
  mode?: CalendarMode
  /** `Date` for 'single', `{ start, end }` for 'range', `Date[]` for 'multiple'. */
  value?: Date | CalendarRangeValue | Date[]
  /** Receives the value in the shape matching `mode`. */
  onchange?: (value: Date | CalendarRangeValue | Date[]) => void
  isDateDisabled?: (date: Date) => boolean
  /** Adds an ISO week-number column (always Monday-first, per ISO-8601 — independent of weekStartsOn). @default false */
  showWeekNumbers?: boolean
  /** Starting drill-down view — read once on init. @default 'day' */
  initialView?: CalendarView
  /** Month/weekday names for any language — independent of setLocale('en'|'es'). */
  locale?: CalendarLocale
  /** First day of the week column: 0=Sunday (US), 1=Monday (most countries outside the US), ... 6=Saturday. @default 0 */
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6
  children?: Vnode | Vnode[] | string | null
  [key: string]: unknown
}

export interface CalendarDateAttrs extends ComponentAttrs {
  children?: Vnode | Vnode[] | string | null
  [key: string]: unknown
}

export interface CalendarMonthAttrs extends ComponentAttrs {
  children?: Vnode | Vnode[] | string | null
  [key: string]: unknown
}

export interface CalendarHeaderAttrs extends ComponentAttrs {
  children?: Vnode | Vnode[] | string | null
  [key: string]: unknown
}

export const Calendar: Component<CalendarAttrs>
export const CalendarDate: Component<CalendarDateAttrs>
export const CalendarMonth: Component<CalendarMonthAttrs>
export const CalendarHeader: Component<CalendarHeaderAttrs>
