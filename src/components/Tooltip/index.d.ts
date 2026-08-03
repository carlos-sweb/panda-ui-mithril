import { Component, Vnode } from 'mithril'
import { ComponentAttrs, PumColor } from '../../types'

export interface TooltipAttrs extends ComponentAttrs {
  tip?: string
  position?: 'top' | 'bottom' | 'left' | 'right'
  color?: PumColor
  open?: boolean
  children?: Vnode | Vnode[] | string | null
  [key: string]: unknown
}

export const Tooltip: Component<TooltipAttrs>
