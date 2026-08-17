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
  size?: 'sm' | 'md' | 'lg'
  children?: Vnode | Vnode[] | string | null
  [key: string]: unknown
}

export interface ChatFooterAttrs extends ComponentAttrs {
  children?: Vnode | Vnode[] | string | null
  [key: string]: unknown
}

export interface ChatWindowAttrs extends ComponentAttrs {
  children?: Vnode | Vnode[] | string | null
  [key: string]: unknown
}

export interface ChatMessageAttrs extends ComponentAttrs {
  placement?: 'start' | 'end'
  name?: string
  time?: string
  status?: 'sent' | 'delivered' | 'read'
  reply?: { name: string; text: string }
  reactions?: Array<{ emoji: string; count: number; reacted?: boolean }>
  color?: PumColor
  size?: 'sm' | 'md' | 'lg'
  children?: Vnode | Vnode[] | string | null
  [key: string]: unknown
}

export interface ChatReplyAttrs extends ComponentAttrs {
  name?: string
  text?: string
  children?: Vnode | Vnode[] | string | null
  [key: string]: unknown
}

export interface ChatReactionsAttrs extends ComponentAttrs {
  reactions?: Array<{ emoji: string; count: number; reacted?: boolean }>
  onReact?: (emoji: string) => void
  children?: Vnode | Vnode[] | string | null
  [key: string]: unknown
}

export interface ChatStatusAttrs extends ComponentAttrs {
  status?: 'sent' | 'delivered' | 'read'
  children?: Vnode | Vnode[] | string | null
  [key: string]: unknown
}

export interface ChatAudioAttrs extends ComponentAttrs {
  src?: string
  duration?: string
  children?: Vnode | Vnode[] | string | null
  [key: string]: unknown
}

export interface ChatVideoAttrs extends ComponentAttrs {
  src?: string
  poster?: string
  children?: Vnode | Vnode[] | string | null
  [key: string]: unknown
}

export interface ChatImageMessageAttrs extends ComponentAttrs {
  src?: string
  alt?: string
  caption?: string
  children?: Vnode | Vnode[] | string | null
  [key: string]: unknown
}

export interface ChatFileAttrs extends ComponentAttrs {
  filename?: string
  href?: string
  size?: string
  icon?: string
  children?: Vnode | Vnode[] | string | null
  [key: string]: unknown
}

export interface ChatLinkAttrs extends ComponentAttrs {
  href?: string
  title?: string
  description?: string
  image?: string
  children?: Vnode | Vnode[] | string | null
  [key: string]: unknown
}

export interface ChatSystemAttrs extends ComponentAttrs {
  type?: 'date' | 'info' | 'action'
  children?: Vnode | Vnode[] | string | null
  [key: string]: unknown
}

export interface ChatInputAttrs extends ComponentAttrs {
  placeholder?: string
  onSend?: (message: string) => void
  onAttach?: () => void
  onEmoji?: () => void
  children?: Vnode | Vnode[] | string | null
  [key: string]: unknown
}

export interface ChatTypingAttrs extends ComponentAttrs {
  name?: string
  children?: Vnode | Vnode[] | string | null
  [key: string]: unknown
}

export interface ChatEmojiAttrs extends ComponentAttrs {
  onSelect?: (emoji: string) => void
  children?: Vnode | Vnode[] | string | null
  [key: string]: unknown
}

export const Chat: Component<ChatAttrs>
export const ChatImage: Component<ChatImageAttrs>
export const ChatHeader: Component<ChatHeaderAttrs>
export const ChatBubble: Component<ChatBubbleAttrs>
export const ChatFooter: Component<ChatFooterAttrs>
export const ChatWindow: Component<ChatWindowAttrs>
export const ChatMessage: Component<ChatMessageAttrs>
export const ChatReply: Component<ChatReplyAttrs>
export const ChatReactions: Component<ChatReactionsAttrs>
export const ChatStatus: Component<ChatStatusAttrs>
export const ChatAudio: Component<ChatAudioAttrs>
export const ChatVideo: Component<ChatVideoAttrs>
export const ChatImageMessage: Component<ChatImageMessageAttrs>
export const ChatFile: Component<ChatFileAttrs>
export const ChatLink: Component<ChatLinkAttrs>
export const ChatSystem: Component<ChatSystemAttrs>
export const ChatInput: Component<ChatInputAttrs>
export const ChatTyping: Component<ChatTypingAttrs>
export const ChatEmoji: Component<ChatEmojiAttrs>
