import { Component, Vnode } from 'mithril'
import { ComponentAttrs, DaisyColor, DaisySize } from '../../types'

export interface SelectAttrs extends ComponentAttrs {
  color?: DaisyColor
  size?: DaisySize
  ghost?: boolean
  value?: string | number
  disabled?: boolean
  onchange?: (e: Event) => void
  children?: Vnode | Vnode[] | string | null
  [key: string]: unknown
}

export const Select: Component<SelectAttrs>
