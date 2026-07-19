import m from 'mithril'
import { checkboxStyles } from '../../recipes/checkbox'
import { cx } from '../../utils/cx'


export const Checkbox = {
  view(vnode) {
    const { color, size, checked, disabled, className, onchange, ...rest } = vnode.attrs

    return m('input', {
      type: 'checkbox',
      className: cx('checkbox', checkboxStyles({ color, size }), className),
      checked,
      disabled,
      onchange,
      ...rest
    })
  }
}
