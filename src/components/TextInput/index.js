import m from 'mithril'
import { textInput } from '../../../styled-system/recipes'
import { cx } from '../../../styled-system/css'

/**
 * TextInput component. Single-line text field (`<input type="text">`)
 * with color, size and ghost mode variants.
 *
 * @type {import('mithril').Component<import('./index').TextInputAttrs>}
 */
export const TextInput = {
  view(vnode) {
    const { color, size, ghost, className, ...rest } = vnode.attrs

    return m('input', {
      type: 'text',
      className: cx('input', textInput({ color, size, ghost }), className),
      ...rest
    })
  }
}
