import m from 'mithril'
import { maskStyles } from '../../recipes/mask'
import { cx } from '../../utils/cx'


export const Mask = {
  view(vnode) {
    const { shape, className, ...rest } = vnode.attrs

    return m('img', {
      className: cx('mask', maskStyles({ shape }), className),
      ...rest
    })
  }
}
