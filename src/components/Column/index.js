import m from 'mithril'
import { columns } from '../../../styled-system/recipes'
import { cx } from '../../../styled-system/css'

export const Column = {
  view(vnode) {
    const { width, narrow, className, ...rest } = vnode.attrs
    return m('div', { className: cx('column', columns({ width, narrow }).column, className), ...rest }, vnode.children)
  }
}
