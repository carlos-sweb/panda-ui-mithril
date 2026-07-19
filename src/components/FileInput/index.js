import m from 'mithril'
import { fileInputStyles } from '../../recipes/fileInput'
import { cx } from '../../utils/cx'


export const FileInput = {
  view(vnode) {
    const { color, size, ghost, className, ...rest } = vnode.attrs

    return m('input', {
      type: 'file',
      className: cx('file-input', fileInputStyles({ color, size, ghost }), className),
      ...rest
    })
  }
}
