import { Component, Vnode } from 'mithril'
import { ComponentAttrs, PumColor, PumSize } from '../../types'

export interface BadgeAttrs extends ComponentAttrs {
  color?: PumColor
  variant?: 'outline' | 'dash' | 'soft' | 'ghost'
  size?: PumSize
  children?: Vnode | Vnode[] | string | null
  [key: string]: unknown
}

export const Badge: Component<BadgeAttrs>
