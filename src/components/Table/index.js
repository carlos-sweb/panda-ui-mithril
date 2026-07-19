import m from 'mithril'
import { tableStyles } from '../../recipes/table'
import { cx } from '../../utils/cx'


export const TableContainer = {
  view(vnode) {
    const { className, children, ...rest } = vnode.attrs
    return m('div', { className: cx('overflow-x-auto', className), ...rest }, children)
  }
}

export const Table = {
  view(vnode) {
    const { size, zebra, pinRows, pinCols, className, children, ...rest } = vnode.attrs

    return m('table', {
      className: cx('table', tableStyles({ size, zebra, pinRows, pinCols }), className),
      ...rest
    }, children)
  }
}

export const TableThead = {
  view(vnode) {
    const { className, children, ...rest } = vnode.attrs
    return m('thead', { className, ...rest }, children)
  }
}

export const TableTbody = {
  view(vnode) {
    const { className, children, ...rest } = vnode.attrs
    return m('tbody', { className, ...rest }, children)
  }
}

export const TableRow = {
  view(vnode) {
    const { className, children, ...rest } = vnode.attrs
    return m('tr', { className, ...rest }, children)
  }
}

export const TableCell = {
  view(vnode) {
    const { className, children, ...rest } = vnode.attrs
    return m('td', { className, ...rest }, children)
  }
}

export const TableHead = {
  view(vnode) {
    const { className, children, ...rest } = vnode.attrs
    return m('th', { className, ...rest }, children)
  }
}
