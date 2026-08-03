import { Component } from 'mithril'
import { ComponentAttrs, PumColor, PumSize } from '../../types'

export interface TextareaAttrs extends ComponentAttrs {
  color?: PumColor
  size?: PumSize
  ghost?: boolean
  value?: string
  placeholder?: string
  disabled?: boolean
  oninput?: (e: Event) => void
  [key: string]: unknown
}

export const Textarea: Component<TextareaAttrs>
