import { Component } from 'mithril'
import { ComponentAttrs } from '../../types'

export interface BoxAttrs extends ComponentAttrs {
  padding?: 'sm' | 'md' | 'lg'
  shadow?: 'sm' | 'md' | 'lg' | 'none'
  [key: string]: unknown
}
export const Box: Component<BoxAttrs>
