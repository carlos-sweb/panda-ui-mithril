import m from 'mithril'
import { grid } from '../../recipes/grid'
import { cx } from '../../utils/cx'

export const Cell = {
  view(vnode) {
    const { span, className, ...rest } = vnode.attrs
    return m('div', { className: cx('grid-cell', grid({ span }).cell, className), ...rest }, vnode.children)
  }
}
