import { Component, Vnode } from 'mithril'
import { ComponentAttrs, PumColor, PumSize } from '../../types'

export interface SelectAttrs extends ComponentAttrs {
  color?: PumColor
  size?: PumSize
  ghost?: boolean
  value?: string | number
  disabled?: boolean
  onchange?: (e: Event) => void
  children?: Vnode | Vnode[] | string | null
  [key: string]: unknown
}

export const Select: Component<SelectAttrs>
