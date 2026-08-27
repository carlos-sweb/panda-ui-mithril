import { Component, Vnode } from 'mithril'
import { ComponentAttrs } from '../../types'

export interface DrawerAttrs extends ComponentAttrs {
  /** Drives the native <dialog> element's showModal()/close() */
  open?: boolean
  /** Edge the drawer docks to. Default: 'start' */
  position?: 'top' | 'bottom' | 'start' | 'end'
  /** Preset size (xs–full) or any CSS width/height for the panel (e.g. "55%", 200). Default: 'md' */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full' | string | number
  /** When true, ESC and backdrop clicks do not close the drawer */
  persistent?: boolean
  /** When true, automatically appends a ButtonClose inside DrawerBox — closes with the exit animation */
  buttonClose?: boolean
  /** id of the element that labels the drawer */
  labelledby?: string
  /** id of the element that describes the drawer */
  describedby?: string
  /** Fired after the drawer opens (showModal), on the closed→open transition */
  onopen?: () => void
  /** Native <dialog> 'close' event — fired when the dialog closes (ESC, X, or programmatic close) */
  onclose?: (e: Event) => void
  /** Fired AFTER the exit animation completes and the dialog is closed */
  onclosed?: () => void
  /** Fired on every open/close state change: onchange(true) on open, onchange(false) after close */
  onchange?: (open: boolean) => void
  children?: Vnode | Vnode[] | string | null
  [key: string]: unknown
}

export interface DrawerBoxAttrs extends ComponentAttrs {
  children?: Vnode | Vnode[] | string | null
  [key: string]: unknown
}

export interface DrawerActionAttrs extends ComponentAttrs {
  children?: Vnode | Vnode[] | string | null
  [key: string]: unknown
}

export interface DrawerBackdropAttrs extends ComponentAttrs {
  onclick?: (e: MouseEvent) => void
  [key: string]: unknown
}

export interface DrawerHeaderAttrs extends ComponentAttrs {
  children?: Vnode | Vnode[] | string | null
  [key: string]: unknown
}

export interface DrawerBodyAttrs extends ComponentAttrs {
  children?: Vnode | Vnode[] | string | null
  [key: string]: unknown
}

export interface DrawerFooterAttrs extends ComponentAttrs {
  children?: Vnode | Vnode[] | string | null
  [key: string]: unknown
}

export const Drawer: Component<DrawerAttrs>
export const DrawerBox: Component<DrawerBoxAttrs>
export const DrawerAction: Component<DrawerActionAttrs>
export const DrawerBackdrop: Component<DrawerBackdropAttrs>
export const DrawerHeader: Component<DrawerHeaderAttrs>
export const DrawerBody: Component<DrawerBodyAttrs>
export const DrawerFooter: Component<DrawerFooterAttrs>
