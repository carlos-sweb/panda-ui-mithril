import m from 'mithril'
import { gridPUM } from '../../../styled-system/recipes'
import { cx } from '../../utils/cx'

export const Cell = {
  view(vnode) {
    const { span, className, ...rest } = vnode.attrs
    return m('div', { className: cx('grid-cell', gridPUM({ span }).cell, className), ...rest }, vnode.children)
  }
}
