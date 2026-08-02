import { Component, Vnode } from 'mithril'
import { ComponentAttrs } from '../../types'

export interface StatsAttrs extends ComponentAttrs {
  horizontal?: boolean
  vertical?: boolean
  children?: Vnode | Vnode[] | string | null
  [key: string]: unknown
}

export interface StatAttrs extends ComponentAttrs {
  children?: Vnode | Vnode[] | string | null
  [key: string]: unknown
}

export interface StatTitleAttrs extends ComponentAttrs {
  children?: Vnode | Vnode[] | string | null
  [key: string]: unknown
}

export interface StatValueAttrs extends ComponentAttrs {
  children?: Vnode | Vnode[] | string | null
  [key: string]: unknown
}

export interface StatDescAttrs extends ComponentAttrs {
  children?: Vnode | Vnode[] | string | null
  [key: string]: unknown
}

export interface StatFigureAttrs extends ComponentAttrs {
  children?: Vnode | Vnode[] | string | null
  [key: string]: unknown
}

export interface StatActionsAttrs extends ComponentAttrs {
  children?: Vnode | Vnode[] | string | null
  [key: string]: unknown
}

export const Stats: Component<StatsAttrs>
export const Stat: Component<StatAttrs>
export const StatTitle: Component<StatTitleAttrs>
export const StatValue: Component<StatValueAttrs>
export const StatDesc: Component<StatDescAttrs>
export const StatFigure: Component<StatFigureAttrs>
export const StatActions: Component<StatActionsAttrs>
