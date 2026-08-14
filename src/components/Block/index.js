import m from 'mithril'
import { block } from '../../../styled-system/recipes'
import { cx } from '../../utils/cx'

export const Block = {
  view(vnode) {
    const { spacing, className, ...rest } = vnode.attrs
    return m('div', { className: cx('block', block({ spacing }), className), ...rest }, vnode.children)
  }
}
