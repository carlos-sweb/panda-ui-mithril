import m from 'mithril'
import { toggleStyles } from '../../recipes/toggle'
import { cx } from '../../utils/cx'


export const Toggle = {
  view(vnode) {
    const { color, size, checked, disabled, className, onchange, ...rest } = vnode.attrs

    return m('input', {
      type: 'checkbox',
      className: cx('toggle', toggleStyles({ color, size }), className),
      checked,
      disabled,
      onchange,
      ...rest
    })
  }
}
