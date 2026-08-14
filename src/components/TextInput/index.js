import m from 'mithril'
import { textInputRecipe } from '../../recipes/textInput'
import { cx } from '../../utils/cx'

/**
 * Componente TextInput. Campo de texto de una línea (`<input type="text">`)
 * con variantes de color, tamaño y modo ghost.
 *
 * @type {import('mithril').Component<import('./index').TextInputAttrs>}
 */
export const TextInput = {
  view(vnode) {
    const { color, size, ghost, className, ...rest } = vnode.attrs

    return m('input', {
      type: 'text',
      className: cx('input', textInputRecipe({ color, size, ghost }), className),
      ...rest
    })
  }
}
