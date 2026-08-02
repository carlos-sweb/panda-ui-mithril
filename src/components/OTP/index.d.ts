import { Component } from 'mithril'
import { ComponentAttrs, DaisyColor, DaisySize } from '../../types'

export interface OTPAttrs extends ComponentAttrs {
  size?: DaisySize
  color?: DaisyColor
  joined?: boolean
  value?: string
  /** Number of digit cells; defaults to 4 */
  length?: number
  oninput?: (value: string) => void
  [key: string]: unknown
}

export const OTP: Component<OTPAttrs>
