import { Component, Vnode } from 'mithril'
import { ComponentAttrs } from '../../types'

/**
 * `ComponentAttrs`'s own `key` (Mithril's vnode key, a string or a number) is
 * omitted on purpose: below, `key` is the DEPRECATED alias of `itemKey` and
 * takes a function, which is incompatible with the vnode key. Extending the
 * interface directly is a type error ("incorrectly extends ComponentAttrs")
 * that `skipLibCheck` hides, so consumers inheriting ListAttrs would hit it.
 */
export interface ListAttrs<T = unknown> extends Omit<ComponentAttrs, 'key'> {
  /**
   * Data array. When passed, the row template is repeated per item
   * (data-driven mode). Without `data`, the explicit children are used
   * (`ListRow`/`ListCol`).
   */
  data?: readonly T[]
  /**
   * Row template: `(item, index) => vnode`. It repeats `data.length` times.
   * Required when `data` is passed (alternative: a single child function).
   */
  render?: (item: T, index: number) => Vnode | null
  /**
   * Row key accessor for Mithril diffing when
   * resizing/reordering: `(item, index) => string | number`. Default:
   * index. It is also used as the signature of `sortable` mode (it recreates the
   * SortableJS instance when the set of keys changes).
   */
  itemKey?: (item: T, index: number) => string | number
  /**
   * @deprecated Alias of `itemKey`, kept for compatibility. In Mithril
   * `key` IS the vnode key: using it here pushes List's `<ul>` into the keyed
   * diff and breaks the fragment invariant (all keys or none) if the
   * list lives alongside siblings without a key. Migrate to `itemKey`.
   */
  key?: (item: T, index: number) => string | number
  /** Static row at the start of the list (data-driven mode only). */
  header?: Vnode | null
  /** Static row at the end of the list (data-driven mode only). */
  footer?: Vnode | null
  /** Vnodes to show when `data` is empty. */
  empty?: Vnode | Vnode[] | null
  /** While it is `true`, shows `loadingRows` Skeleton rows instead of the data. */
  loading?: boolean
  /** Number of Skeleton rows with `loading`. Default: 3. */
  loadingRows?: number
  /** Applies the `hover` highlight to all `ListRow` rows in data-driven mode. */
  hover?: boolean
  /** Renders `<ol>` instead of `<ul>`. */
  ordered?: boolean
  /**
   * Enables reordering rows by dragging them (data-driven mode only,
   * "sortable-self"). The drag is NOT implemented from scratch: List wraps
   * SortableJS internally. By default the whole row is dragged; if the
   * template includes a `ListDragHandle`, the drag only starts from the handle
   * (recommended when the row has buttons/inputs).
   */
  sortable?: boolean
  /**
   * Controlled callback with the new order when a row is dropped:
   * `(next: T[]) => void`. List never mutates `data` — update your array from
   * `next` (the Pagination/Table pattern). If the array does not change, the list
   * returns to its previous order on the next redraw.
   */
  onReorder?: (next: T[]) => void
  /**
   * In data-driven mode the children can be ONE function
   * `(item, index) => vnode` — the template repeated per item (alternative to
   * the `render` prop). It must be the only child. With `data` and no template
   * an error is thrown.
   */
  children?: Vnode | Vnode[] | string | ((item: T, index: number) => Vnode | null) | null
  [key: string]: unknown
}

export interface ListRowAttrs extends ComponentAttrs {
  hover?: boolean
  children?: Vnode | Vnode[] | string | null
  [key: string]: unknown
}

export interface ListColAttrs extends ComponentAttrs {
  grow?: boolean
  wrap?: boolean
  children?: Vnode | Vnode[] | string | null
  [key: string]: unknown
}

export interface ListDragHandleAttrs extends ComponentAttrs {
  /**
   * Size of the GripVertical icon in px. Default: 16.
   */
  size?: number
  children?: Vnode | Vnode[] | string | null
  [key: string]: unknown
}

export const List: Component<ListAttrs>
export const ListRow: Component<ListRowAttrs>
export const ListCol: Component<ListColAttrs>
export const ListDragHandle: Component<ListDragHandleAttrs>
