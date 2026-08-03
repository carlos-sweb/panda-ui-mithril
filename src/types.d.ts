import { Vnode } from 'mithril'

export interface ComponentAttrs {
  className?: string
  style?: string
  id?: string
  key?: string | number
  onclick?: (e: MouseEvent) => void
  oncreate?: (vnode: Vnode<unknown>) => void
  onupdate?: (vnode: Vnode<unknown>) => void
  onremove?: (vnode: Vnode<unknown>) => void
  onbeforeremove?: (vnode: Vnode<unknown>) => void | Promise<void>
  onbeforeupdate?: (vnode: Vnode<unknown>, old: Vnode<unknown>) => boolean | void
}

export type PumSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
export type PumColor = 'neutral' | 'primary' | 'secondary' | 'accent' | 'info' | 'success' | 'warning' | 'error'
export type PumStyle = 'outline' | 'dash' | 'soft' | 'ghost' | 'link'
