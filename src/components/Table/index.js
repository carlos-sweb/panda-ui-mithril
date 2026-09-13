import m from 'mithril'
import { table, tableOverflow } from '../../../styled-system/recipes'
import { cx } from '../../../styled-system/css'
import { ArrowUp, ArrowDown, ArrowUpDown } from 'lucide-mithril'
import { Skeleton } from '../Skeleton/index.js'
import { Pagination } from '../Pagination/index.js'
import { Select } from '../Select/index.js'
import { t } from '../../i18n.js'

/**
 * TableContainer component. Wrapper with horizontal scroll (and vertical if
 * `maxHeight` is passed) so the table does not overflow on narrow screens.
 * `maxHeight` creates the scrollable region the Sticky header needs.
 *
 * @type {import('mithril').Component<import('./index').TableContainerAttrs>}
 */
export const TableContainer = {
  view(vnode) {
    const { maxHeight, className, ...rest } = vnode.attrs
    const style = maxHeight !== undefined ? { maxHeight } : undefined
    return m('div', { className: cx(tableOverflow(), className), style, ...rest }, vnode.children)
  }
}

// ── Data-driven mode helpers ────────────────────────────────────────

/**
 * Auto-detects a column's comparison type by sampling its values:
 * all numeric → 'number' (largest to smallest on desc), Date → 'date', rest →
 * 'string' (A-Z with natural localeCompare, "item 2" < "item 10").
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
 * Compares two values according to the type. `direction` inverts the result.
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
 * Compares two items by the column: custom comparator (`col.sort`), forced
 * type (`col.sortType`) or auto-detection from the dataset.
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
 * Table component. Data table with size, zebra striping, pinned
 * rows/columns (pin) and two modes:
 *
 *  - **Compositive** (no `data`): explicit children (`TableThead`/
 *    `TableTbody`/`TableRow`/`TableCell`/`TableHead`).
 *  - **Data-driven** (with `data`): `columns` define the header and the
 *    cells; `pageSize` paginates the data and the library's `Pagination`
 *    **appears automatically** when there is more than one page. Columns with
 *    `sortable: true` sort (cycle asc → desc → no sort) with automatic
 *    numeric/text detection. `page`/`defaultPage`/`onchange` and
 *    `sort`/`defaultSort`/`onSortChange` follow the library's controlled/
 *    uncontrolled contract.
 *
 * @type {import('mithril').Component<import('./index').TableAttrs>}
 */
export const Table = {
  oninit(vnode) {
    vnode.state.page = vnode.attrs.defaultPage ?? 1
    vnode.state.pageSize = vnode.attrs.defaultPageSize ?? 10
    vnode.state.sort = vnode.attrs.defaultSort ?? null
  },

  view(vnode) {
    const {
      size, zebra, pinRows, pinCols, hover, bordered, stickyHeader, maxHeight, className,
      data, columns = [], rowKey,
      pageSize: pageSizeProp, defaultPageSize, pageSizeOptions, perPageLabel, onPageSizeChange,
      page: pageProp, defaultPage, onchange, pagination: paginationProp,
      empty, loading, loadingRows = 3,
      sort: sortProp, defaultSort, onSortChange,
      ...rest
    } = vnode.attrs

    const styles = table({ size, zebra, pinRows, pinCols, hover, bordered, stickyHeader })

    // ── Compositive mode (backward compatibility) ──
    if (data === undefined) {
      return m('table', {
        className: cx('table', styles.table, className),
        ...rest
      }, vnode.children)
    }

    // ── Data-driven mode ──
    const isSortControlled = sortProp !== undefined
    const currentSort = isSortControlled ? sortProp : vnode.state.sort
    const setSort = (next) => {
      if (onSortChange) onSortChange(next)
      if (!isSortControlled) {
        vnode.state.sort = next
        m.redraw()
      }
    }

    // Sorted dataset (the order is applied to EVERYTHING before paginating).
    let rows = Array.isArray(data) ? data : []
    if (currentSort) {
      const col = columns.find((c) => c.key === currentSort.key)
      if (col) {
        rows = [...rows].sort((a, b) => compareItems(a, b, col, currentSort.direction, rows))
      }
    }

    // Pagination (Pagination contract): controlled with `page` or internal.
    const paginationEnabled = paginationProp !== false
    // pageSize controlled (`pageSize` prop) or internal (`defaultPageSize` / 10).
    const isPageSizeControlled = pageSizeProp !== undefined
    const effectivePageSize = isPageSizeControlled ? pageSizeProp : vnode.state.pageSize
    const effPageSize = paginationEnabled ? effectivePageSize : Infinity
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
    // Rows-per-page change: notifies, updates the internal state if
    // uncontrolled, and returns to page 1 (Ant/MUI behavior).
    const setPageSize = (next) => {
      const clamped = Math.max(1, next || 1)
      if (onPageSizeChange) onPageSizeChange(clamped)
      if (!isPageSizeControlled) {
        vnode.state.pageSize = clamped
        m.redraw()
      }
      setPage(1)
    }
    const start = (safePage - 1) * effPageSize
    const pageRows = rows.slice(start, start + effPageSize)

    const sortClick = (col) => {
      if (!col.sortable) return
      if (!currentSort || currentSort.key !== col.key) setSort({ key: col.key, direction: 'asc' })
      else if (currentSort.direction === 'asc') setSort({ key: col.key, direction: 'desc' })
      else setSort(null)
    }

    // Header: th with align/width, sortable with aria-sort + icon.
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

    // Body: skeleton / empty / rows of the current page (all keyed).
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

    // Pagination appears ONLY when there is more than one page (hideWithOnePage).
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

    // Rows-per-page selector (pageSizeOptions): default i18n label
    // (Rows per page / its Spanish translation) or custom `perPageLabel`.
    const pageSizeEl = Array.isArray(pageSizeOptions) && pageSizeOptions.length > 0
      ? m('label', { className: 'table-page-size' }, [
          m('span', perPageLabel != null ? perPageLabel : t('table.rowsPerPage')),
          m(Select, {
            size: 'sm',
            value: String(effectivePageSize),
            'aria-label': perPageLabel != null ? perPageLabel : t('table.rowsPerPage'),
            onchange: (e) => setPageSize(Number(e.target.value)),
          }, pageSizeOptions.map((opt) => m('option', { value: String(opt) }, String(opt)))),
        ])
      : null

    // With selector: bar with the selector on the left and the pagination on the
    // right. Without selector: the pagination goes directly (rule `> .pagination`).
    const footerEl = pageSizeEl
      ? m('div', { className: 'table-pagination-bar' }, [pageSizeEl, paginationEl].filter(Boolean))
      : paginationEl

    const children = [
      m(TableContainer, { maxHeight }, m('table', { className: cx('table', styles.table) }, [
        columns.length > 0 && m('thead', m('tr', theadCells)),
        m('tbody', body),
      ])),
      footerEl,
    ].filter(Boolean)

    return m('div', {
      className: cx('table-data', styles.data, className),
      ...rest
    }, children)
  }
}

/**
 * Cached result of `table({})` — the subcomponents pass no variants,
 * so the classes are deterministic.
 * @type {ReturnType<typeof table>}
 */
const defaultStyles = table({})

/**
 * TableThead component. Table header (`<thead>`).
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
 * TableTbody component. Table body (`<tbody>`).
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
 * TableTfoot component. Table footer (`<tfoot>`).
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
 * TableRow component. Table row (`<tr>`); with `hover` it is highlighted on
 * cursor hover (recipe's `row` slot).
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
 * TableCell component. Data cell (`<td>`).
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
 * TableHead component. Header cell (`<th>`).
 *
 * @type {import('mithril').Component<import('./index').TableHeadAttrs>}
 */
export const TableHead = {
  view(vnode) {
    const { className, ...rest } = vnode.attrs
    return m('th', { className, ...rest }, vnode.children)
  }
}
