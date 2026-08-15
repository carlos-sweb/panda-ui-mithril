import { Component } from 'mithril'
import { ComponentAttrs, PumColor, PumSize } from '../../types'

export interface TextAttrs extends ComponentAttrs {
  /** HTML tag to render. Default: p. */
  as?: 'p' | 'span' | 'div'
  /** Font size tier (xs=smallest → xl=largest). Default: md. */
  size?: PumSize
  /** Theme color for the text. */
  color?: PumColor
  /** Text alignment. Default: left. */
  align?: 'left' | 'center' | 'right' | 'justify'
  /** Text transformation. Default: none. */
  transform?: 'capitalize' | 'uppercase' | 'lowercase' | 'none'
  /** Font weight override. Default: normal. */
  weight?: 'light' | 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold'
  /** Truncate with ellipsis on overflow. */
  truncate?: boolean
  /** Italic text. */
  italic?: boolean
  [key: string]: unknown
}

export const Text: Component<TextAttrs>
