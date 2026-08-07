import { Component } from 'mithril'
import { ComponentAttrs } from '../../types'

export interface ContainerAttrs extends ComponentAttrs {
  maxWidth?: 'fullhd' | 'widescreen' | 'desktop' | 'tablet'
  fluid?: boolean
  [key: string]: unknown
}
export const Container: Component<ContainerAttrs>
