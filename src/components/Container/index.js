import m from 'mithril'
import { containerPUM } from '../../../styled-system/recipes'
import { cx } from '../../../styled-system/css'

export const Container = {
  view(vnode) {
    const { maxWidth, fluid, className, ...rest } = vnode.attrs
    return m('div', { className: cx('container', containerPUM({ maxWidth, fluid }), className), ...rest }, vnode.children)
  }
}
