import { Component, Vnode } from 'mithril'
import { ComponentAttrs } from '../../types'

export interface ModalAttrs extends ComponentAttrs {
  /** Drives the native <dialog> element's showModal()/close() */
  open?: boolean
  position?: 'top' | 'middle' | 'bottom' | 'start' | 'end'
  onclose?: (e: Event) => void
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
