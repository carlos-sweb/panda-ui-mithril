import m from 'mithril'
import { gridPUM } from '../../../styled-system/recipes'
import { cx } from '../../../styled-system/css'

/**
 * Grid component. CSS Grid container; `Cell` is its direct child (same
 * folder, same slot-recipe). `cols` controls the number of columns and `gap`
 * the spacing between cells.
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
 * Cell component. Child cell of `Grid`; `span` controls how many columns
 * it occupies. It lives inside Grid — it has no page of its own or package subpath.
 *
 * @type {import('mithril').Component<import('./index').CellAttrs>}
 */
export const Cell = {
  view(vnode) {
    const { span, className, ...rest } = vnode.attrs
    return m('div', { className: cx('grid-cell', gridPUM({ span }).cell, className), ...rest }, vnode.children)
  }
}
