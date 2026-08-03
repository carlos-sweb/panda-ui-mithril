import { Component } from 'mithril'
import { ComponentAttrs, PumColor, PumSize } from '../../types'

export interface RangeAttrs extends ComponentAttrs {
  color?: PumColor
  size?: PumSize
  vertical?: boolean
  value?: number | string
  min?: number | string
  max?: number | string
  step?: number | string
  oninput?: (e: Event) => void
  [key: string]: unknown
}

export const Range: Component<RangeAttrs>
