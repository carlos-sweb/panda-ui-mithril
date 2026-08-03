import { Component } from 'mithril'
import { ComponentAttrs, PumColor, PumSize } from '../../types'

export interface CheckboxAttrs extends ComponentAttrs {
  color?: PumColor
  size?: PumSize
  checked?: boolean
  disabled?: boolean
  onchange?: (e: Event) => void
  [key: string]: unknown
}

export const Checkbox: Component<CheckboxAttrs>
