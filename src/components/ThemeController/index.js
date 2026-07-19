import m from 'mithril'
import { cx } from '../../../styled-system/css'

export const ThemeController = {
  view(vnode) {
    const { value, className, onchange, ...rest } = vnode.attrs

    return m('input', {
      type: 'checkbox',
      className: cx('theme-controller', className),
      value,
      onchange,
      ...rest
    })
  }
}
