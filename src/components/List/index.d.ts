import { Component, Vnode } from 'mithril'
import { ComponentAttrs } from '../../types'

export interface ListAttrs extends ComponentAttrs {
  children?: Vnode | Vnode[] | string | null
  [key: string]: unknown
}

export interface ListRowAttrs extends ComponentAttrs {
  hover?: boolean
  children?: Vnode | Vnode[] | string | null
  [key: string]: unknown
}

export interface ListColAttrs extends ComponentAttrs {
  grow?: boolean
  wrap?: boolean
  children?: Vnode | Vnode[] | string | null
  [key: string]: unknown
}

export const List: Component<ListAttrs>
export const ListRow: Component<ListRowAttrs>
export const ListCol: Component<ListColAttrs>
