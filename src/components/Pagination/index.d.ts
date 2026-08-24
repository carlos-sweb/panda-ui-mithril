import { Component, Vnode } from 'mithril'
import { ComponentAttrs, PumSize } from '../../types'

export interface PaginationAttrs extends ComponentAttrs {
  /** Current page (1-based). */
  page?: number
  /** Total number of pages. */
  pageCount?: number
  /** Fired when a page, prev/next or edge is clicked. */
  onchange?: (page: number) => void
  /** Initial page for uncontrolled use. */
  defaultPage?: number
  /** joined (default): buttons attached with collapsed borders. separated: gap between buttons. */
  variant?: 'joined' | 'separated'
  /** square (default) or circle buttons. */
  shape?: 'square' | 'circle'
  /** Pages shown around the current one. Default 1. */
  siblings?: number
  /** Pages shown at the edges. Default 1. */
  boundaries?: number
  /** Show prev/next buttons. Default true. */
  withControls?: boolean
  /** Show first/last buttons. Default false. */
  withEdges?: boolean
  /** Render nothing when pageCount <= 1. Default false. */
  hideWithOnePage?: boolean
  /** When provided, items render as <a href={getHref(page)}>. */
  getHref?: (page: number) => string
  /** Custom prev/next/edge labels (text or vnode; default lucide chevrons). */
  prevLabel?: string | Vnode
  nextLabel?: string | Vnode
  firstLabel?: string | Vnode
  lastLabel?: string | Vnode
  /** Button scale (xs..xl). Default md. */
  size?: PumSize
  'aria-label'?: string
  children?: Vnode | Vnode[] | string | null
  [key: string]: unknown
}

export interface PaginationButtonAttrs extends ComponentAttrs {
  active?: boolean
  disabled?: boolean
  children?: Vnode | Vnode[] | string | null
  [key: string]: unknown
}

export const Pagination: Component<PaginationAttrs>
export const PaginationButton: Component<PaginationButtonAttrs>
