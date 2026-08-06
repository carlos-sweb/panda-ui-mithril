import { Component, Vnode } from 'mithril'
import { ComponentAttrs } from '../../types'

export interface TagAttrs extends ComponentAttrs {
  variant?: 'default' | 'info' | 'success' | 'warning' | 'error'
  size?: 'md' | 'lg'
  icon?: Vnode
  onRemove?: (e: Event) => void
  clickable?: boolean
  disabled?: boolean
  children?: Vnode | Vnode[] | string | null
  [key: string]: unknown
}

export const Tag: Component<TagAttrs>
