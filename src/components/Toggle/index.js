import m from 'mithril'
import { toggleRecipe } from '../../recipes/toggle'
import { cx } from '../../utils/cx'

/**
 * Toggle — an on/off switch styled as a sliding checkbox.
 *
 * Renders an `<input type="checkbox">` driven by the `toggle` recipe
 * (`cva()`, no defaultStyles). All styling goes through className only;
 * the knob and track are drawn with CSS grid columns on the input itself.
 *
 * @param {object} vnode - Mithril vnode
 * @param {import('../../types').PumColor} [vnode.attrs.color] - Accent color used
 *   when the toggle is checked: `neutral`, `primary`, `secondary`, `accent`,
 *   `info`, `success`, `warning` or `error`. Falls back to `base-content`.
 * @param {import('../../types').PumSize} [vnode.attrs.size='md'] - Toggle size:
 *   `xs`, `sm`, `md`, `lg` or `xl` (default `md`).
 * @param {boolean} [vnode.attrs.checked] - Controlled checked state applied to
 *   the native input.
 * @param {boolean} [vnode.attrs.disabled] - Disables the input (`cursor:
 *   not-allowed`, reduced opacity).
 * @param {string} [vnode.attrs.className] - Extra CSS class(es) appended to the
 *   base `toggle` class and recipe output.
 * @param {(e: Event) => void} [vnode.attrs.onchange] - Change handler passed to
 *   the native input.
 * @param {object} [vnode.attrs] - Any other attributes are spread onto the
 *   `<input>` element.
 * @returns {import('mithril').Vnode} An `<input type="checkbox">.toggle` element.
 */
export const Toggle = {
  view(vnode) {
    const { color, size, checked, disabled, className, onchange, ...rest } = vnode.attrs

    return m('input', {
      type: 'checkbox',
      className: cx('toggle', toggleRecipe({ color, size }), className),
      checked,
      disabled,
      onchange,
      ...rest
    })
  }
}
