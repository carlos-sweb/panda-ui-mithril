import { Component, Vnode } from 'mithril'
import { ComponentAttrs } from '../../types'

export interface DiffAttrs extends ComponentAttrs {
  /** Initial slider position as a percentage (0-100), default 50 */
  defaultPosition?: number
  children?: Vnode | Vnode[] | string | null
  [key: string]: unknown
}

export interface DiffItem1Attrs extends ComponentAttrs {
  children?: Vnode | Vnode[] | string | null
  [key: string]: unknown
}

export interface DiffItem2Attrs extends ComponentAttrs {
  children?: Vnode | Vnode[] | string | null
  [key: string]: unknown
}

export interface DiffResizerAttrs extends ComponentAttrs {
  [key: string]: unknown
}

export const Diff: Component<DiffAttrs>
export const DiffItem1: Component<DiffItem1Attrs>
export const DiffItem2: Component<DiffItem2Attrs>
export const DiffResizer: Component<DiffResizerAttrs>
