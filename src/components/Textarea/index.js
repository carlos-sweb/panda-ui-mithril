import m from 'mithril'
import { textareaStyles } from '../../recipes/textarea'
import { cx } from '../../utils/cx'


export const Textarea = {
  view(vnode) {
    const { color, size, ghost, className, ...rest } = vnode.attrs

    return m('textarea', {
      className: cx('textarea', textareaStyles({ color, size, ghost }), className),
      ...rest
    })
  }
}
