import { Component, Vnode } from 'mithril'
import { ComponentAttrs } from '../../types'

export interface FilterAttrs extends ComponentAttrs {
  children?: Vnode | Vnode[] | string | null
  [key: string]: unknown
}

export interface FilterOptionAttrs extends ComponentAttrs {
  [key: string]: unknown
}

export interface FilterResetAttrs extends ComponentAttrs {
  [key: string]: unknown
}

export const Filter: Component<FilterAttrs>
export const FilterOption: Component<FilterOptionAttrs>
export const FilterReset: Component<FilterResetAttrs>
