import { Component, Vnode } from 'mithril'
import { ComponentAttrs, PumColor } from '../../types'

export interface FABAttrs extends ComponentAttrs {
  /** Fans actions out in a semicircle instead of a straight stack */
  flower?: boolean
  children?: Vnode | Vnode[] | string | null
  [key: string]: unknown
}

export interface FABMainAttrs extends ComponentAttrs {
  color?: PumColor
  children?: Vnode | Vnode[] | string | null
  [key: string]: unknown
}

export interface FABActionAttrs extends ComponentAttrs {
  label?: string
  color?: PumColor
  children?: Vnode | Vnode[] | string | null
  [key: string]: unknown
}

export const FAB: Component<FABAttrs>
export const FABMain: Component<FABMainAttrs>
export const FABAction: Component<FABActionAttrs>
