import { Component } from 'mithril'
import { ComponentAttrs, PumColor, PumSize } from '../../types'

export interface ButtonCloseAttrs extends ComponentAttrs {
  color?: PumColor
  variant?: 'outline' | 'dash' | 'soft' | 'ghost'
  size?: PumSize
  shape?: 'circle' | 'square'
  disabled?: boolean
  [key: string]: unknown
}

export const ButtonClose: Component<ButtonCloseAttrs>
