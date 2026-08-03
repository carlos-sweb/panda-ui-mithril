import { Component, Vnode } from 'mithril'
import { ComponentAttrs, PumSize } from '../../types'

export interface TableContainerAttrs extends ComponentAttrs {
  children?: Vnode | Vnode[] | string | null
  [key: string]: unknown
}

export interface TableAttrs extends ComponentAttrs {
  size?: PumSize
  zebra?: boolean
  pinRows?: boolean
  pinCols?: boolean
  children?: Vnode | Vnode[] | string | null
  [key: string]: unknown
}

export interface TableTheadAttrs extends ComponentAttrs {
  children?: Vnode | Vnode[] | string | null
  [key: string]: unknown
}

export interface TableTbodyAttrs extends ComponentAttrs {
  children?: Vnode | Vnode[] | string | null
  [key: string]: unknown
}

export interface TableTfootAttrs extends ComponentAttrs {
  children?: Vnode | Vnode[] | string | null
  [key: string]: unknown
}

export interface TableRowAttrs extends ComponentAttrs {
  hover?: boolean
  children?: Vnode | Vnode[] | string | null
  [key: string]: unknown
}

export interface TableCellAttrs extends ComponentAttrs {
  children?: Vnode | Vnode[] | string | null
  [key: string]: unknown
}

export interface TableHeadAttrs extends ComponentAttrs {
  children?: Vnode | Vnode[] | string | null
  [key: string]: unknown
}

export const TableContainer: Component<TableContainerAttrs>
export const Table: Component<TableAttrs>
export const TableThead: Component<TableTheadAttrs>
export const TableTbody: Component<TableTbodyAttrs>
export const TableTfoot: Component<TableTfootAttrs>
export const TableRow: Component<TableRowAttrs>
export const TableCell: Component<TableCellAttrs>
export const TableHead: Component<TableHeadAttrs>
