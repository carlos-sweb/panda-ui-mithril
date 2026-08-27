import { Component } from 'mithril'
import { ComponentAttrs, PumColor, PumSize } from '../../types'

export interface OTPAttrs extends ComponentAttrs {
  /** Controlled value (full code string) — pair with `onchange` */
  value?: string
  /** Uncontrolled initial value */
  defaultValue?: string
  /** Number of cells; defaults to 4 */
  length?: number
  /** Character set: 'numeric' (default) or 'alphanumeric' */
  type?: 'numeric' | 'alphanumeric'
  /** Custom per-character validation — overrides `type` (e.g. /^[0-3]$/) */
  pattern?: RegExp
  /** Mask the code: true → '•', or a custom char. The real value flows through onchange / the hidden input */
  mask?: boolean | string
  /** Placeholder shown in empty cells */
  placeholder?: string
  /** Disables all cells */
  disabled?: boolean
  /** Cells are focusable but not editable */
  readonly?: boolean
  /** Applies error styles + aria-invalid */
  error?: boolean
  /** Focuses the first cell on mount */
  autoFocus?: boolean
  /** Sets autocomplete="one-time-code" on the first cell (SMS autofill) */
  oneTimeCode?: boolean
  /** Renders a hidden input with this name for form submission (FormData) */
  name?: string
  /** Character shown between groups of 3 cells (e.g. "-" or "—") */
  separator?: string
  /** Fired on every change with the full code */
  onchange?: (value: string) => void
  /** Fired when all cells are filled */
  oncomplete?: (value: string) => void
  size?: PumSize
  color?: PumColor
  /** Joins the cells into one connected field */
  joined?: boolean
  [key: string]: unknown
}

export const OTP: Component<OTPAttrs>
