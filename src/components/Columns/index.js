import m from 'mithril'
import { columns } from '../../recipes/columns'
import { cx } from '../../utils/cx'

export const Columns = {
  view(vnode) {
    const { gap, vertical, centered, className, ...rest } = vnode.attrs
    return m('div', { className: cx('columns', columns({ gap, vertical, centered }).root, className), ...rest }, vnode.children)
  }
}
