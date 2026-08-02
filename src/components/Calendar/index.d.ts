import { Component, Vnode } from 'mithril'
import { ComponentAttrs } from '../../types'

export interface CalendarAttrs extends ComponentAttrs {
  value?: Date
  onchange?: (date: Date) => void
  isDateDisabled?: (date: Date) => boolean
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
