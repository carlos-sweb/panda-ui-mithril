import { Component, Vnode } from 'mithril'
import { ComponentAttrs } from '../../types'

export interface ModalAttrs extends ComponentAttrs {
  /** Drives the native <dialog> element's showModal()/close() */
  open?: boolean
  position?: 'top' | 'middle' | 'bottom' | 'start' | 'end'
  onclose?: (e: Event) => void
  /** NUEVO — ancho máximo del panel (xs=320px, sm=384px, md=512px, lg=768px) */
  size?: 'xs' | 'sm' | 'md' | 'lg'
  /** NUEVO — si true, Escape y click en backdrop no cierran el modal */
  persistent?: boolean
  /** NUEVO — si false, no se muestra botón de cierre (default true) */
  closable?: boolean
  /** When true, automatically appends a ButtonClose inside ModalBox — closes with the exit animation */
  buttonClose?: boolean
  /** NUEVO — id del elemento que etiqueta el modal */
  labelledby?: string
  /** NUEVO — id del elemento que describe el modal */
  describedby?: string
  /** NUEVO — se dispara DESPUÉS de completar la animación de salida */
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
