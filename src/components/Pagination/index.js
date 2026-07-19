import m from 'mithril'
import { paginationStyles } from '../../recipes/pagination'
import { cx } from '../../utils/cx'


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
