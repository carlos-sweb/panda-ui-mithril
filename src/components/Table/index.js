import m from 'mithril'
import { table, tableOverflow } from '../../../styled-system/recipes'
import { cx } from '../../../styled-system/css'
import { ArrowUp, ArrowDown, ArrowUpDown } from 'lucide-mithril'
import { Skeleton } from '../Skeleton/index.js'
import { Pagination } from '../Pagination/index.js'
import { t } from '../../i18n.js'

/**
 * Componente TableContainer. Wrapper con scroll horizontal para que la tabla
 * no desborde en pantallas estrechas.
 *
 * @type {import('mithril').Component<import('./index').TableContainerAttrs>}
 */
export const TableContainer = {
  view(vnode) {
    const { className, ...rest } = vnode.attrs
    return m('div', { className: cx(tableOverflow(), className), ...rest }, vnode.children)
  }
}

// ── Helpers del modo data-driven ────────────────────────────────────────

/**
 * Autodetecta el tipo de comparación de una columna muestreando sus valores:
 * todo numérico → 'number' (mayor a menor en desc), Date → 'date', resto →
 * 'string' (A-Z con localeCompare natural, "item 2" < "item 10").
 * @param {unknown[]} values
 * @returns {'number' | 'date' | 'string'}
 */
function detectSortType(values) {
  let hasNumber = false
  let hasOther = false
  for (const v of values) {
    if (v instanceof Date) return 'date'
    if (typeof v === 'number') hasNumber = true
    else if (v != null) hasOther = true
  }
  return hasNumber && !hasOther ? 'number' : 'string'
}

/**
 * Compara dos valores según el tipo. `direction` invierte el resultado.
 * @param {unknown} a
 * @param {unknown} b
 * @param {'number' | 'date' | 'string'} type
 * @param {'asc' | 'desc'} direction
 */
function compareValues(a, b, type, direction) {
  let result
  if (type === 'number') {
    result = (typeof a === 'number' ? a : 0) - (typeof b === 'number' ? b : 0)
  } else if (type === 'date') {
    result = (a instanceof Date ? a.getTime() : 0) - (b instanceof Date ? b.getTime() : 0)
  } else {
    result = String(a ?? '').localeCompare(String(b ?? ''), undefined, { numeric: true, sensitivity: 'base' })
  }
  return direction === 'desc' ? -result : result
}

/**
 * Compara dos items por la columna: comparador custom (`col.sort`), tipo
 * forzado (`col.sortType`) o autodetección del dataset.
 * @param {Object} a
 * @param {Object} b
 * @param {import('./index').TableColumn} col
 * @param {'asc' | 'desc'} direction
 * @param {any[]} data
 */
function compareItems(a, b, col, direction, data) {
  if (typeof col.sort === 'function') {
    const r = col.sort(a, b)
    return direction === 'desc' ? -r : r
  }
  const va = col.key != null ? a[col.key] : undefined
  const vb = col.key != null ? b[col.key] : undefined
  const type = col.sortType || (Array.isArray(data) ? detectSortType(data.map((d) => d[col.key])) : 'string')
  return compareValues(va, vb, type, direction)
}

/**
 * Componente Table. Tabla de datos con tamaño, rayado (zebra), filas/columnas
 * fijas (pin) y dos modos:
 *
 *  - **Compositivo** (sin `data`): children explícitos (`TableThead`/
 *    `TableTbody`/`TableRow`/`TableCell`/`TableHead`).
 *  - **Data-driven** (con `data`): `columns` definen el encabezado y las
 *    celdas; `pageSize` pagina la data y la `Pagination` de la librería
 *    **aparece automáticamente** cuando hay más de una página. Columnas con
 *    `sortable: true` ordenan (ciclo asc → desc → sin orden) con detección
 *    automática de numérico/texto. `page`/`defaultPage`/`onchange` y
 *    `sort`/`defaultSort`/`onSortChange` siguen el contrato controlado/
 *    no-controlado de la librería.
 *
 * @type {import('mithril').Component<import('./index').TableAttrs>}
 */
export const Table = {
  oninit(vnode) {
    vnode.state.page = vnode.attrs.defaultPage ?? 1
    vnode.state.sort = vnode.attrs.defaultSort ?? null
  },

  view(vnode) {
    const {
      size, zebra, pinRows, pinCols, hover, bordered, className,
      data, columns = [], rowKey, pageSize = 10,
      page: pageProp, defaultPage, onchange, pagination: paginationProp,
      empty, loading, loadingRows = 3,
      sort: sortProp, defaultSort, onSortChange,
      ...rest
    } = vnode.attrs

    const styles = table({ size, zebra, pinRows, pinCols, hover, bordered })

    // ── Modo compositivo (retrocompatibilidad) ──
    if (data === undefined) {
      return m('table', {
        className: cx('table', styles.table, className),
        ...rest
      }, vnode.children)
    }

    // ── Modo data-driven ──
    const isSortControlled = sortProp !== undefined
    const currentSort = isSortControlled ? sortProp : vnode.state.sort
    const setSort = (next) => {
      if (onSortChange) onSortChange(next)
      if (!isSortControlled) {
        vnode.state.sort = next
        m.redraw()
      }
    }

    // Dataset ordenado (el orden se aplica a TODO antes de paginar).
    let rows = Array.isArray(data) ? data : []
    if (currentSort) {
      const col = columns.find((c) => c.key === currentSort.key)
      if (col) {
        rows = [...rows].sort((a, b) => compareItems(a, b, col, currentSort.direction, rows))
      }
    }

    // Paginación (contract Pagination): controlada con `page` o interna.
    const paginationEnabled = paginationProp !== false
    const effPageSize = paginationEnabled ? pageSize : Infinity
    const pageCount = Math.max(1, Math.ceil(rows.length / effPageSize))
    const isPageControlled = pageProp !== undefined
    const rawPage = isPageControlled ? pageProp : vnode.state.page
    const safePage = Math.min(Math.max(1, rawPage || 1), pageCount)
    const setPage = (next) => {
      const clamped = Math.min(Math.max(1, next), Math.max(1, pageCount))
      if (onchange) onchange(clamped)
      if (!isPageControlled) {
        vnode.state.page = clamped
        m.redraw()
      }
    }
    const start = (safePage - 1) * effPageSize
    const pageRows = rows.slice(start, start + effPageSize)

    const sortClick = (col) => {
      if (!col.sortable) return
      if (!currentSort || currentSort.key !== col.key) setSort({ key: col.key, direction: 'asc' })
      else if (currentSort.direction === 'asc') setSort({ key: col.key, direction: 'desc' })
      else setSort(null)
    }

    // Encabezado: th con align/width, sortable con aria-sort + icono.
    const theadCells = columns.map((col) => {
      const sorted = currentSort != null && currentSort.key === col.key
      const thAttrs = {
        key: col.key,
        style: { textAlign: col.align, width: col.width },
      }
      if (col.sortable) {
        thAttrs.className = 'sortable'
        thAttrs['aria-sort'] = sorted
          ? (currentSort.direction === 'asc' ? 'ascending' : 'descending')
          : undefined
        thAttrs.onclick = () => sortClick(col)
      }
      const label = col.header ? col.header(col) : col.title
      const icon = col.sortable
        ? m(sorted ? (currentSort.direction === 'asc' ? ArrowUp : ArrowDown) : ArrowUpDown, { size: 14 })
        : null
      return m('th', thAttrs, [label, icon].filter(Boolean))
    })

    // Cuerpo: skeleton / empty / filas de la página actual (todas keyed).
    let body
    if (loading) {
      body = Array.from({ length: loadingRows }, (_, i) =>
        m('tr', { key: `__loading-${i}__` },
          columns.map((col, j) => m('td', { key: `${col.key}-${j}`, className: 'table-cell-loading' }, m(Skeleton)))
        )
      )
    } else if (rows.length === 0) {
      body = m('tr', m('td', {
        colSpan: Math.max(1, columns.length),
        className: 'table-empty',
      }, empty != null ? empty : t('table.empty')))
    } else {
      body = pageRows.map((item, index) => {
        const globalIndex = start + index
        const keyValue = rowKey ? rowKey(item, globalIndex) : globalIndex
        return m('tr', { key: keyValue, className: cx('table-row', styles.row) },
          columns.map((col) => m('td', {
            key: col.key,
            style: { textAlign: col.align, width: col.width },
          }, col.render ? col.render(item, { index: globalIndex, data }) : item[col.key]))
        )
      })
    }

    const paginationProps = (typeof paginationProp === 'object' && paginationProp !== null)
      ? paginationProp
      : {}

    // La paginación aparece SOLO cuando hay más de una página (hideWithOnePage).
    const paginationEl = paginationEnabled && pageCount > 1
      ? m(Pagination, {
          page: safePage,
          pageCount,
          onchange: setPage,
          hideWithOnePage: true,
          'aria-label': t('pagination.ariaLabel'),
          ...paginationProps,
        })
      : null

    const children = [
      m(TableContainer, {}, m('table', { className: cx('table', styles.table) }, [
        columns.length > 0 && m('thead', m('tr', theadCells)),
        m('tbody', body),
      ])),
      paginationEl,
    ].filter(Boolean)

    return m('div', {
      className: cx('table-data', styles.data, className),
      ...rest
    }, children)
  }
}

/**
 * Resultado cacheado de `table({})` — los subcomponentes no pasan variantes,
 * así que las clases son determinísticas.
 * @type {ReturnType<typeof table>}
 */
const defaultStyles = table({})

/**
 * Componente TableThead. Encabezado de la tabla (`<thead>`).
 *
 * @type {import('mithril').Component<import('./index').TableTheadAttrs>}
 */
export const TableThead = {
  view(vnode) {
    const { className, ...rest } = vnode.attrs
    return m('thead', { className, ...rest }, vnode.children)
  }
}

/**
 * Componente TableTbody. Cuerpo de la tabla (`<tbody>`).
 *
 * @type {import('mithril').Component<import('./index').TableTbodyAttrs>}
 */
export const TableTbody = {
  view(vnode) {
    const { className, ...rest } = vnode.attrs
    return m('tbody', { className, ...rest }, vnode.children)
  }
}

/**
 * Componente TableTfoot. Pie de la tabla (`<tfoot>`).
 *
 * @type {import('mithril').Component<import('./index').TableTfootAttrs>}
 */
export const TableTfoot = {
  view(vnode) {
    const { className, ...rest } = vnode.attrs
    return m('tfoot', { className, ...rest }, vnode.children)
  }
}

/**
 * Componente TableRow. Fila de la tabla (`<tr>`); con `hover` se resalta al
 * pasar el cursor (slot `row` de la recipe).
 *
 * @type {import('mithril').Component<import('./index').TableRowAttrs>}
 */
export const TableRow = {
  view(vnode) {
    const { hover, className, ...rest } = vnode.attrs
    return m('tr', { className: cx('table-row', table({ hover }).row, className), ...rest }, vnode.children)
  }
}

/**
 * Componente TableCell. Celda de datos (`<td>`).
 *
 * @type {import('mithril').Component<import('./index').TableCellAttrs>}
 */
export const TableCell = {
  view(vnode) {
    const { className, ...rest } = vnode.attrs
    return m('td', { className, ...rest }, vnode.children)
  }
}

/**
 * Componente TableHead. Celda de encabezado (`<th>`).
 *
 * @type {import('mithril').Component<import('./index').TableHeadAttrs>}
 */
export const TableHead = {
  view(vnode) {
    const { className, ...rest } = vnode.attrs
    return m('th', { className, ...rest }, vnode.children)
  }
}
