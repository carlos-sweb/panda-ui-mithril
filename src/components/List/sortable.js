import Sortable from 'sortablejs'

/**
 * Puente (wrapper) sobre SortableJS para el modo `sortable` de List.
 *
 * No implementamos un motor de drag-and-drop propio: esta es la ÚNICA pieza
 * que importa `sortablejs`. El wrapper se encarga de
 *  - crear/destruir la instancia `Sortable.create` sobre el contenedor (el
 *    `<ul>`/`<ol>` de List),
 *  - decidir el modo de agarre: si el contenedor contiene asas `.list-drag-
 *    handle` (componente ListDragHandle) el drag solo arranca desde ellas
 *    (`handle` de SortableJS); si no, se arrastra la fila completa,
 *  - aplicar las clases visuales (`list-sort-whole`/`list-sort-handle` en el
 *    contenedor, `list-sort-ghost`/`list-sort-chosen` en las filas durante el
 *    drag), que el recipe `list.ts` estiliza.
 *
 * El puente NUNCA conoce el modelo de datos: expone hooks (`onStart`/`onEnd`)
 * y List reconcilia el orden nuevo contra su array controlado usando los
 * índices del propio evento de SortableJS (old/newDraggableIndex) vía
 * `onReorder`. Toda mutación del array la hace el padre.
 */

/** Crea la instancia Sortable sobre `el` y ajusta las clases de modo. */
export function createListSortable(el, hooks = {}) {
  const { onStart, onEnd } = hooks
  if (!el) return null

  // Modo de agarre: si el template incluye asas, SortableJS restringe el drag
  // a ellas (handle); en caso contrario se arrastra la fila entera.
  const handleMode = el.querySelector('.list-drag-handle') != null
  el.classList.remove('list-sort-whole', 'list-sort-handle')
  el.classList.add(handleMode ? 'list-sort-handle' : 'list-sort-whole')

  const options = {
    animation: 150,
    // NADA de drag nativo HTML5 (`forceFallback: true`). Con el drag nativo
    // (`nativeDraggable`, el default en desktop) el navegador se adueña del
    // cursor mientras la fila "vuela" y pinta su propia flecha IGNORANDO el
    // CSS: verificado en el navegador que con el default se dispara `dragstart`
    // y el `cursor: grabbing` computado no se pinta. Con el fallback SortableJS
    // mueve un clon con eventos de mouse, así que el cursor real (recipe +
    // `body.list-dragging`, ver más abajo) sí se aplica. En touch ya se usaba
    // el fallback de todos modos.
    forceFallback: true,
    // Umbral en px del fallback antes de considerar que es un arrastre (evita
    // que un clic con micro-movimiento levante la fila).
    fallbackTolerance: 3,
    // Clases que SortableJS aplica durante el drag (recipe list.ts). En
    // fallback el clon que sigue al puntero recibe `dragClass` + `fallbackClass`
    // (el default `sortable-fallback` es un nombre ajeno al proyecto).
    ghostClass: 'list-sort-ghost',
    chosenClass: 'list-sort-chosen',
    dragClass: 'list-sort-drag',
    fallbackClass: 'list-sort-drag',
    // Header/footer de List no son arrastrables (filas estáticas).
    filter: '.list-static',
    onStart,
    onEnd,
  }
  if (handleMode) options.handle = '.list-drag-handle'

  return Sortable.create(el, options)
}

/** Destruye la instancia Sortable si existe (devuelve null para encadenar). */
export function destroyListSortable(sortable) {
  if (!sortable) return null
  try {
    sortable.destroy()
  } catch {
    // Ya destruida o drag interrumpido: no hay nada que limpiar.
  }
  return null
}
