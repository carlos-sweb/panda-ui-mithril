import { Component, Vnode } from 'mithril'
import { ComponentAttrs, PumSize } from '../../types'

export type DropdownPlacement =
  | 'bottom-start'
  | 'bottom-center'
  | 'bottom-end'
  | 'top-start'
  | 'top-center'
  | 'top-end'
  | 'left-start'
  | 'left-center'
  | 'left-end'
  | 'right-start'
  | 'right-center'
  | 'right-end'

export interface DropdownAttrs extends ComponentAttrs {
  /** Controlled mode: drives the open state from outside. */
  open?: boolean
  /** Uncontrolled mode: initial open state (default false). */
  defaultOpen?: boolean
  /** Fired when the open state changes (controlled mode). */
  onchange?: (open: boolean) => void
  /** Where the panel opens relative to the trigger. Default 'bottom-start'. */
  placement?: DropdownPlacement
  /** Open on click (default) or hover. */
  trigger?: 'click' | 'hover'
  /** Gap between trigger and panel. Default 'sm'. */
  offset?: PumSize
  /** Panel width: auto (default, fits content) or fixed xs..xl (12rem..20rem). */
  width?: PumSize
  /** Close when a menu item is selected. Default true. */
  closeOnSelect?: boolean
  /** Close on outside click. Default true. */
  closeOnOutside?: boolean
  /** Close on Escape. Default true. */
  closeOnEscape?: boolean
  children?: Vnode | Vnode[] | string | null
  [key: string]: unknown
}

export interface DropdownTriggerAttrs extends ComponentAttrs {
  children?: Vnode | Vnode[] | string | null
  [key: string]: unknown
}

export interface DropdownContentAttrs extends ComponentAttrs {
  children?: Vnode | Vnode[] | string | null
  [key: string]: unknown
}

export const Dropdown: Component<DropdownAttrs>
export const DropdownTrigger: Component<DropdownTriggerAttrs>
export const DropdownContent: Component<DropdownContentAttrs>
