import { Component, Vnode } from 'mithril'
import { ComponentAttrs, PumSize } from '../../types'

export interface AvatarAttrs extends ComponentAttrs {
  size?: PumSize
  shape?: 'circle' | 'square'
  placeholder?: boolean
  src?: string
  alt?: string
  status?: 'online' | 'offline'
  children?: Vnode | Vnode[] | string | null
  [key: string]: unknown
}

export interface AvatarGroupAttrs extends ComponentAttrs {
  children?: Vnode | Vnode[] | string | null
  [key: string]: unknown
}

export const Avatar: Component<AvatarAttrs>
export const AvatarGroup: Component<AvatarGroupAttrs>
