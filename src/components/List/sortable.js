import Sortable from 'sortablejs'

/**
 * Bridge (wrapper) over SortableJS for List's `sortable` mode.
 *
 * We do not implement our own drag-and-drop engine: this is the ONLY piece
 * that imports `sortablejs`. The wrapper takes care of
 *  - creating/destroying the `Sortable.create` instance on the container (List's
 *    `<ul>`/`<ol>`),
 *  - deciding the grab mode: if the container contains `.list-drag-
 *    handle` handles (the ListDragHandle component) the drag only starts from them
 *    (SortableJS's `handle`); if not, the whole row is dragged,
 *  - applying the visual classes (`list-sort-whole`/`list-sort-handle` on the
 *    container, `list-sort-ghost`/`list-sort-chosen` on the rows during the
 *    drag), which the `list.ts` recipe styles.
 *
 * The bridge NEVER knows the data model: it exposes hooks (`onStart`/`onEnd`)
 * and List reconciles the new order against its controlled array using
 * SortableJS's own event indices (old/newDraggableIndex) via
 * `onReorder`. All array mutation is done by the parent.
 */

/** Creates the Sortable instance on `el` and adjusts the mode classes. */
export function createListSortable(el, hooks = {}) {
  const { onStart, onEnd } = hooks
  if (!el) return null

  // Grab mode: if the template includes handles, SortableJS restricts the drag
  // to them (handle); otherwise the whole row is dragged.
  const handleMode = el.querySelector('.list-drag-handle') != null
  el.classList.remove('list-sort-whole', 'list-sort-handle')
  el.classList.add(handleMode ? 'list-sort-handle' : 'list-sort-whole')

  const options = {
    animation: 150,
    // NO native HTML5 drag (`forceFallback: true`). With native drag
    // (`nativeDraggable`, the desktop default) the browser takes over the
    // cursor while the row "flies" and paints its own arrow IGNORING the
    // CSS: verified in the browser that with the default `dragstart` fires
    // and the computed `cursor: grabbing` is not painted. With the fallback SortableJS
    // moves a clone with mouse events, so the real cursor (recipe +
    // `body.list-dragging`, see below) does apply. On touch the
    // fallback was used anyway.
    forceFallback: true,
    // Fallback threshold in px before considering it a drag (it avoids
    // a click with micro-movement lifting the row).
    fallbackTolerance: 3,
    // Classes SortableJS applies during the drag (list.ts recipe). In
    // fallback the clone that follows the pointer receives `dragClass` + `fallbackClass`
    // (the default `sortable-fallback` is a name foreign to the project).
    ghostClass: 'list-sort-ghost',
    chosenClass: 'list-sort-chosen',
    dragClass: 'list-sort-drag',
    fallbackClass: 'list-sort-drag',
    // List's header/footer are not draggable (static rows).
    filter: '.list-static',
    onStart,
    onEnd,
  }
  if (handleMode) options.handle = '.list-drag-handle'

  return Sortable.create(el, options)
}

/** Destroys the Sortable instance if it exists (returns null for chaining). */
export function destroyListSortable(sortable) {
  if (!sortable) return null
  try {
    sortable.destroy()
  } catch {
    // Already destroyed or interrupted drag: there is nothing to clean up.
  }
  return null
}
