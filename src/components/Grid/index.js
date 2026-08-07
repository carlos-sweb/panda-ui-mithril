import m from 'mithril'
import { grid } from '../../recipes/grid'
import { cx } from '../../utils/cx'

export const Grid = {
  view(vnode) {
    const { cols, gap, className, ...rest } = vnode.attrs
    return m('div', { className: cx('grid', grid({ cols, gap }).root, className), ...rest }, vnode.children)
  }
}
