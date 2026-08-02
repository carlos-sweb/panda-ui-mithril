import m from 'mithril'
import { joinStyles } from '../../recipes/join'
import { buttonStyles } from '../../recipes/button'
import { cx } from '../../utils/cx'


export const Pagination = {
  view(vnode) {
    const { className, ...rest } = vnode.attrs

    return m('div', {
      className: cx('join', joinStyles(), className),
      ...rest
    }, vnode.children)
  }
}

export const PaginationButton = {
  view(vnode) {
    const { active, disabled, className, ...rest } = vnode.attrs

    return m('button', {
      className: cx('btn join-item', buttonStyles({ active }), className),
      disabled,
      ...rest
    }, vnode.children)
  }
}
