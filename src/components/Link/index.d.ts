import { Component, Vnode } from 'mithril'
import { ComponentAttrs, DaisyColor } from '../../types'

export interface LinkAttrs extends ComponentAttrs {
  color?: DaisyColor
  /** Underline only on hover; defaults to true (always underlined) */
  hover?: boolean
  href?: string
  children?: Vnode | Vnode[] | string | null
  [key: string]: unknown
}

export const Link: Component<LinkAttrs>
