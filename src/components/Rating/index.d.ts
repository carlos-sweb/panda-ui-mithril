import { Component } from 'mithril'
import { ComponentAttrs, DaisyColor, DaisySize } from '../../types'

export interface RatingAttrs extends ComponentAttrs {
  size?: DaisySize
  color?: DaisyColor
  /**
   * Controlled value (integer 0..max, e.g. 3).
   * When provided the component is controlled and `onchange` must update it;
   * when omitted the component manages its own state (see `defaultValue`).
   */
  value?: number
  /** Initial internal value for uncontrolled mode; defaults to 0 */
  defaultValue?: number
  /**
   * Maximum score — number of stars (e.g. 3 for a 1-3 scale, 5 for 1-5).
   * Defaults to 5.
   */
  max?: number
  /**
   * Static display mode (e.g. someone else's rating): no hover preview,
   * no click handling. Renders `role="img"` with a summary aria-label.
   */
  readonly?: boolean
  /** Fired with the new value (integer 0..max) when the user selects a star */
  onchange?: (value: number) => void
  [key: string]: unknown
}

export const Rating: Component<RatingAttrs>
