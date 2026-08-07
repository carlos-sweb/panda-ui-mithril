import { Component, Vnode } from 'mithril'
import { ComponentAttrs, PumColor, PumStyle, PumSize } from '../../types'

export interface ButtonAttrs extends ComponentAttrs {
  color?: PumColor
  variant?: PumStyle
  size?: PumSize
  active?: boolean
  disabled?: boolean
  block?: boolean
  wide?: boolean
  square?: boolean
  circle?: boolean
  /** Border thickness. 1 (1px, default), 2 (2px), 3 (3px). */
  borderWidth?: 1 | 2 | 3
  href?: string
  children?: Vnode | Vnode[] | string | null
  [key: string]: unknown
}

export const Button: Component<ButtonAttrs>
