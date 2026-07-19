import m from 'mithril'
import { radioStyles } from '../../recipes/radio'
import { cx } from '../../utils/cx'


export const Radio = {
  view(vnode) {
    const { color, size, checked, disabled, className, onchange, ...rest } = vnode.attrs

    return m('input', {
      type: 'radio',
      className: cx('radio', radioStyles({ color, size }), className),
      checked,
      disabled,
      onchange,
      ...rest
    })
  }
}
