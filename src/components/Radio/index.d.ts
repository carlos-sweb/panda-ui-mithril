import { Component } from 'mithril'
import { ComponentAttrs, DaisyColor, DaisySize } from '../../types'

export interface RadioAttrs extends ComponentAttrs {
  color?: DaisyColor
  size?: DaisySize
  checked?: boolean
  disabled?: boolean
  name?: string
  onchange?: (e: Event) => void
  [key: string]: unknown
}

export const Radio: Component<RadioAttrs>
