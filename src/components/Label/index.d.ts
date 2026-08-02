import { Component, Vnode } from 'mithril'
import { ComponentAttrs } from '../../types'

export interface LabelAttrs extends ComponentAttrs {
  /** Renders as a floating `<label>` overlapping the input instead of an inline `<span>` */
  floating?: boolean
  children?: Vnode | Vnode[] | string | null
  [key: string]: unknown
}

export const Label: Component<LabelAttrs>
