import m from 'mithril'
import { fileInputStyles } from '../../recipes/fileInput'
import { cx } from '../../utils/cx'

/**
 * Componente FileInput. Selector de archivos (`<input type="file">`) con
 * variantes de color, tamaño y modo ghost.
 *
 * @type {import('mithril').Component<import('./index').FileInputAttrs>}
 */
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
