import { Component } from 'mithril'
import { ComponentAttrs, DaisyColor, DaisySize } from '../../types'

export interface TextInputAttrs extends ComponentAttrs {
  color?: DaisyColor
  size?: DaisySize
  ghost?: boolean
  value?: string
  placeholder?: string
  disabled?: boolean
  oninput?: (e: Event) => void
  [key: string]: unknown
}

export const TextInput: Component<TextInputAttrs>
