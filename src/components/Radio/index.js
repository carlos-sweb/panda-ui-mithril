import m from 'mithril'
import { radioRecipe } from '../../recipes/radio'
import { cx } from '../../utils/cx'

/**
 * Componente Radio. Input de selección única estilizado con un punto central
 * que se rellena con `currentColor` al estar marcado.
 *
 * El visual se maneja 100% vía className (recipe `cva()`, sin `defaultStyles`):
 * la base aplica `radio`, el estilo del punto (`_before`) y la animación de
 * selección (`radio 0.2s ease-out` al estar `:checked`) vienen de la recipe.
 *
 * @type {import('mithril').Component<import('./index').RadioAttrs>}
 */
export const Radio = {
  view(vnode) {
    const { color, size, checked, disabled, className, onchange, ...rest } = vnode.attrs

    return m('input', {
      type: 'radio',
      className: cx('radio', radioRecipe({ color, size }), className),
      checked,
      disabled,
      onchange,
      ...rest
    })
  }
}
