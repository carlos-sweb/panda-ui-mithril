import m from 'mithril'
import { gridPUM } from '../../../styled-system/recipes'
import { cx } from '../../../styled-system/css'

/**
 * Componente Grid. Contenedor CSS Grid; `Cell` es su hijo directo (mismo
 * folder, mismo slot-recipe). `cols` controla el número de columnas y `gap`
 * la separación entre celdas.
 *
 * @type {import('mithril').Component<import('./index').GridAttrs>}
 */
export const Grid = {
  view(vnode) {
    const { cols, gap, className, ...rest } = vnode.attrs
    return m('div', { className: cx('grid', gridPUM({ cols, gap }).root, className), ...rest }, vnode.children)
  }
}

/**
 * Componente Cell. Celda hija de `Grid`; `span` controla cuántas columnas
 * ocupa. Vive dentro de Grid — no tiene página propia ni subpath de paquete.
 *
 * @type {import('mithril').Component<import('./index').CellAttrs>}
 */
export const Cell = {
  view(vnode) {
    const { span, className, ...rest } = vnode.attrs
    return m('div', { className: cx('grid-cell', gridPUM({ span }).cell, className), ...rest }, vnode.children)
  }
}
