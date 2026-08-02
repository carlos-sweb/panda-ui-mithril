import { Component, Vnode } from 'mithril'
import { ComponentAttrs } from '../../types'

export interface TimelineAttrs extends ComponentAttrs {
  horizontal?: boolean
  vertical?: boolean
  /** Adds a compact icon-snapping variant of the middle marker */
  snapIcon?: boolean
  children?: Vnode | Vnode[] | string | null
  [key: string]: unknown
}

export interface TimelineItemAttrs extends ComponentAttrs {
  hrBefore?: boolean
  hrAfter?: boolean
  children?: Vnode | Vnode[] | string | null
  [key: string]: unknown
}

export interface TimelineStartAttrs extends ComponentAttrs {
  /** Renders as a boxed callout instead of plain text */
  box?: boolean
  children?: Vnode | Vnode[] | string | null
  [key: string]: unknown
}

export interface TimelineMiddleAttrs extends ComponentAttrs {
  children?: Vnode | Vnode[] | string | null
  [key: string]: unknown
}

export interface TimelineEndAttrs extends ComponentAttrs {
  box?: boolean
  children?: Vnode | Vnode[] | string | null
  [key: string]: unknown
}

export const Timeline: Component<TimelineAttrs>
export const TimelineItem: Component<TimelineItemAttrs>
export const TimelineStart: Component<TimelineStartAttrs>
export const TimelineMiddle: Component<TimelineMiddleAttrs>
export const TimelineEnd: Component<TimelineEndAttrs>
