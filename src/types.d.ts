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

export type DaisySize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
export type DaisyColor = 'neutral' | 'primary' | 'secondary' | 'accent' | 'info' | 'success' | 'warning' | 'error'
export type DaisyStyle = 'outline' | 'dash' | 'soft' | 'ghost' | 'link'
