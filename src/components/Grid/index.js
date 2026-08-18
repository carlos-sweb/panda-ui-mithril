import m from 'mithril'
import { gridPUM } from '../../../styled-system/recipes'
import { cx } from '../../../styled-system/css'

export const Grid = {
  view(vnode) {
    const { cols, gap, className, ...rest } = vnode.attrs
    return m('div', { className: cx('grid', gridPUM({ cols, gap }).root, className), ...rest }, vnode.children)
  }
}
