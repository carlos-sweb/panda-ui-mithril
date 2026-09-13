import m from 'mithril'
import { fileInput } from '../../../styled-system/recipes'
import { cx } from '../../../styled-system/css'

/**
 * FileInput component. File picker (`<input type="file">`) with
 * color, size and ghost mode variants.
 *
 * @type {import('mithril').Component<import('./index').FileInputAttrs>}
 */
export const FileInput = {
  view(vnode) {
    const { color, size, ghost, className, ...rest } = vnode.attrs

    return m('input', {
      type: 'file',
      className: cx('file-input', fileInput({ color, size, ghost }), className),
      ...rest
    })
  }
}
