import { Component } from 'mithril'
import { ComponentAttrs } from '../../types'

export interface ColumnsAttrs extends ComponentAttrs {
  gap?: 'sm' | 'md' | 'lg'
  vertical?: boolean
  centered?: boolean
  [key: string]: unknown
}
export const Columns: Component<ColumnsAttrs>
