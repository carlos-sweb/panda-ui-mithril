import { Component, Vnode } from 'mithril'
import { ComponentAttrs, DaisyColor, DaisySize } from '../../types'

export interface BadgeAttrs extends ComponentAttrs {
  color?: DaisyColor
  variant?: 'outline' | 'dash' | 'soft' | 'ghost'
  size?: DaisySize
  children?: Vnode | Vnode[] | string | null
  [key: string]: unknown
}

export const Badge: Component<BadgeAttrs>
