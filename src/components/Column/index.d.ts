import { Component } from 'mithril'
import { ComponentAttrs } from '../../types'

export interface ColumnAttrs extends ComponentAttrs {
  width?: 'auto' | '1' | '2' | '3' | '4' | '6' | '8' | '9' | '12'
  narrow?: boolean
  [key: string]: unknown
}
export const Column: Component<ColumnAttrs>
