import { Component, Vnode } from 'mithril'
import { ComponentAttrs, PumSize } from '../../types'

export interface KbdAttrs extends ComponentAttrs {
  size?: PumSize
  children?: Vnode | Vnode[] | string | null
  [key: string]: unknown
}

export const Kbd: Component<KbdAttrs>
