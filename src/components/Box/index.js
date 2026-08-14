import m from 'mithril'
import { boxRecipe } from '../../recipes/box'
import { cx } from '../../utils/cx'

export const Box = {
  view(vnode) {
    const { padding, shadow, className, ...rest } = vnode.attrs
    return m('div', { className: cx('box', boxRecipe({ padding, shadow }), className), ...rest }, vnode.children)
  }
}
