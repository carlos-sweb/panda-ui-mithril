import m from 'mithril'
import { GripVertical } from 'lucide-mithril'
import { list } from '../../../styled-system/recipes'
import { cx } from '../../../styled-system/css'
import { Skeleton } from '../Skeleton/index.js'
import { createListSortable, destroyListSortable } from './sortable.js'

/**
 * List component. Vertical list with separators between rows; the children
 * (`ListRow`/`ListCol`) are laid out in a grid. Uses the recipe's `list` slot.
 *
 * Usage modes:
 *  - **Compositional** (no `data`): explicit children (`ListRow`/`ListCol`).
 *  - **Data-driven** (with `data`): the template repeats per item via the prop
 *    `render={(item, index) => vnode}`. `itemKey` controls diffing when
 *    resizing/reordering (default: index). `header`/`footer` add
 *    static rows, `empty` the empty state, `loading`/`loadingRows` Skeleton
 *    rows, `hover` highlights all rows and `ordered` renders `<ol>`.
 *    The children can also be ONE function `(item, index) => vnode`
 *    (only child) as a legacy alternative to `render`.
 *
 *  - **Sortable (sortable-self)**: with `sortable` the rows of
 *    data-driven mode are reordered by dragging them. The drag is NOT implemented from
 *    scratch: List wraps SortableJS internally (see ./sortable.js); the
 *    public API is controlled — List never mutates `data`, on dropping a row it calls
 *    `onReorder(next)` and the parent updates its array (the Pagination/
 *    Table pattern). By default the whole row is dragged; if the template includes
 *    a `ListDragHandle`, the drag only starts from the handle (recommended
 *    when the row has buttons/inputs). `header`/`footer` are static
 *    rows: they are not draggable and do not count in the reordered index, so
 *    they can be combined with `sortable` (see draggableIndexOf).
 *
 * Note: `header`/`footer` only apply in data-driven mode (in
 * compositional mode the header is added as a normal `ListRow`).
 *
 * @type {import('mithril').Component<import('./index').ListAttrs>}
 */
export const List = {
  // The sortable state lives in `sortRecords`, a WeakMap keyed by the
  // DOM element of the <ul>: it survives even if Mithril recreates the component
  // (vnode.state is not stable here) and is cleaned up only in onremove.
  oncreate(vnode) { syncSortable(vnode) },
  onupdate(vnode) { syncSortable(vnode) },

  // While SortableJS moves the drag DOM, Mithril must not diff this
  // list (it would patch on top of the dragged element). The guard is cleared in
  // onEnd and the final redraw reconciles the new order. Safety net: if a
  // drag got "stuck" (drop outside the window without dragend), the guard
  // expires after 4 s and the list updates again.
  onbeforeupdate(vnode) {
    const rec = vnode.dom && sortRecords.get(vnode.dom)
    if (!rec || !rec.dragging) return true
    if (Date.now() - rec.dragAt > 4000) {
      rec.dragging = false
      setDraggingCursor(false)
      return true
    }
    return false
  },

  onremove(vnode) {
    const el = vnode.dom
    const rec = el && sortRecords.get(el)
    if (rec) {
      rec.instance = destroyListSortable(rec.instance)
      sortRecords.delete(el)
    }
    // If the list unmounts in the middle of a drag, the cursor must not stay
    // stuck on "grabbing".
    setDraggingCursor(false)
  },

  view(vnode) {
    const { data, empty, header, footer, loading, loadingRows, hover, ordered, sortable, className, ...rest } = vnode.attrs
    const children = vnode.children
    // Row key: `itemKey` (current) with `key` as a deprecated alias. `key` is NOT
    // read directly at each use because it collides with Mithril's vnode
    // key (see itemKeyOf).
    const rowKey = itemKeyOf(vnode.attrs)

    // Resolves the template: `render` prop first; function children (only
    // child) as an alternative. Mithril wraps the function in an array [fn].
    const render = vnode.attrs.render
    const template = typeof render === 'function'
      ? render
      : (Array.isArray(children) && children.length === 1 && typeof children[0] === 'function')
        ? children[0]
        : null

    if (Array.isArray(data) && data.length > 0 && !template) {
      throw new Error(
        'List: `data` was passed without a template. Use `render={(item, index) => ...}` ' +
        'or a single child function. (If you mixed a function with other children, ' +
        'the function must be the only child, or move it to the `render` prop.)'
      )
    }

    const tag = ordered ? 'ol' : 'ul'

    // Sortable mode: data-driven only (the compositional one has no controllable
    // model); the detail (≥2 rows, no loading) is decided in the hook.
    const sortActive = sortable && Array.isArray(data)

    let rows
    if (Array.isArray(data)) {
      if (loading) {
        // Skeleton row for each placeholder; all of them keyed (Mithril rule).
        // The `list-row-loading` class is the recipe's hook (list.ts) to
        // size the skeletons as text lines.
        rows = Array.from({ length: loadingRows || 3 }, (_, i) =>
          m(ListRow, { key: `__loading-${i}__`, hover, className: 'list-row-loading' }, [
            // No `grow`: the recipe's `.list-row-loading` rule defines the grid
            // (1fr + 4.5rem); a `grow` would trigger the higher-specificity
            // `:has(...)` rule and break the second column.
            m(ListCol, null, m(Skeleton)),
            m(ListCol, null, m(Skeleton)),
          ])
        )
      } else if (data.length === 0) {
        // Empty state: header/empty/footer, all unkeyed (they never coexist
        // with keyed rows).
        rows = [
          ...(header != null ? [header] : []),
          ...(empty != null ? (Array.isArray(empty) ? empty : [empty]) : []),
          ...(footer != null ? [footer] : []),
        ]
      } else {
        const mapRow = (item, index) => {
          const row = template(item, index)
          if (row == null) return null
          // Injects a key if the template did not set one (Mithril diffing).
          const keyValue = rowKey ? rowKey(item, index) : index
          let out = row
          const attrs = { ...(row.attrs || {}) }
          let changed = false
          if (row.key == null && keyValue != null) { attrs.key = keyValue; changed = true }
          // `hover` at the List level: applies the highlight to ListRow rows.
          if (hover && out.tag === ListRow && !attrs.hover) { attrs.hover = true; changed = true }
          return changed ? m(out.tag, attrs, out.children) : out
        }
        // header/footer with reserved keys to keep the whole array keyed;
        // in sortable mode they are marked as static (not draggable).
        rows = [
          ...(header != null ? [staticRow(sortActive, withKey(header, '__header__'))] : []),
          ...data.map(mapRow).filter((row) => row != null),
          ...(footer != null ? [staticRow(sortActive, withKey(footer, '__footer__'))] : []),
        ]
      }
    } else {
      rows = children
    }

    return m(tag, {
      className: cx('list', defaultStyles.list, sortActive && 'list-sortable', className),
      ...rest
    }, rows)
  }
}

/**
 * Cached result of `list({})` — the main component passes no variants,
 * so the classes are deterministic. Avoids calling sva on every render.
 * @type {ReturnType<typeof list>}
 */
const defaultStyles = list({})

/**
 * Per-element registry for sortable mode. It is kept in a WeakMap keyed by
 * the <ul> (the DOM element survives component recreation), never in
 * vnode.state.
 * @type {WeakMap<Element, { instance: object|null, sig: string|null, current: {data: unknown[], onReorder?: Function}|null, dragging: boolean, dragAt: number, fromIndex: number }>}
 */
const sortRecords = new WeakMap()

/** Returns (creating it if missing) the element's sortable record. */
function getSortRecord(el) {
  let rec = sortRecords.get(el)
  if (!rec) {
    rec = { instance: null, sig: null, current: null, dragging: false, dragAt: 0, fromIndex: -1 }
    sortRecords.set(el, rec)
  }
  return rec
}

/**
 * Marks the document as "dragging" so the cursor stays
 * `grabbing` throughout the whole drag (the `body.list-dragging` rule in the
 * preset's `globalCss`), even if the pointer leaves the dragged row or
 * lands on top of another component. It is called in onStart and cleared in
 * onEnd, on guard expiry and in onremove.
 */
function setDraggingCursor(on) {
  if (typeof document === 'undefined' || !document.body) return
  document.body.classList.toggle('list-dragging', !!on)
}

/** Clones the vnode injecting `key` if it does not have one. */
function withKey(row, keyValue) {
  if (row == null || row.key != null || keyValue == null) return row
  return m(row.tag, { ...row.attrs, key: keyValue }, row.children)
}

/**
 * Data-driven mode's row key prop: `itemKey` (current name) or
 * `key` (deprecated alias, kept for compatibility).
 *
 * Why `itemKey` and not `key`: in Mithril `attrs.key` IS the vnode key,
 * so passing the row key function as `key` makes List's `<ul>`
 * travel through the keyed diff. In isolation it works (Mithril indexes the
 * keys in an `Object.create(null)`, and the same arrow source coerces to the
 * same string), but next to unkeyed siblings it breaks the keyed
 * fragment invariant (Mithril requires all keys or none) and the diff skips.
 * With `itemKey` the list has no vnode key and composes with any
 * sibling. Only functions are accepted; any other value falls back to the index.
 */
function itemKeyOf(attrs) {
  if (typeof attrs.itemKey === 'function') return attrs.itemKey
  if (typeof attrs.key === 'function') return attrs.key
  return null
}

/**
 * Index of `node` among the DRAGGABLE rows of `container`, that is,
 * ignoring the static rows (header/footer's `list-static`) — the index
 * the `data` array expects.
 *
 * It is computed from the DOM on purpose. SortableJS event indices
 * (`oldDraggableIndex`/`newDraggableIndex`) do NOT work when there are static
 * rows: its default `draggable` option for `<ul>` is `'>li'` and its
 * `index()` counts every sibling matching the selector, including the one
 * `filter: '.list-static'` excludes from the drag (verified with SortableJS
 * 1.15.7: with a static header, oldDraggableIndex === oldIndex). Using them
 * as `data` indices shifted the reorder by one position and the guard
 * discarded the drop to the last position. The DOM is also the source of
 * truth of what the user sees, and it is already read in the deferred tick (when
 * SortableJS finished moving the node).
 */
function draggableIndexOf(container, node) {
  if (!container || !node || node.parentNode !== container) return -1
  let index = 0
  for (let el = node.previousElementSibling; el; el = el.previousElementSibling) {
    if (!el.classList.contains('list-static')) index++
  }
  return index
}

/** Marks a row as static (not draggable in sortable mode). */
function staticRow(active, row) {
  if (!active || row == null) return row
  const attrs = { ...(row.attrs || {}) }
  attrs.className = cx(attrs.className, 'list-static')
  return m(row.tag, attrs, row.children)
}

/**
 * Creates/updates the Sortable instance for `sortable` mode. It is (re)created only
 * when the "signature" of the rows (keys) or the mode changes — SortableJS caches
 * the children and would be left with stale references when adding/removing items.
 */
function syncSortable(vnode) {
  const el = vnode.dom
  if (!el) return

  const rec = getSortRecord(el)
  const { sortable, data, loading } = vnode.attrs
  const rowKey = itemKeyOf(vnode.attrs)

  const enabled = sortable && Array.isArray(data) && !loading && data.length > 1

  if (!enabled) {
    if (rec.instance) rec.instance = destroyListSortable(rec.instance)
    el.classList.remove('list-sort-whole', 'list-sort-handle')
    rec.sig = null
    rec.current = null
    return
  }

  // Mirror for SortableJS's native listener: vnode.attrs is replaced on
  // every render, so onEnd ALWAYS reads the current values (the repo's
  // pattern for native listeners). `el` is the record's stable key.
  rec.current = { data, onReorder: vnode.attrs.onReorder }

  const sig = data.map((item, index) => String(rowKey ? rowKey(item, index) : index)).join('|')
  if (rec.instance && sig === rec.sig) return

  rec.instance = destroyListSortable(rec.instance)
  rec.instance = createListSortable(el, {
    onStart: (evt) => {
      rec.dragging = true
      rec.dragAt = Date.now()
      setDraggingCursor(true)
      // Source position in the `data` array (the DOM has not moved yet):
      // it is computed here because by the end tick the node is already at the destination.
      rec.fromIndex = draggableIndexOf(el, evt != null ? evt.item : null)
    },
    onEnd: (evt) => {
      // SortableJS finishes moving the node in the DOM AFTER onEnd; the
      // destination index is read from the DOM in the deferred tick and the redraw
      // is deferred with the guard still active, to avoid patching on top of
      // SortableJS's cleanup.
      setTimeout(() => finishSort(rec, el, evt), 0)
    },
  })
  rec.sig = sig
}

/**
 * End of drag: reorders the controlled array according to the real drop position
 * (index among draggable rows, see draggableIndexOf) and notifies the parent.
 */
function finishSort(rec, el, evt) {
  rec.dragging = false
  setDraggingCursor(false)

  const { data, onReorder } = rec.current || {}
  if (typeof onReorder === 'function' && Array.isArray(data)) {
    const item = evt != null ? evt.item : null
    const from = rec.fromIndex != null ? rec.fromIndex : -1
    const to = item != null ? draggableIndexOf(el, item) : -1
    if (from >= 0 && to >= 0 && from !== to && from < data.length && to < data.length) {
      const next = data.slice()
      const [moved] = next.splice(from, 1)
      next.splice(to, 0, moved)
      onReorder(next)
    }
  }
  rec.fromIndex = -1

  // SortableJS native event: Mithril does not redraw on its own. Already outside
  // SortableJS's stack (deferred tick), the DOM is in the final order and the
  // keyed diff reconciles without fighting.
  m.redraw()
}

/**
 * ListRow component. List row (`<li>`); with `hover` it is highlighted on
 * hover (the recipe's `row` slot).
 *
 * @type {import('mithril').Component<import('./index').ListRowAttrs>}
 */
export const ListRow = {
  view(vnode) {
    const { hover, className, ...rest } = vnode.attrs

    return m('li', {
      className: cx('list-row', list({ hover }).row, className),
      ...rest
    }, vnode.children)
  }
}

/**
 * ListCol component. Column inside a row; `grow` expands it to take up
 * the remaining space and `wrap` moves it down to the next line (slot `col`).
 *
 * @type {import('mithril').Component<import('./index').ListColAttrs>}
 */
export const ListCol = {
  view(vnode) {
    const { grow, wrap, className, ...rest } = vnode.attrs

    return m('div', {
      className: cx(grow && 'list-col-grow', wrap && 'list-col-wrap', list({ wrap }).col, className),
      ...rest
    }, vnode.children)
  }
}

/**
 * ListDragHandle component. Drag handle for List's `sortable` mode:
 * if the row template includes a ListDragHandle, reordering only
 * starts from the handle (SortableJS's `handle` option); without a handle the
 * whole row is dragged. Without `sortable` it remains a static grip. It is an
 * auto column (span) inside the row's grid: place it as the first
 * ListRow child; the recipe adjusts `--list-grid-cols` via `:has(...)`.
 *
 * @type {import('mithril').Component<import('./index').ListDragHandleAttrs>}
 */
export const ListDragHandle = {
  view(vnode) {
    const { size, className, ...rest } = vnode.attrs

    return m('span', {
      className: cx('list-drag-handle', className),
      ...rest
    }, m(GripVertical, { size: size || 16, 'aria-hidden': 'true' }))
  }
}
