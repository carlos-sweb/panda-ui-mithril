import { Component, Vnode } from 'mithril'
import { ComponentAttrs } from '../../types'

export interface PaginationAttrs extends ComponentAttrs {
  children?: Vnode | Vnode[] | string | null
  [key: string]: unknown
}

export interface PaginationButtonAttrs extends ComponentAttrs {
  active?: boolean
  disabled?: boolean
  children?: Vnode | Vnode[] | string | null
  [key: string]: unknown
}

export const Pagination: Component<PaginationAttrs>
export const PaginationButton: Component<PaginationButtonAttrs>
