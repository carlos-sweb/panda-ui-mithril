import { Component, Vnode } from 'mithril'
import { ComponentAttrs } from '../../types'

export interface AccordionAttrs extends ComponentAttrs {
  /** Renders as a radio (grouped, one-open) instead of a checkbox when set */
  name?: string
  arrow?: boolean
  plus?: boolean
  checked?: boolean
  defaultChecked?: boolean
  onchange?: (e: Event) => void
  children?: Vnode | Vnode[] | string | null
  [key: string]: unknown
}

export interface AccordionTitleAttrs extends ComponentAttrs {
  children?: Vnode | Vnode[] | string | null
  [key: string]: unknown
}

export interface AccordionContentAttrs extends ComponentAttrs {
  children?: Vnode | Vnode[] | string | null
  [key: string]: unknown
}

export const Accordion: Component<AccordionAttrs>
export const AccordionTitle: Component<AccordionTitleAttrs>
export const AccordionContent: Component<AccordionContentAttrs>
export const Collapse: Component<AccordionAttrs>
export const CollapseTitle: Component<AccordionTitleAttrs>
export const CollapseContent: Component<AccordionContentAttrs>
