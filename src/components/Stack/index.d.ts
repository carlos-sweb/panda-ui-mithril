import { Component } from 'mithril'
import { ComponentAttrs } from '../../types'

export interface StackAttrs extends ComponentAttrs {
  /** Stack direction. Default: column (vertical). Use 'row' for horizontal. */
  direction?: 'column' | 'row'
  /** Gap between children. Scales with viewport. Default: md. */
  gap?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  /** Cross-axis alignment. Default: stretch. */
  align?: 'start' | 'center' | 'end' | 'stretch'
  /** Main-axis justification. */
  justify?: 'start' | 'center' | 'end' | 'between' | 'around'
  [key: string]: unknown
}

export const Stack: Component<StackAttrs>
