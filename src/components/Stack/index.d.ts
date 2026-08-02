import { Component, Vnode } from 'mithril'
import { ComponentAttrs } from '../../types'

export interface StackAttrs extends ComponentAttrs {
  placement?: 'top' | 'bottom' | 'start' | 'end'
  children?: Vnode | Vnode[] | string | null
  [key: string]: unknown
}

export const Stack: Component<StackAttrs>
