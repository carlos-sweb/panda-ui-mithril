import { Component } from 'mithril'
import { ComponentAttrs } from '../../types'

export interface GridAttrs extends ComponentAttrs {
  cols?: '1' | '2' | '3' | '4' | '6' | '12'
  gap?: 'sm' | 'md' | 'lg'
  [key: string]: unknown
}
export const Grid: Component<GridAttrs>
