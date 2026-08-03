import { Component, Vnode } from 'mithril'
import { ComponentAttrs, PumSize } from '../../types'

export interface AuraAttrs extends ComponentAttrs {
  variant?: 'default' | 'rainbow' | 'holo' | 'dual' | 'silver' | 'gold'
  shape?: 'box' | 'field' | 'selector'
  size?: PumSize
  children?: Vnode | Vnode[] | string | null
  [key: string]: unknown
}

export const Aura: Component<AuraAttrs>
