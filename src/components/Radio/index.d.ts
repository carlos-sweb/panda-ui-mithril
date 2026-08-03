import { Component } from 'mithril'
import { ComponentAttrs, PumColor, PumSize } from '../../types'

export interface RadioAttrs extends ComponentAttrs {
  color?: PumColor
  size?: PumSize
  checked?: boolean
  disabled?: boolean
  name?: string
  onchange?: (e: Event) => void
  [key: string]: unknown
}

export const Radio: Component<RadioAttrs>
