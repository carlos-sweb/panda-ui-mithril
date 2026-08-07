import { Component } from 'mithril'
import { ComponentAttrs } from '../../types'

export interface BlockAttrs extends ComponentAttrs {
  spacing?: 'sm' | 'md' | 'lg'
  [key: string]: unknown
}
export const Block: Component<BlockAttrs>
