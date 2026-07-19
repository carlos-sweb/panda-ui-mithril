import m from 'mithril'
import { joinStyles } from '../../recipes/join'
import { cx } from '../../utils/cx'


export const Join = {
  view(vnode) {
    const { vertical, className, children, ...rest } = vnode.attrs

    return m('div', {
      className: cx('join', joinStyles({ vertical }), className),
      ...rest
    }, children)
  }
}

export const JoinItem = {
  view(vnode) {
    const { className, children, ...rest } = vnode.attrs

    return m('button', {
      className: cx('join-item', className),
      ...rest
    }, children)
  }
}
