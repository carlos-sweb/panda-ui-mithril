import { Component, Vnode } from 'mithril'
import { ComponentAttrs, DaisySize } from '../../types'

export interface MegamenuAttrs extends ComponentAttrs {
  size?: DaisySize
  vertical?: boolean
  children?: Vnode | Vnode[] | string | null
  [key: string]: unknown
}

export interface MegamenuItemAttrs extends ComponentAttrs {
  children?: Vnode | Vnode[] | string | null
  [key: string]: unknown
}

export interface MegamenuTriggerAttrs extends ComponentAttrs {
  href?: string
  active?: boolean
  /** Shows the dropdown chevron affordance; defaults to true */
  chevron?: boolean
  children?: Vnode | Vnode[] | string | null
  [key: string]: unknown
}

export interface MegamenuPanelAttrs extends ComponentAttrs {
  children?: Vnode | Vnode[] | string | null
  [key: string]: unknown
}

export interface MegamenuActiveAttrs extends ComponentAttrs {
  [key: string]: unknown
}

export const Megamenu: Component<MegamenuAttrs>
export const MegamenuItem: Component<MegamenuItemAttrs>
export const MegamenuTrigger: Component<MegamenuTriggerAttrs>
export const MegamenuPanel: Component<MegamenuPanelAttrs>
export const MegamenuActive: Component<MegamenuActiveAttrs>
