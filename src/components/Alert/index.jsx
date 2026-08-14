import m from 'mithril'
import { alertRecipe } from '../../recipes/alert'
import { cx } from '../../utils/cx'

/**
 * Alert — a feedback banner with semantic color variants.
 *
 * Renders a `div[role="alert"]` styled by the `alertRecipe` recipe
 * (`cva()`, no defaultStyles — all visuals go through className only).
 * The recipe styles descendants via CSS selectors, so a title
 * (`h3`) and description (`.alert-description`) can be placed as
 * plain children with no wrapper components. Dismissing the alert is
 * left to the consumer (no built-in close button or animation).
 *
 * @param {object} vnode - Mithril vnode
 * @param {'info'|'success'|'warning'|'error'} [vnode.attrs.color] - Semantic
 *   color: sets `--alert-color`/`--alert-border-color` and text color.
 * @param {'outline'|'dash'|'soft'} [vnode.attrs.variant] - Style variant:
 *   `outline` (transparent, colored border), `dash` (dashed border),
 *   `soft` (tinted background via `color-mix`).
 * @param {'horizontal'|'vertical'} [vnode.attrs.direction='horizontal'] -
 *   Layout of icon/content: `horizontal` (row) or `vertical` (column).
 * @param {string} [vnode.attrs.className] - Extra CSS class(es) appended to
 *   the base `alert` class and recipe output.
 * @param {object} [vnode.attrs] - Any other attributes are spread onto the
 *   `div` (e.g. `id`, event handlers).
 * @param {import('mithril').Children} [vnode.children] - Alert content:
 *   typically an icon, an `h3` title, and/or a `.alert-description`.
 * @returns {import('mithril').Vnode} A `div.alert` element with `role="alert"`.
 */
export const Alert = {
  view(vnode) {
    const { variant, color, direction, className, ...rest } = vnode.attrs
    
    return m('div', {
      role: 'alert',
      className: cx('alert', alertRecipe({ variant, color, direction }), className),
      ...rest
    }, vnode.children)
  }
}
