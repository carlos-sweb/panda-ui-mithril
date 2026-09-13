import { Component, Vnode } from 'mithril'
import { ComponentAttrs, PumSize } from '../../types'

export type TabsVariant = 'box' | 'border' | 'lift'

export interface TabsAttrs extends ComponentAttrs {
  /** Controlled mode: ref of the active tab */
  active?: string
  /** Uncontrolled mode: initial active tab ref */
  defaultActive?: string
  /** Callback fired when the active tab changes */
  onActiveChange?: (ref: string) => void
  variant?: TabsVariant
  size?: PumSize
  boxed?: boolean
  bordered?: boolean
  lifted?: boolean
  children?: Vnode | Vnode[] | string | null
  [key: string]: unknown
}

export interface TabAttrs extends ComponentAttrs {
  /** Identifier linking a Tab to its TabContent */
  ref: string
  active?: boolean
  disabled?: boolean
  children?: Vnode | Vnode[] | string | null
  [key: string]: unknown
}

export interface TabContentAttrs extends ComponentAttrs {
  /** Identifier linking TabContent to its Tab */
  ref: string
  active?: boolean
  children?: Vnode | Vnode[] | string | null
  [key: string]: unknown
}

export const Tabs: Component<TabsAttrs>
export const Tab: Component<TabAttrs>
export const TabContent: Component<TabContentAttrs>
