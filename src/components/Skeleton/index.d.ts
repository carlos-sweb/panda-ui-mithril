import { Component } from 'mithril'
import { ComponentAttrs } from '../../types'

export interface SkeletonAttrs extends ComponentAttrs {
  /** Adjusts sizing to look like a line of text rather than a block */
  text?: boolean
  [key: string]: unknown
}

export const Skeleton: Component<SkeletonAttrs>
