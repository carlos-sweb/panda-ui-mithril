import { Component, Vnode } from 'mithril'
import { ComponentAttrs, PumSize } from '../../types'

export interface MenuAttrs extends ComponentAttrs {
  size?: PumSize
  horizontal?: boolean
  /** When true, Menu tracks which MenuItem is active and updates on click */
  autoActive?: boolean
  /** Index of the initially active item (used with autoActive) */
  defaultActive?: number
  /** Callback fired when active item changes (index: number) */
  onActiveChange?: (index: number) => void
  children?: Vnode | Vnode[] | string | null
  [key: string]: unknown
}

export interface MenuItemAttrs extends ComponentAttrs {
  active?: boolean
  disabled?: boolean
  children?: Vnode | Vnode[] | string | null
  [key: string]: unknown
}

export interface MenuTitleAttrs extends ComponentAttrs {
  children?: Vnode | Vnode[] | string | null
  [key: string]: unknown
}

export interface MenuDropdownAttrs extends ComponentAttrs {
  children?: Vnode | Vnode[] | string | null
  [key: string]: unknown
}

export interface MenuDropdownToggleAttrs extends ComponentAttrs {
  children?: Vnode | Vnode[] | string | null
  [key: string]: unknown
}

export const Menu: Component<MenuAttrs>
export const MenuItem: Component<MenuItemAttrs>
export const MenuTitle: Component<MenuTitleAttrs>
export const MenuDropdown: Component<MenuDropdownAttrs>
export const MenuDropdownToggle: Component<MenuDropdownToggleAttrs>
