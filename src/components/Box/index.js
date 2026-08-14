import m from 'mithril'
import { boxPUM } from '../../../styled-system/recipes'
import { cx } from '../../utils/cx'

export const Box = {
  view(vnode) {
    const { padding, shadow, className, ...rest } = vnode.attrs
    return m('div', { className: cx('box', boxPUM({ padding, shadow }), className), ...rest }, vnode.children)
  }
}
