import m from 'mithril'
import { columns } from '../../../styled-system/recipes'
import { cx } from '../../../styled-system/css'

export const Columns = {
  view(vnode) {
    const { gap, vertical, centered, className, ...rest } = vnode.attrs
    return m('div', { className: cx('columns', columns({ gap, vertical, centered }).root, className), ...rest }, vnode.children)
  }
}
