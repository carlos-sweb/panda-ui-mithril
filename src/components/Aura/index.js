import m from 'mithril'
import { auraStyles } from '../../recipes/aura'
import { cx } from '../../utils/cx'

export const Aura = {
  view(vnode) {
    const { variant, shape, size, className, ...rest } = vnode.attrs

    return m('div', {
      className: cx('aura', variant && variant !== 'default' && `aura-${variant}`, auraStyles({ variant, shape, size }), className),
      ...rest
    }, vnode.children)
  }
}
