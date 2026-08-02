import { Component, Vnode } from 'mithril'
import { ComponentAttrs } from '../../types'

export interface NavbarAttrs extends ComponentAttrs {
  children?: Vnode | Vnode[] | string | null
  [key: string]: unknown
}

export interface NavbarStartAttrs extends ComponentAttrs {
  children?: Vnode | Vnode[] | string | null
  [key: string]: unknown
}

export interface NavbarCenterAttrs extends ComponentAttrs {
  children?: Vnode | Vnode[] | string | null
  [key: string]: unknown
}

export interface NavbarEndAttrs extends ComponentAttrs {
  children?: Vnode | Vnode[] | string | null
  [key: string]: unknown
}

export const Navbar: Component<NavbarAttrs>
export const NavbarStart: Component<NavbarStartAttrs>
export const NavbarCenter: Component<NavbarCenterAttrs>
export const NavbarEnd: Component<NavbarEndAttrs>
