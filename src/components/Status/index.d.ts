import { Component } from 'mithril'
import { ComponentAttrs, DaisyColor, DaisySize } from '../../types'

export interface StatusAttrs extends ComponentAttrs {
  color?: DaisyColor
  size?: DaisySize
  [key: string]: unknown
}

export const Status: Component<StatusAttrs>
