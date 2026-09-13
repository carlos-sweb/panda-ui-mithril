import m from 'mithril'
import { radio } from '../../../styled-system/recipes'
import { cx } from '../../../styled-system/css'

/**
 * Radio component. Single-selection input styled with a central dot
 * that is filled with `currentColor` when checked.
 *
 * The visual is handled 100% via className (recipe `cva()`, no `defaultStyles`):
 * the base applies `radio`, the dot style (`_before`) and the selection
 * animation (`radio 0.2s ease-out` when `:checked`) come from the recipe.
 *
 * @type {import('mithril').Component<import('./index').RadioAttrs>}
 */
export const Radio = {
  view(vnode) {
    const { color, size, checked, disabled, className, onchange, ...rest } = vnode.attrs

    return m('input', {
      type: 'radio',
      className: cx('radio', radio({ color, size }), className),
      checked,
      disabled,
      onchange,
      ...rest
    })
  }
}
