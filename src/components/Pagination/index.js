import m from 'mithril'
import { cva } from '../../styled-system/css'
import { cx } from '../../utils/cx'

const paginationStyles = cva({
  base: {
    display: 'inline-flex',
    overflow: 'hidden',
    rounded: 'field',
  },
  variants: {},
})

export const Pagination = {
  view(vnode) {
    const { className, children, ...rest } = vnode.attrs

    return m('div', {
      className: cx('join', paginationStyles(), className),
      ...rest
    }, children)
  }
}

export const PaginationButton = {
  view(vnode) {
    const { active, className, children, ...rest } = vnode.attrs

    return m('button', {
      className: cx('btn join-item', active && 'btn-active', className),
      ...rest
    }, children)
  }
}
