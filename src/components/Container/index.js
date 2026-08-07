import m from 'mithril'
import { containerStyles } from '../../recipes/container'
import { cx } from '../../utils/cx'

export const Container = {
  view(vnode) {
    const { maxWidth, fluid, className, ...rest } = vnode.attrs
    return m('div', { className: cx('container', containerStyles({ maxWidth, fluid }), className), ...rest }, vnode.children)
  }
}
