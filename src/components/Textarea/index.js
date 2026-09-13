import m from 'mithril'
import { textarea } from '../../../styled-system/recipes'
import { cx } from '../../../styled-system/css'

/**
 * Textarea component. Multiline text area (`<textarea>`) with color,
 * size and ghost mode variants.
 *
 * @type {import('mithril').Component<import('./index').TextareaAttrs>}
 */
export const Textarea = {
  view(vnode) {
    const { color, size, ghost, className, ...rest } = vnode.attrs

    return m('textarea', {
      className: cx('textarea', textarea({ color, size, ghost }), className),
      ...rest
    })
  }
}
