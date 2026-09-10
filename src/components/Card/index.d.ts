import { Component, Vnode } from 'mithril'
import { ComponentAttrs, PumSize } from '../../types'

export interface CardAttrs extends ComponentAttrs {
  size?: PumSize
  border?: boolean
  dash?: boolean
  /** Drop shadow — opt-in, composes with border/dash. @default false */
  shadow?: boolean
  side?: boolean
  imageFull?: boolean
  children?: Vnode | Vnode[] | string | null
  [key: string]: unknown
}

export interface CardBodyAttrs extends ComponentAttrs {
  /** Divided side compartment for `<Card side>` — divider border + centered content. @default false */
  rail?: boolean
  children?: Vnode | Vnode[] | string | null
  [key: string]: unknown
}

export interface CardTitleAttrs extends ComponentAttrs {
  children?: Vnode | Vnode[] | string | null
  [key: string]: unknown
}

export interface CardActionsAttrs extends ComponentAttrs {
  justify?: 'start' | 'center' | 'end' | 'between'
  children?: Vnode | Vnode[] | string | null
  [key: string]: unknown
}

export interface CardFigureAttrs extends ComponentAttrs {
  children?: Vnode | Vnode[] | string | null
  [key: string]: unknown
}

export const Card: Component<CardAttrs>
export const CardBody: Component<CardBodyAttrs>
export const CardTitle: Component<CardTitleAttrs>
export const CardActions: Component<CardActionsAttrs>
export const CardFigure: Component<CardFigureAttrs>
