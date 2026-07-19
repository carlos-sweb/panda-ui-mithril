import m from 'mithril'
import { kbdStyles } from '../../recipes/kbd'
import { cx } from '../../utils/cx'


export const Kbd = {
  view(vnode) {
    const { size, className, children, ...rest } = vnode.attrs

    return m('kbd', {
      className: cx('kbd', kbdStyles({ size }), className),
      ...rest
    }, children)
  }
}
