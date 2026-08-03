import { Component, Vnode } from 'mithril'
import { ComponentAttrs, PumColor } from '../../types'

export interface DividerAttrs extends ComponentAttrs {
  color?: PumColor
  direction?: 'horizontal' | 'vertical'
  placement?: 'start' | 'end'
  children?: Vnode | Vnode[] | string | null
  [key: string]: unknown
}

export const Divider: Component<DividerAttrs>
