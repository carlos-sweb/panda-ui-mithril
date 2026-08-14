import m from 'mithril'
import { blockRecipe } from '../../recipes/block'
import { cx } from '../../utils/cx'

export const Block = {
  view(vnode) {
    const { spacing, className, ...rest } = vnode.attrs
    return m('div', { className: cx('block', blockRecipe({ spacing }), className), ...rest }, vnode.children)
  }
}
