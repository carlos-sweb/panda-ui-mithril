import m from 'mithril'
import { checkboxRecipe } from '../../recipes/checkbox'
import { cx } from '../../utils/cx'

/**
 * Checkbox — a checkable box with native `checked`/`indeterminate` states.
 *
 * Renders an `<input type="checkbox">` driven by the `checkbox` recipe
 * (`cva()`, no defaultStyles). All styling goes through className only; the
 * check mark and indeterminate dash are drawn with a clipped `::before`
 * pseudo-element.
 *
 * @param {object} vnode - Mithril vnode
 * @param {import('../../types').PumColor} [vnode.attrs.color] - Accent color of
 *   the checked/indeterminate fill: `neutral`, `primary`, `secondary`,
 *   `accent`, `info`, `success`, `warning` or `error`. Falls back to
 *   `base-content`.
 * @param {import('../../types').PumSize} [vnode.attrs.size='md'] - Checkbox size:
 *   `xs`, `sm`, `md`, `lg` or `xl` (default `md`).
 * @param {boolean} [vnode.attrs.checked] - Controlled checked state applied to
 *   the native input.
 * @param {boolean} [vnode.attrs.disabled] - Disables the input (`cursor:
 *   not-allowed`, reduced opacity).
 * @param {string} [vnode.attrs.className] - Extra CSS class(es) appended to the
 *   base `checkbox` class and recipe output.
 * @param {(e: Event) => void} [vnode.attrs.onchange] - Change handler passed to
 *   the native input.
 * @param {object} [vnode.attrs] - Any other attributes are spread onto the
 *   `<input>` element.
 * @returns {import('mithril').Vnode} An `<input type="checkbox">.checkbox` element.
 */
export const Checkbox = {
  view(vnode) {
    const { color, size, checked, disabled, className, onchange, ...rest } = vnode.attrs

    return m('input', {
      type: 'checkbox',
      className: cx('checkbox', checkboxRecipe({ color, size }), className),
      checked,
      disabled,
      onchange,
      ...rest
    })
  }
}
