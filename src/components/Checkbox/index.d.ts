import { Component } from 'mithril'
import { ComponentAttrs, DaisyColor, DaisySize } from '../../types'

export interface CheckboxAttrs extends ComponentAttrs {
  color?: DaisyColor
  size?: DaisySize
  checked?: boolean
  disabled?: boolean
  onchange?: (e: Event) => void
  [key: string]: unknown
}

export const Checkbox: Component<CheckboxAttrs>
