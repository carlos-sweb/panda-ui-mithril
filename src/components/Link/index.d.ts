import { Component, Vnode } from 'mithril'
import { ComponentAttrs, PumColor } from '../../types'

export interface LinkAttrs extends ComponentAttrs {
  color?: PumColor
  /** Underline only on hover; defaults to true (always underlined) */
  hover?: boolean
  /** Never underline (not even on hover) — e.g. inside a Navbar */
  noUnderline?: boolean
  href?: string
  children?: Vnode | Vnode[] | string | null
  [key: string]: unknown
}

export const Link: Component<LinkAttrs>
