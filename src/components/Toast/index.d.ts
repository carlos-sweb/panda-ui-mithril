import { Component, Vnode } from 'mithril'
import { ComponentAttrs } from '../../types'

export interface ToastAttrs extends ComponentAttrs {
  /** Space-separated placement tokens, e.g. "top end", "bottom start"; defaults to "bottom end" */
  position?: string
  children?: Vnode | Vnode[] | string | null
  [key: string]: unknown
}

export const Toast: Component<ToastAttrs>
