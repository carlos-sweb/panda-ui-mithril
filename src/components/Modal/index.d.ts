import { Component, Vnode } from 'mithril'
import { ComponentAttrs } from '../../types'

export interface ModalAttrs extends ComponentAttrs {
  /** Drives the native <dialog> element's showModal()/close() */
  open?: boolean
  position?: 'top' | 'middle' | 'bottom' | 'start' | 'end'
  onclose?: (e: Event) => void
  /** NEW — maximum width of the panel (xs=320px, sm=384px, md=512px, lg=768px) */
  size?: 'xs' | 'sm' | 'md' | 'lg'
  /** NEW — if true, Escape and backdrop click do not close the modal */
  persistent?: boolean
  /** NEW — if false, no close button is shown (default true) */
  closable?: boolean
  /** When true, automatically appends a ButtonClose inside ModalBox — closes with the exit animation */
  buttonClose?: boolean
  /** NEW — id of the element that labels the modal */
  labelledby?: string
  /** NEW — id of the element that describes the modal */
  describedby?: string
  /** NEW — fires AFTER the exit animation completes */
  onclosed?: () => void
  children?: Vnode | Vnode[] | string | null
  [key: string]: unknown
}

export interface ModalBoxAttrs extends ComponentAttrs {
  children?: Vnode | Vnode[] | string | null
  [key: string]: unknown
}

export interface ModalActionAttrs extends ComponentAttrs {
  children?: Vnode | Vnode[] | string | null
  [key: string]: unknown
}

export interface ModalBackdropAttrs extends ComponentAttrs {
  onclick?: (e: MouseEvent) => void
  [key: string]: unknown
}

export interface ModalToggleAttrs extends ComponentAttrs {
  [key: string]: unknown
}

export const Modal: Component<ModalAttrs>
export const ModalBox: Component<ModalBoxAttrs>
export const ModalAction: Component<ModalActionAttrs>
export const ModalBackdrop: Component<ModalBackdropAttrs>
export const ModalToggle: Component<ModalToggleAttrs>
