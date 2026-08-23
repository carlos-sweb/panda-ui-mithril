import { Component } from 'mithril'
import { ComponentAttrs, PumSize } from '../../types'

export type MaskShape =
  | 'square'
  | 'squircle'
  | 'decagon'
  | 'diamond'
  | 'heart'
  | 'hexagon'
  | 'hexagon-2'
  | 'circle'
  | 'pentagon'
  | 'star'
  | 'star-2'
  | 'triangle'
  | 'triangle-2'
  | 'triangle-3'
  | 'triangle-4'

export interface MaskAttrs extends ComponentAttrs {
  shape?: MaskShape
  /** Reveals only one half of the mask: 1 = left half, 2 = right half */
  half?: 1 | 2
  /** Fixed image dimensions, PumSize scale (xs..xl) */
  size?: PumSize
  src?: string
  alt?: string
  [key: string]: unknown
}

export const Mask: Component<MaskAttrs>
