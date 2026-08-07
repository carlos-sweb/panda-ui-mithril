import { Component } from 'mithril'
import { ComponentAttrs } from '../../types'

export interface CellAttrs extends ComponentAttrs {
  span?: '1' | '2' | '3' | '4' | '6' | '12'
  [key: string]: unknown
}
export const Cell: Component<CellAttrs>
