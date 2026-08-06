import { Component } from 'mithril'
import { ComponentAttrs, PumColor, PumSize } from '../../types'

export interface CloseButtonAttrs extends ComponentAttrs {
  color?: PumColor
  variant?: 'outline' | 'dash' | 'soft' | 'ghost'
  size?: PumSize
  disabled?: boolean
  [key: string]: unknown
}

export const CloseButton: Component<CloseButtonAttrs>
