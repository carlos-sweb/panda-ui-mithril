import { Component } from 'mithril'
import { ComponentAttrs, PumColor, PumSize } from '../../types'

export interface FileInputAttrs extends ComponentAttrs {
  color?: PumColor
  size?: PumSize
  ghost?: boolean
  [key: string]: unknown
}

export const FileInput: Component<FileInputAttrs>
