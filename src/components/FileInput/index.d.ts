import { Component } from 'mithril'
import { ComponentAttrs, DaisyColor, DaisySize } from '../../types'

export interface FileInputAttrs extends ComponentAttrs {
  color?: DaisyColor
  size?: DaisySize
  ghost?: boolean
  [key: string]: unknown
}

export const FileInput: Component<FileInputAttrs>
