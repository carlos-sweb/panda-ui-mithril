import { Component } from 'mithril'
import { ComponentAttrs, PumColor, PumSize } from '../../types'

export interface OTPAttrs extends ComponentAttrs {
  size?: PumSize
  color?: PumColor
  joined?: boolean
  value?: string
  /** Number of digit cells; defaults to 4 */
  length?: number
  oninput?: (value: string) => void
  [key: string]: unknown
}

export const OTP: Component<OTPAttrs>
