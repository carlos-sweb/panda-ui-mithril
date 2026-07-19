import m from 'mithril'
import { cva } from '../../styled-system/css'
import { cx } from '../../utils/cx'

const tableStyles = cva({
  base: {
    display: 'table',
    w: 'full',
    fontSize: 'sm',
  },
  variants: {
    size: {
      xs: { text: 'xs' },
      sm: { text: 'sm' },
      md: { text: 'sm' },
      lg: { text: 'md' },
      xl: { text: 'lg' },
    },
    zebra: {
      true: { '& tbody tr:nth-child(even)': { bg: 'base-200' } },
    },
    pinRows: {
      true: { '& thead tr': { bg: 'base-200', position: 'sticky', top: '0', zIndex: '1' } },
    },
    pinCols: {
      true: {
        '& th': { position: 'sticky', bg: 'base-200' },
        '& th:first-child': { left: '0', zIndex: '2' },
      },
    },
  },
})

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
