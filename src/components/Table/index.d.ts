import { Component, Vnode } from 'mithril'
import { ComponentAttrs, PumSize } from '../../types'

export type TableSortDirection = 'asc' | 'desc'
export type TableSortType = 'string' | 'number' | 'date'

export interface TableSort {
  key: string
  direction: TableSortDirection
}

export interface TableColumn<T = Record<string, unknown>> {
  /** Column key (used as the th key and to read item[key] by default). */
  key: string
  /** Header text (or use `header` for a custom th). */
  title?: string
  /** Cell/header alignment. */
  align?: 'left' | 'center' | 'right'
  /** Column width (any CSS width). */
  width?: string | number
  /** Custom header cell content. */
  header?: (col: TableColumn<T>) => Vnode | string
  /** Custom cell renderer. `row` carries { index, data }. */
  render?: (item: T, row: { index: number; data: T[] }) => Vnode | string
  /** Allow sorting by this column (click header: asc → desc → none). */
  sortable?: boolean
  /** Force the comparison type; default: auto-detected from the data. */
  sortType?: TableSortType
  /** Custom comparator (overrides sortType). */
  sort?: (a: T, b: T) => number
}

export interface TableContainerAttrs extends ComponentAttrs {
  /** Max height — creates the vertical scroll region (pairs with Table `stickyHeader`). */
  maxHeight?: string | number
  children?: Vnode | Vnode[] | string | null
  [key: string]: unknown
}

export interface TableAttrs<T = Record<string, unknown>> extends ComponentAttrs {
  size?: PumSize
  zebra?: boolean
  /** Full grid: outer border + vertical dividers between columns. */
  bordered?: boolean
  pinRows?: boolean
  /** Sticky header: the thead stays fixed while the body scrolls (pair with `maxHeight`). */
  stickyHeader?: boolean
  /** Max height of the internal scroll region (data-driven mode; pairs with `stickyHeader`). */
  maxHeight?: string | number
  pinCols?: boolean
  hover?: boolean
  /**
   * Data-driven mode: when `data` is provided the Table renders the columns
   * config and paginates automatically (Pagination appears when there is
   * more than one page). Without `data` the compositive mode is used.
   */
  data?: T[]
  /** Column config for the data-driven mode. */
  columns?: TableColumn<T>[]
  /** Row key for diffing (default: index). */
  rowKey?: (item: T, index: number) => string | number
  /** Rows per page. Default: 10. */
  pageSize?: number
  /** Uncontrolled initial rows per page (default: 10). */
  defaultPageSize?: number
  /** Show a "rows per page" selector with these options (e.g. [5, 10, 25, 50]). */
  pageSizeOptions?: number[]
  /** Custom "rows per page" label (default: i18n — "Rows per page" / "Filas por página"). */
  perPageLabel?: string
  /** Notifies rows-per-page changes (page resets to 1). */
  onPageSizeChange?: (pageSize: number) => void
  /** Controlled current page (Pagination contract). */
  page?: number
  /** Uncontrolled initial page. */
  defaultPage?: number
  /** Notifies page changes (controlled or not). */
  onchange?: (page: number) => void
  /**
   * `false` disables pagination (all rows shown). An object passes extra
   * props to the internal Pagination (variant, shape, size, siblings, ...).
   */
  pagination?: boolean | Record<string, unknown>
  /** Empty state content (rendered as a row spanning all columns). */
  empty?: Vnode | string
  /** Show skeleton rows while loading. */
  loading?: boolean
  /** Number of skeleton rows while loading (default: 3). */
  loadingRows?: number
  /** Controlled sort state. */
  sort?: TableSort | null
  /** Uncontrolled initial sort. */
  defaultSort?: TableSort | null
  /** Notifies sort changes (null clears the sort). */
  onSortChange?: (sort: TableSort | null) => void
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
