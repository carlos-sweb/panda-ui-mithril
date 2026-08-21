import { Component } from 'mithril'
import { ComponentAttrs, PumColor, PumSize, PumStyle } from '../../types'

/** Icon transition animation when Copy swaps to Check. */
export type ButtonCopyAnimation = 'fade' | 'scale' | 'rotate' | 'bounce' | 'none'

export interface ButtonCopyAttrs extends ComponentAttrs {
  /** Text string to copy to the clipboard. */
  text?: string
  /** ID of a DOM element whose textContent will be copied. Used when `text` is not provided. */
  for?: string
  /**
   * Label shown in the tooltip after a successful copy (e.g. "Copied!", "¡Copiado!").
   * When this prop is **omitted**, no Tooltip element is rendered — just the bare Button.
   * When provided, the Tooltip appears for `duration` ms after copying.
   */
  tooltip?: string
  /**
   * Animation applied to the icon when it transitions from Copy to Check.
   * - `'fade'`   — fade in (opacity 0→1)
   * - `'scale'`  — scale up from zero with fade (default)
   * - `'rotate'` — rotate in from -90° with fade
   * - `'bounce'` — overshoot scale for a springy feel
   * - `'none'`   — no animation, instant swap
   * @default 'scale'
   */
  animation?: ButtonCopyAnimation
  /** Duration in ms the "copied" state persists. Default: 2000. */
  duration?: number
  color?: PumColor
  variant?: PumStyle
  size?: PumSize
  disabled?: boolean
  [key: string]: unknown
}

export const ButtonCopy: Component<ButtonCopyAttrs>
