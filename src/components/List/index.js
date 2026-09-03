import m from 'mithril'
import { GripVertical } from 'lucide-mithril'
import { list } from '../../../styled-system/recipes'
import { cx } from '../../../styled-system/css'
import { Skeleton } from '../Skeleton/index.js'
import { createListSortable, destroyListSortable } from './sortable.js'

/**
 * Componente List. Lista vertical con separadores entre filas; los hijos
 * (`ListRow`/`ListCol`) se distribuyen en grid. Usa el slot `list` de la recipe.
 *
 * Modos de uso:
 *  - **Compositivo** (sin `data`): children explícitos (`ListRow`/`ListCol`).
 *  - **Data-driven** (con `data`): el template se repite por item vía el prop
 *    `render={(item, index) => vnode}`. `key` controla el diffing al
 *    redimensionar/reordenar (default: índice). `header`/`footer` agregan
 *    filas estáticas, `empty` el estado vacío, `loading`/`loadingRows` filas
 *    Skeleton, `hover` resalta todas las filas y `ordered` renderiza `<ol>`.
 *    Los children también pueden ser UNA función `(item, index) => vnode`
 *    (único child) como alternativa legada a `render`.
 *
 *  - **Sortable (sortable-self)**: con `sortable` las filas del modo
 *    data-driven se reordenan arrastrándolas. El drag NO se implementa desde
 *    cero: List envuelve SortableJS internamente (ver ./sortable.js); la API
 *    pública es controlada — List nunca muta `data`, al soltar una fila llama
 *    `onReorder(next)` y el padre actualiza su array (patrón Pagination/
 *    Table). Por defecto se arrastra la fila completa; si el template incluye
 *    un `ListDragHandle`, el drag solo arranca desde el asa (recomendado
 *    cuando la fila tiene botones/inputs).
 *
 * Nota: `header`/`footer` solo aplican en modo data-driven (en el modo
 * compositivo la cabecera se agrega como un `ListRow` normal).
 *
 * @type {import('mithril').Component<import('./index').ListAttrs>}
 */
export const List = {
  // El estado del sortable vive en `sortRecords`, un WeakMap keyed por el
  // elemento DOM del <ul>: sobrevive aunque Mithril recree el componente
  // (vnode.state no es estable aquí) y se limpia solo en onremove.
  oncreate(vnode) { syncSortable(vnode) },
  onupdate(vnode) { syncSortable(vnode) },

  // Mientras SortableJS mueve el DOM del drag, Mithril no debe diffeer esta
  // lista (patchearía encima del elemento arrastrado). El guard se limpia en
  // onEnd y el redraw final reconcilia el orden nuevo. Red de seguridad: si un
  // drag quedara "pegado" (drop fuera de la ventana sin dragend), el guard
  // expira a los 4 s y la lista vuelve a actualizarse.
  onbeforeupdate(vnode) {
    const rec = vnode.dom && sortRecords.get(vnode.dom)
    if (!rec || !rec.dragging) return true
    if (Date.now() - rec.dragAt > 4000) {
      rec.dragging = false
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
  },

  view(vnode) {
    const { data, key, empty, header, footer, loading, loadingRows, hover, ordered, sortable, className, ...rest } = vnode.attrs
    const children = vnode.children

    // Resuelve el template: prop `render` primero; children-función (único
    // child) como alternativa. Mithril envuelve la función en un array [fn].
    const render = vnode.attrs.render
    const template = typeof render === 'function'
      ? render
      : (Array.isArray(children) && children.length === 1 && typeof children[0] === 'function')
        ? children[0]
        : null

    if (Array.isArray(data) && data.length > 0 && !template) {
      throw new Error(
        'List: se pasó `data` sin template. Usa `render={(item, index) => ...}` ' +
        'o un único child función. (Si mezclaste una función con otros children, ' +
        'la función debe ser el único child o moverla al prop `render`.)'
      )
    }

    const tag = ordered ? 'ol' : 'ul'

    // Modo sortable: solo data-driven (el compositivo no tiene modelo
    // controlable); el detalle (≥2 filas, sin loading) se decide en el hook.
    const sortActive = sortable && Array.isArray(data)

    let rows
    if (Array.isArray(data)) {
      if (loading) {
        // Fila skeleton por cada placeholder; todas con key (regla de Mithril).
        // La clase `list-row-loading` es el hook del recipe (list.ts) para
        // dimensionar los skeletons como líneas de texto.
        rows = Array.from({ length: loadingRows || 3 }, (_, i) =>
          m(ListRow, { key: `__loading-${i}__`, hover, className: 'list-row-loading' }, [
            // Sin `grow`: la regla `.list-row-loading` del recipe define el grid
            // (1fr + 4.5rem); un `grow` dispararía la regla `:has(...)` de mayor
            // especificidad y rompería la segunda columna.
            m(ListCol, null, m(Skeleton)),
            m(ListCol, null, m(Skeleton)),
          ])
        )
      } else if (data.length === 0) {
        // Estado vacío: header/empty/footer, todos sin key (nunca conviven
        // con filas keyed).
        rows = [
          ...(header != null ? [header] : []),
          ...(empty != null ? (Array.isArray(empty) ? empty : [empty]) : []),
          ...(footer != null ? [footer] : []),
        ]
      } else {
        const mapRow = (item, index) => {
          const row = template(item, index)
          if (row == null) return null
          // Inyecta key si el template no la puso (diffing de Mithril).
          const keyValue = key ? key(item, index) : index
          let out = row
          const attrs = { ...(row.attrs || {}) }
          let changed = false
          if (row.key == null && keyValue != null) { attrs.key = keyValue; changed = true }
          // `hover` a nivel de List: aplica el resaltado a las filas ListRow.
          if (hover && out.tag === ListRow && !attrs.hover) { attrs.hover = true; changed = true }
          return changed ? m(out.tag, attrs, out.children) : out
        }
        // header/footer con keys reservadas para mantener todo el array keyed;
        // en modo sortable se marcan como estáticas (no arrastrables).
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
 * Resultado cacheado de `list({})` — el componente principal no pasa variantes,
 * así que las clases son determinísticas. Evita llamar al sva en cada render.
 * @type {ReturnType<typeof list>}
 */
const defaultStyles = list({})

/**
 * Registro por elemento del modo sortable. Se guarda en un WeakMap keyed por
 * el <ul> (el elemento DOM sobrevive a la recreación del componente), nunca en
 * vnode.state.
 * @type {WeakMap<Element, { instance: object|null, sig: string|null, current: {data: unknown[], onReorder?: Function}|null, dragging: boolean, dragAt: number }>}
 */
const sortRecords = new WeakMap()

/** Devuelve (creando si falta) el registro sortable del elemento. */
function getSortRecord(el) {
  let rec = sortRecords.get(el)
  if (!rec) {
    rec = { instance: null, sig: null, current: null, dragging: false, dragAt: 0 }
    sortRecords.set(el, rec)
  }
  return rec
}

/** Clona el vnode inyectando `key` si no la tiene. */
function withKey(row, keyValue) {
  if (row == null || row.key != null || keyValue == null) return row
  return m(row.tag, { ...row.attrs, key: keyValue }, row.children)
}

/** Marca una fila como estática (no arrastrable en modo sortable). */
function staticRow(active, row) {
  if (!active || row == null) return row
  const attrs = { ...(row.attrs || {}) }
  attrs.className = cx(attrs.className, 'list-static')
  return m(row.tag, attrs, row.children)
}

/**
 * Crea/actualiza la instancia Sortable del modo `sortable`. Se (re)crea solo
 * cuando cambia la "firma" de las filas (keys) o el modo — SortableJS cachea
 * los children y quedaría con referencias stale al añadir/quitar items.
 */
function syncSortable(vnode) {
  const el = vnode.dom
  if (!el) return

  const rec = getSortRecord(el)
  const { sortable, data, key, loading } = vnode.attrs

  const enabled = sortable && Array.isArray(data) && !loading && data.length > 1

  if (!enabled) {
    if (rec.instance) rec.instance = destroyListSortable(rec.instance)
    el.classList.remove('list-sort-whole', 'list-sort-handle')
    rec.sig = null
    rec.current = null
    return
  }

  // Espejo para el listener nativo de SortableJS: vnode.attrs se reemplaza en
  // cada render, así que onEnd lee SIEMPRE los valores actuales (patrón del
  // repo para listeners nativos). `el` es la clave estable del registro.
  rec.current = { data, onReorder: vnode.attrs.onReorder }

  const sig = data.map((item, index) => String(key ? key(item, index) : index)).join('|')
  if (rec.instance && sig === rec.sig) return

  rec.instance = destroyListSortable(rec.instance)
  rec.instance = createListSortable(el, {
    onStart: () => { rec.dragging = true; rec.dragAt = Date.now() },
    onEnd: (evt) => {
      // SortableJS termina de mover el nodo en el DOM DESPUÉS de onEnd; el
      // orden nuevo se calcula de los índices del propio evento (robusto al
      // timing del DOM) y el redraw se difiere un tick, con el guard aún
      // activo, para no parchear encima del cleanup de SortableJS.
      setTimeout(() => finishSort(rec, evt), 0)
    },
  })
  rec.sig = sig
}

/**
 * Fin del drag: reordena el array controlado según la posición de soltado que
 * reporta SortableJS (old/newDraggableIndex — índices solo entre filas
 * arrastrables, ignoran header/footer estáticos) y notifica al padre.
 */
function finishSort(rec, evt) {
  rec.dragging = false

  const { data, onReorder } = rec.current || {}
  if (typeof onReorder === 'function' && Array.isArray(data)) {
    const from = evt != null ? (evt.oldDraggableIndex != null ? evt.oldDraggableIndex : evt.oldIndex) : null
    const to = evt != null ? (evt.newDraggableIndex != null ? evt.newDraggableIndex : evt.newIndex) : null
    if (from != null && to != null && from !== to && from >= 0 && to >= 0 && from < data.length && to < data.length) {
      const next = data.slice()
      const [moved] = next.splice(from, 1)
      next.splice(to, 0, moved)
      onReorder(next)
    }
  }

  // Evento nativo de SortableJS: Mithril no redibuja solo. Ya fuera de la pila
  // de SortableJS (tick diferido), el DOM quedó en el orden final y el diff
  // keyed reconcilia sin pelear.
  m.redraw()
}

/**
 * Componente ListRow. Fila de la lista (`<li>`); con `hover` se resalta al
 * pasar el cursor (slot `row` de la recipe).
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
 * Componente ListCol. Columna dentro de una fila; `grow` la expande para ocupar
 * el espacio restante y `wrap` la baja a la siguiente línea (slot `col`).
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
 * Componente ListDragHandle. Asa de arrastre del modo `sortable` de List:
 * si el template de fila incluye un ListDragHandle, el reordenamiento solo
 * arranca desde el asa (opción `handle` de SortableJS); sin asa se arrastra
 * la fila completa. Sin `sortable` queda como un grip estático. Es una
 * columna auto (span) dentro del grid de la fila: colócalo como primer
 * ListRow-child; el recipe ajusta `--list-grid-cols` vía `:has(...)`.
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
