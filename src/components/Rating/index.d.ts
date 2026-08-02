import { Component } from 'mithril'
import { ComponentAttrs, DaisyColor, DaisySize } from '../../types'

export interface RatingAttrs extends ComponentAttrs {
  size?: DaisySize
  color?: DaisyColor
  value?: number
  /** Number of stars; defaults to 5 */
  max?: number
  readonly?: boolean
  /** Radio group name; auto-generated per instance when omitted */
  name?: string
  onchange?: (value: number) => void
  [key: string]: unknown
}

export const Rating: Component<RatingAttrs>
