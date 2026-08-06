import { Component } from 'mithril'
import { ComponentAttrs, PumColor, PumSize } from '../../types'

export interface ButtonGroupAttrs extends ComponentAttrs {
  color?: PumColor
  variant?: 'outline' | 'dash' | 'soft' | 'ghost'
  size?: PumSize
  [key: string]: unknown
}

export const ButtonGroup: Component<ButtonGroupAttrs>
