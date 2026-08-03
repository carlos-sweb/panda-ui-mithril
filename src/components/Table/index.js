import m from 'mithril'
import { css } from '../../../styled-system/css'
import { table } from '../../recipes/table'
import { cx } from '../../utils/cx'

const overflowAuto = css({ overflowX: 'auto' })

export const TableContainer = {
  view(vnode) {
    const { className, ...rest } = vnode.attrs
    return m('div', { className: cx(overflowAuto, className), ...rest }, vnode.children)
  }
}

export const Table = {
  view(vnode) {
    const { size, zebra, pinRows, pinCols, className, ...rest } = vnode.attrs

    return m('table', {
      className: cx('table', table({ size, zebra, pinRows, pinCols }).table, className),
      ...rest
    }, vnode.children)
  }
}

export const TableThead = {
  view(vnode) {
    const { className, ...rest } = vnode.attrs
    return m('thead', { className, ...rest }, vnode.children)
  }
}

export const TableTbody = {
  view(vnode) {
    const { className, ...rest } = vnode.attrs
    return m('tbody', { className, ...rest }, vnode.children)
  }
}

export const TableTfoot = {
  view(vnode) {
    const { className, ...rest } = vnode.attrs
    return m('tfoot', { className, ...rest }, vnode.children)
  }
}

export const TableRow = {
  view(vnode) {
    const { hover, className, ...rest } = vnode.attrs
    return m('tr', { className: cx(table({ hover }).row, className), ...rest }, vnode.children)
  }
}

export const TableCell = {
  view(vnode) {
    const { className, ...rest } = vnode.attrs
    return m('td', { className, ...rest }, vnode.children)
  }
}

export const TableHead = {
  view(vnode) {
    const { className, ...rest } = vnode.attrs
    return m('th', { className, ...rest }, vnode.children)
  }
}
