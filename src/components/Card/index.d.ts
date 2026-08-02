import { Component, Vnode } from 'mithril'
import { ComponentAttrs, DaisySize } from '../../types'

export interface CardAttrs extends ComponentAttrs {
  size?: DaisySize
  border?: boolean
  dash?: boolean
  side?: boolean
  imageFull?: boolean
  children?: Vnode | Vnode[] | string | null
  [key: string]: unknown
}

export interface CardBodyAttrs extends ComponentAttrs {
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
