import { Component } from 'mithril'
import { ComponentAttrs, PumColor, PumSize } from '../../types'

export interface StatusAttrs extends ComponentAttrs {
  color?: PumColor
  size?: PumSize
  [key: string]: unknown
}

export const Status: Component<StatusAttrs>
