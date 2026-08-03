import { Component } from 'mithril'
import { ComponentAttrs, PumColor, PumSize } from '../../types'

export interface ThemeControllerAttrs extends ComponentAttrs {
  /** Visual style of the underlying input; defaults to 'toggle' */
  variant?: 'toggle' | 'checkbox'
  size?: PumSize
  color?: PumColor
  /** The theme name this input activates, e.g. "dark" */
  theme?: string
  checked?: boolean
  onchange?: (theme: string | undefined) => void
  [key: string]: unknown
}

export const ThemeController: Component<ThemeControllerAttrs>
