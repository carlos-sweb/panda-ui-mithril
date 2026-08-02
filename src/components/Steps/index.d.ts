import { Component, Vnode } from 'mithril'
import { ComponentAttrs, DaisyColor } from '../../types'

export interface StepsAttrs extends ComponentAttrs {
  horizontal?: boolean
  vertical?: boolean
  children?: Vnode | Vnode[] | string | null
  [key: string]: unknown
}

export interface StepAttrs extends ComponentAttrs {
  color?: DaisyColor
  children?: Vnode | Vnode[] | string | null
  [key: string]: unknown
}

export interface StepIconAttrs extends ComponentAttrs {
  children?: Vnode | Vnode[] | string | null
  [key: string]: unknown
}

export const Steps: Component<StepsAttrs>
export const Step: Component<StepAttrs>
export const StepIcon: Component<StepIconAttrs>
