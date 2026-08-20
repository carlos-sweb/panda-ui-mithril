import { Component, Vnode } from 'mithril'
import { ComponentAttrs, PumSize } from '../../types'

export type TabsVariant = 'box' | 'border' | 'lift'

export interface TabsAttrs extends ComponentAttrs {
  /** Modo controlado: ref del tab activo */
  active?: string
  /** Modo no controlado: ref del tab activo inicial */
  defaultActive?: string
  /** Callback cuando cambia el tab activo */
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
  /** Identificador que vincula Tab con TabContent */
  ref: string
  active?: boolean
  disabled?: boolean
  children?: Vnode | Vnode[] | string | null
  [key: string]: unknown
}

export interface TabContentAttrs extends ComponentAttrs {
  /** Identificador que vincula TabContent con Tab */
  ref: string
  active?: boolean
  children?: Vnode | Vnode[] | string | null
  [key: string]: unknown
}

export const Tabs: Component<TabsAttrs>
export const Tab: Component<TabAttrs>
export const TabContent: Component<TabContentAttrs>
