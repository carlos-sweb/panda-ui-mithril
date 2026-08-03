import { Component } from 'mithril'
import { ComponentAttrs, PumColor } from '../../types'

export interface ProgressAttrs extends ComponentAttrs {
  color?: PumColor
  value?: number
  /** Defaults to 100 */
  max?: number
  [key: string]: unknown
}

export const Progress: Component<ProgressAttrs>
