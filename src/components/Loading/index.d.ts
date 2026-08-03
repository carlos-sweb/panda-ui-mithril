import { Component } from 'mithril'
import { ComponentAttrs, PumSize } from '../../types'

export interface LoadingAttrs extends ComponentAttrs {
  variant?: 'spinner' | 'dots' | 'ring' | 'ball' | 'bars' | 'infinity'
  size?: PumSize
  [key: string]: unknown
}

export const Loading: Component<LoadingAttrs>
