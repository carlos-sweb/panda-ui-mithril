import { Component } from 'mithril'
import { ComponentAttrs, DaisySize } from '../../types'

export interface LoadingAttrs extends ComponentAttrs {
  variant?: 'spinner' | 'dots' | 'ring' | 'ball' | 'bars' | 'infinity'
  size?: DaisySize
  [key: string]: unknown
}

export const Loading: Component<LoadingAttrs>
