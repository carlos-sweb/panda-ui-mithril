import { Component, Vnode } from 'mithril'
import { ComponentAttrs, DaisySize } from '../../types'

export interface KbdAttrs extends ComponentAttrs {
  size?: DaisySize
  children?: Vnode | Vnode[] | string | null
  [key: string]: unknown
}

export const Kbd: Component<KbdAttrs>
