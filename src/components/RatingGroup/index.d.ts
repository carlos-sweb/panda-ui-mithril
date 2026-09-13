import { Component } from 'mithril'
import type { PumSize, PumColor } from '../../types'

/** RatingGroup props — wraps Rating with a label. Delegates all Rating props. */
export interface RatingGroupAttrs {
  /** Label text (e.g. "Score"). If not passed, no label is shown. */
  label?: string
  /** Current rating value (controlled mode with onchange). */
  value?: number
  /** Initial value (uncontrolled mode, internal state). */
  defaultValue?: number
  /** Maximum number of stars. Default: 5. */
  max?: number
  /** Star color. Default: warning. */
  color?: PumColor
  /** Star size. Default: md. */
  size?: PumSize
  /** If true, the rating is visual only (non-interactive). */
  readonly?: boolean
  /** Callback when the score changes. */
  onchange?: (value: number) => void
  /** If true, shows the numeric value next to the label. Default: true. */
  showValue?: boolean
  /** Additional CSS class. */
  className?: string
}

/**
 * Wraps `Rating` with a label and an optional value readout. It is re-exported
 * by the barrel (`panda-ui-mithril`), so the value has to be declared here: a
 * `.d.ts` that only declares the attrs makes the import fail with
 * "no exported member 'RatingGroup'".
 */
export const RatingGroup: Component<RatingGroupAttrs>
