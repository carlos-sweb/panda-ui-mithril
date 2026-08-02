import { Component, Vnode } from 'mithril'
import { ComponentAttrs } from '../../types'

export interface IndicatorAttrs extends ComponentAttrs {
  /** Space-separated placement tokens, e.g. "end top", "start bottom", "center middle" */
  position?: string
  item?: Vnode | Vnode[] | string | null
  children?: Vnode | Vnode[] | string | null
  [key: string]: unknown
}

export const Indicator: Component<IndicatorAttrs>
