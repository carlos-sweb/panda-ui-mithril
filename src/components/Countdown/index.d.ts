import { Component } from 'mithril'
import { ComponentAttrs } from '../../types'

export interface CountdownAttrs extends ComponentAttrs {
  /** The number to display (0-999). Used in presentational mode. */
  value?: number
  /** Number of digits to pad to; defaults to the length of `value` */
  digits?: number
  /** Seconds to count down from. Activates timer mode. */
  duration?: number
  /** Start timer automatically on mount. Requires `duration`. */
  autostart?: boolean
  /** Fires when countdown reaches 0. */
  oncomplete?: (value: number) => void
  /** Fires when timer starts. */
  onstart?: () => void
  /** Fires when timer stops/pauses. Receives remaining seconds. */
  onstop?: (remaining: number) => void
  [key: string]: unknown
}

export const Countdown: Component<CountdownAttrs>
