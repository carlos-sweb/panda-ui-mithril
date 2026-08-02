import { Component, Vnode } from 'mithril'
import { ComponentAttrs } from '../../types'

export interface FooterAttrs extends ComponentAttrs {
  center?: boolean
  horizontal?: boolean
  vertical?: boolean
  children?: Vnode | Vnode[] | string | null
  [key: string]: unknown
}

export interface FooterTitleAttrs extends ComponentAttrs {
  children?: Vnode | Vnode[] | string | null
  [key: string]: unknown
}

export const Footer: Component<FooterAttrs>
export const FooterTitle: Component<FooterTitleAttrs>
