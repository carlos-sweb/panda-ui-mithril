import m from 'mithril'
import { table, tableOverflow } from '../../../styled-system/recipes'
import { cx } from '../../utils/cx'

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

/**
 * Componente Table. Tabla de datos con tamaño, rayado (zebra) y filas/columnas
 * fijas (pin). El slot `table` de la recipe aplica bordes, paddings y tipografía.
 *
 * @type {import('mithril').Component<import('./index').TableAttrs>}
 */
export const Table = {
  view(vnode) {
    const { size, zebra, pinRows, pinCols, className, ...rest } = vnode.attrs

    return m('table', {
      className: cx('table', table({ size, zebra, pinRows, pinCols }).table, className),
      ...rest
    }, vnode.children)
  }
}

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
