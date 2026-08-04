import m from 'mithril'
import { textareaStyles } from '../../recipes/textarea'
import { cx } from '../../utils/cx'

/**
 * Componente Textarea. Área de texto multilínea (`<textarea>`) con variantes
 * de color, tamaño y modo ghost.
 *
 * @type {import('mithril').Component<import('./index').TextareaAttrs>}
 */
export const Textarea = {
  view(vnode) {
    const { color, size, ghost, className, ...rest } = vnode.attrs

    return m('textarea', {
      className: cx('textarea', textareaStyles({ color, size, ghost }), className),
      ...rest
    })
  }
}
