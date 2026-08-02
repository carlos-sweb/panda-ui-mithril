import { Component } from 'mithril'
import { ComponentAttrs } from '../../types'

export interface CountdownAttrs extends ComponentAttrs {
  value: number
  /** Number of digits to pad to; defaults to the length of `value` */
  digits?: number
  [key: string]: unknown
}

export const Countdown: Component<CountdownAttrs>
