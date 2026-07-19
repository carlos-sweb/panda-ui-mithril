import m from 'mithril'
import { megamenuStyles } from '../../recipes/megamenu'
import { cx } from '../../utils/cx'


export const Megamenu = {
  view(vnode) {
    const { size, wide, full, vertical, className, children, ...rest } = vnode.attrs

    return m('div', {
      className: cx('megamenu', megamenuStyles({ size, wide, full, vertical }), className),
      ...rest
    }, children)
  }
}

export const MegamenuActive = {
  view(vnode) {
    const { className, ...rest } = vnode.attrs
    return m('span', { className: cx('megamenu-active', className), ...rest })
  }
}
