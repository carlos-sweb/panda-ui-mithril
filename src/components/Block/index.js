import m from 'mithril'
import { block } from '../../../styled-system/recipes'
import { cx } from '../../../styled-system/css'

export const Block = {
  view(vnode) {
    const { spacing, className, ...rest } = vnode.attrs
    return m('div', { className: cx( block({ spacing }), className), ...rest }, vnode.children)
  }
}
