import { Component, Vnode } from 'mithril'
import { ComponentAttrs } from '../../types'

export interface FieldsetAttrs extends ComponentAttrs {
  legend?: string
  children?: Vnode | Vnode[] | string | null
  [key: string]: unknown
}

export const Fieldset: Component<FieldsetAttrs>
