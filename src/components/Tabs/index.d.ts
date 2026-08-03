import { Component, Vnode } from 'mithril'
import { ComponentAttrs, PumSize } from '../../types'

export type TabsVariant = 'box' | 'border' | 'lift'

export interface TabsAttrs extends ComponentAttrs {
  variant?: TabsVariant
  size?: PumSize
  boxed?: boolean
  bordered?: boolean
  lifted?: boolean
  children?: Vnode | Vnode[] | string | null
  [key: string]: unknown
}

export interface TabAttrs extends ComponentAttrs {
  active?: boolean
  disabled?: boolean
  variant?: TabsVariant
  children?: Vnode | Vnode[] | string | null
  [key: string]: unknown
}

export interface TabContentAttrs extends ComponentAttrs {
  active?: boolean
  variant?: TabsVariant
  children?: Vnode | Vnode[] | string | null
  [key: string]: unknown
}

export const Tabs: Component<TabsAttrs>
export const Tab: Component<TabAttrs>
export const TabContent: Component<TabContentAttrs>
