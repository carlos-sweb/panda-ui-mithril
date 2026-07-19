import m from 'mithril'
import { cva } from '../../styled-system/css'
import { cx } from '../../utils/cx'

const listStyles = cva({
  base: {
    display: 'flex',
    flexDirection: 'column',
    list: 'none',
    p: '0',
    m: '0',
  },
})

export const List = {
  view(vnode) {
    const { className, children, ...rest } = vnode.attrs

    return m('ul', {
      className: cx('list', listStyles(), className),
      ...rest
    }, children)
  }
}

export const ListRow = {
  view(vnode) {
    const { colWrap, colGrow, hover, className, children, ...rest } = vnode.attrs

    return m('li', {
      className: cx(
        'list-row',
        colWrap && 'list-col-wrap',
        colGrow && 'list-col-grow',
        hover && 'hover:bg-base-200',
        className
      ),
      ...rest
    }, children)
  }
}
