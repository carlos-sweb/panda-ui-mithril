import { Component, Vnode } from 'mithril'
import { ComponentAttrs } from '../../types'

export interface SwapAttrs extends ComponentAttrs {
  active?: boolean
  style?: 'rotate' | 'flip'
  on?: Vnode | Vnode[] | string | null
  off?: Vnode | Vnode[] | string | null
  checked?: boolean
  onchange?: (e: Event) => void
  children?: Vnode | Vnode[] | string | null
  [key: string]: unknown
}

export const Swap: Component<SwapAttrs>
