import m from 'mithril'
import { joinStyles, joinItemStyles } from '../../recipes/join'
import { cx } from '../../utils/cx'


export const Join = {
  view(vnode) {
    const { vertical, className, ...rest } = vnode.attrs

    return m('div', {
      className: cx('join', joinStyles({ vertical }), className),
      ...rest
    }, vnode.children)
  }
}

export const JoinItem = {
  view(vnode) {
    const { className, ...rest } = vnode.attrs

    return m('button', {
      className: cx('join-item', joinItemStyles(), className),
      ...rest
    }, vnode.children)
  }
}
