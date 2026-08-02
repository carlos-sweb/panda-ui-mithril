import { Component, Vnode } from 'mithril'
import { ComponentAttrs } from '../../types'

export interface BreadcrumbItem {
  label: string
  href?: string
}

export interface BreadcrumbsAttrs extends ComponentAttrs {
  items?: BreadcrumbItem[]
  children?: Vnode | Vnode[] | string | null
  [key: string]: unknown
}

export const Breadcrumbs: Component<BreadcrumbsAttrs>
