import { Component, Vnode } from 'mithril'
import { ComponentAttrs, PumColor } from '../../types'

export type NavbarPosition = 'static' | 'sticky' | 'fixed'
export type NavbarShadow = 'none' | 'sm' | 'md' | 'lg'
export type NavbarSize = 'sm' | 'md' | 'lg'

export interface NavbarAttrs extends ComponentAttrs {
  /** Position of the navbar (MUI AppBar pattern). Default: 'static'. */
  position?: NavbarPosition
  /** Semantic color: sets --navbar-bg / --navbar-fg. Default: 'base'. */
  color?: PumColor | 'base'
  /** Height preset (min-height). Default: 'md' (4rem). */
  size?: NavbarSize
  /** Bottom border (base-300). Default: false. */
  border?: boolean
  /** Drop shadow. Default: 'none'. */
  shadow?: NavbarShadow
  /** Translucent background + backdrop blur. Default: false. */
  glass?: boolean
  /** Wrap content in a max-width centered container (--navbar-max-w, default 80rem). Default: false. */
  container?: boolean
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

export interface NavbarBrandAttrs extends ComponentAttrs {
  /** Link target. */
  href?: string
  onclick?: (e: Event) => void
  children?: Vnode | Vnode[] | string | null
  [key: string]: unknown
}

export interface NavbarLinkAttrs extends ComponentAttrs {
  /** Link target. */
  href?: string
  /** Highlight as the current page (pill + aria-current="page"). */
  active?: boolean
  /** Visually disabled (dimmed, no pointer). */
  disabled?: boolean
  onclick?: (e: Event) => void
  children?: Vnode | Vnode[] | string | null
  [key: string]: unknown
}

export interface NavbarMenuAttrs extends ComponentAttrs {
  children?: Vnode | Vnode[] | string | null
  [key: string]: unknown
}

export interface NavbarToggleAttrs extends ComponentAttrs {
  /** Icon swap: Menu when closed, X when open. */
  open?: boolean
  onclick?: (e: Event) => void
  children?: Vnode | Vnode[] | string | null
  [key: string]: unknown
}

export const Navbar: Component<NavbarAttrs>
export const NavbarStart: Component<NavbarStartAttrs>
export const NavbarCenter: Component<NavbarCenterAttrs>
export const NavbarEnd: Component<NavbarEndAttrs>
export const NavbarBrand: Component<NavbarBrandAttrs>
export const NavbarLink: Component<NavbarLinkAttrs>
export const NavbarMenu: Component<NavbarMenuAttrs>
export const NavbarToggle: Component<NavbarToggleAttrs>
