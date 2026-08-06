import { Component } from 'mithril'
import { ComponentAttrs, PumColor, PumSize } from '../../types'

export interface ButtonCloseAttrs extends ComponentAttrs {
  color?: PumColor
  variant?: 'outline' | 'dash' | 'soft' | 'ghost'
  size?: PumSize
  shape?: 'circle' | 'square'
  /** Grosor del trazo del icono X. Default: 3 (lucide default). */
  strokeWidth?: number
  disabled?: boolean
  [key: string]: unknown
}

export const ButtonClose: Component<ButtonCloseAttrs>
