import m from 'mithril'
import { inputStyles } from '../../recipes/textInput'
import { cx } from '../../utils/cx'


export const TextInput = {
  view(vnode) {
    const { color, size, ghost, className, ...rest } = vnode.attrs

    return m('input', {
      type: 'text',
      className: cx('input', inputStyles({ color, size, ghost }), className),
      ...rest
    })
  }
}
