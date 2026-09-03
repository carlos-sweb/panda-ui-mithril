import { Component, Vnode } from 'mithril'
import { ComponentAttrs } from '../../types'

export interface ListAttrs<T = unknown> extends ComponentAttrs {
  /**
   * Array de datos. Cuando se pasa, el template de fila se repite por item
   * (modo data-driven). Sin `data`, se usan los children explícitos
   * (`ListRow`/`ListCol`).
   */
  data?: readonly T[]
  /**
   * Template de fila: `(item, index) => vnode`. Se repite `data.length` veces.
   * Obligatorio cuando se pasa `data` (alternativa: un único child función).
   */
  render?: (item: T, index: number) => Vnode | null
  /**
   * Accessor de key para el diffing de Mithril al redimensionar/reordenar:
   * `(item, index) => string | number`. Default: índice.
   */
  key?: (item: T, index: number) => string | number
  /** Fila estática al inicio de la lista (solo modo data-driven). */
  header?: Vnode | null
  /** Fila estática al final de la lista (solo modo data-driven). */
  footer?: Vnode | null
  /** Vnodes a mostrar cuando `data` está vacío. */
  empty?: Vnode | Vnode[] | null
  /** Mientras es `true`, muestra `loadingRows` filas Skeleton en vez de los datos. */
  loading?: boolean
  /** Cantidad de filas Skeleton con `loading`. Default: 3. */
  loadingRows?: number
  /** Aplica el resaltado `hover` a todas las filas `ListRow` en modo data-driven. */
  hover?: boolean
  /** Renderiza `<ol>` en vez de `<ul>`. */
  ordered?: boolean
  /**
   * Habilita reordenar las filas arrastrándolas (solo modo data-driven,
   * "sortable-self"). El drag NO se implementa desde cero: List envuelve
   * SortableJS internamente. Por defecto se arrastra la fila completa; si el
   * template incluye un `ListDragHandle`, el drag solo arranca desde el asa
   * (recomendado cuando la fila tiene botones/inputs).
   */
  sortable?: boolean
  /**
   * Callback controlado con el nuevo orden al soltar una fila:
   * `(next: T[]) => void`. List nunca muta `data` — actualiza tu array desde
   * `next` (patrón de Pagination/Table). Si el array no cambia, la lista
   * vuelve a su orden previo en el próximo redraw.
   */
  onReorder?: (next: T[]) => void
  /**
   * En modo data-driven los children pueden ser UNA función
   * `(item, index) => vnode` — el template repetido por item (alternativa al
   * prop `render`). Debe ser el único child. Con `data` sin template se lanza
   * un error.
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
   * Tamaño del icono GripVertical en px. Default: 16.
   */
  size?: number
  children?: Vnode | Vnode[] | string | null
  [key: string]: unknown
}

export const List: Component<ListAttrs>
export const ListRow: Component<ListRowAttrs>
export const ListCol: Component<ListColAttrs>
export const ListDragHandle: Component<ListDragHandleAttrs>
