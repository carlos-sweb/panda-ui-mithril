import m from 'mithril'
import { containerRecipe } from '../../recipes/container'
import { cx } from '../../utils/cx'

export const Container = {
  view(vnode) {
    const { maxWidth, fluid, className, ...rest } = vnode.attrs
    return m('div', { className: cx('container', containerRecipe({ maxWidth, fluid }), className), ...rest }, vnode.children)
  }
}
