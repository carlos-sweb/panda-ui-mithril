import m from 'mithril'
import { maskStyles } from '../../recipes/mask'
import { cx } from '../../utils/cx'


export const Mask = {
  view(vnode) {
    const { shape, half, className, ...rest } = vnode.attrs

    return m('img', {
      className: cx('mask', maskStyles({ shape, half }), className),
      ...rest
    })
  }
}
