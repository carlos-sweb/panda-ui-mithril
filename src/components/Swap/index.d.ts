import { Component, Vnode } from 'mithril'
import { ComponentAttrs, PumSize } from '../../types'

export interface SwapAttrs extends ComponentAttrs {
  active?: boolean
  style?: 'rotate' | 'flip'
  size?: PumSize
  on?: Vnode | Vnode[] | string | null
  off?: Vnode | Vnode[] | string | null
  checked?: boolean
  /** Checkbox change handler (controlled use). Receives (checked, e) */
  onchange?: (checked: boolean, e: Event) => void
  children?: Vnode | Vnode[] | string | null
  [key: string]: unknown
}

export const Swap: Component<SwapAttrs>
