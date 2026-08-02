import { Component } from 'mithril'
import { ComponentAttrs, DaisyColor } from '../../types'

export interface ProgressAttrs extends ComponentAttrs {
  color?: DaisyColor
  value?: number
  /** Defaults to 100 */
  max?: number
  [key: string]: unknown
}

export const Progress: Component<ProgressAttrs>
