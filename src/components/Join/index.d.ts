import { Component, Vnode } from 'mithril'
import { ComponentAttrs } from '../../types'

export interface JoinAttrs extends ComponentAttrs {
  vertical?: boolean
  children?: Vnode | Vnode[] | string | null
  [key: string]: unknown
}

export interface JoinItemAttrs extends ComponentAttrs {
  children?: Vnode | Vnode[] | string | null
  [key: string]: unknown
}

export const Join: Component<JoinAttrs>
export const JoinItem: Component<JoinItemAttrs>
