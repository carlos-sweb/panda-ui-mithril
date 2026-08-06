import { Component } from 'mithril'
import { ComponentAttrs, PumColor } from '../../types'

export interface TitleAttrs extends ComponentAttrs {
  /** HTML tag to render. Default: h1. Size auto-resolves from tag if not set. */
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div'
  /** Font size tier (1=largest → 7=smallest). Overrides tag implicit size. */
  size?: '1' | '2' | '3' | '4' | '5' | '6' | '7'
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

export const Title: Component<TitleAttrs>
