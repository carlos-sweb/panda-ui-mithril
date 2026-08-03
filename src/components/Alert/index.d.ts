import { Component, Vnode } from 'mithril'
import { ComponentAttrs, PumColor } from '../../types'

export interface AlertAttrs extends ComponentAttrs {
  variant?: 'outline' | 'dash' | 'soft'
  color?: Extract<PumColor, 'info' | 'success' | 'warning' | 'error'>
  direction?: 'horizontal' | 'vertical'
  children?: Vnode | Vnode[] | string | null
  [key: string]: unknown
}

export const Alert: Component<AlertAttrs>
