import { Component, Vnode } from 'mithril'
import { ComponentAttrs, PumColor } from '../../types'

export interface ChatAttrs extends ComponentAttrs {
  placement?: 'start' | 'end'
  children?: Vnode | Vnode[] | string | null
  [key: string]: unknown
}

export interface ChatImageAttrs extends ComponentAttrs {
  children?: Vnode | Vnode[] | string | null
  [key: string]: unknown
}

export interface ChatHeaderAttrs extends ComponentAttrs {
  children?: Vnode | Vnode[] | string | null
  [key: string]: unknown
}

export interface ChatBubbleAttrs extends ComponentAttrs {
  color?: PumColor
  children?: Vnode | Vnode[] | string | null
  [key: string]: unknown
}

export interface ChatFooterAttrs extends ComponentAttrs {
  children?: Vnode | Vnode[] | string | null
  [key: string]: unknown
}

export const Chat: Component<ChatAttrs>
export const ChatImage: Component<ChatImageAttrs>
export const ChatHeader: Component<ChatHeaderAttrs>
export const ChatBubble: Component<ChatBubbleAttrs>
export const ChatFooter: Component<ChatFooterAttrs>
