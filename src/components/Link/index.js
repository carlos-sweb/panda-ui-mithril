import m from 'mithril'
import { linkStyles } from '../../recipes/link'
import { cx } from '../../utils/cx'


export const Link = {
  view(vnode) {
    const { color, hover = true, className, children, ...rest } = vnode.attrs

    return m('a', {
      className: cx('link', linkStyles({ color, hover }), className),
      ...rest
    }, children)
  }
}
