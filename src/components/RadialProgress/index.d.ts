import { Component, Vnode } from 'mithril'
import { ComponentAttrs } from '../../types'

export interface RadialProgressAttrs extends ComponentAttrs {
  /** Percentage value, 0-100 */
  value?: number
  /** CSS size, e.g. "5rem" */
  size?: string
  /** CSS thickness, e.g. "2px" */
  thickness?: string
  children?: Vnode | Vnode[] | string | null
  [key: string]: unknown
}

export const RadialProgress: Component<RadialProgressAttrs>
