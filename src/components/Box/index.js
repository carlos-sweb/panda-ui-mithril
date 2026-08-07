import m from 'mithril'
import { boxStyles } from '../../recipes/box'
import { cx } from '../../utils/cx'

export const Box = {
  view(vnode) {
    const { padding, shadow, className, ...rest } = vnode.attrs
    return m('div', { className: cx('box', boxStyles({ padding, shadow }), className), ...rest }, vnode.children)
  }
}
