import m from 'mithril'
import { blockStyles } from '../../recipes/block'
import { cx } from '../../utils/cx'

export const Block = {
  view(vnode) {
    const { spacing, className, ...rest } = vnode.attrs
    return m('div', { className: cx('block', blockStyles({ spacing }), className), ...rest }, vnode.children)
  }
}
