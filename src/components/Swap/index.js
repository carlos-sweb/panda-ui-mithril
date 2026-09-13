import m from 'mithril'
import { swap } from '../../../styled-system/recipes'
import { cx } from '../../../styled-system/css'

/**
 * Swap — on/off toggle that swaps two contents.
 *
 * Renders a `<label>` that wraps a hidden `<input type="checkbox">` plus
 * the `.swap-on` / `.swap-off` blocks. The toggle is 100% CSS: clicking
 * the label toggles the native checkbox and the recipe (`cva()`, single-slot, without
 * `defaultStyles`) switches opacity/transform via
 * `input:checked ~ .swap-on|.swap-off` + `transition` — with no JS state.
 *
 * - `active` adds the `swap-active` class (programmatic/uncontrolled toggle,
 *   without needing to interact with the checkbox).
 * - `checked` + `onchange` allow controlled use (they propagate to the input).
 * - `style="flip"` uses rotateY with `backfaceVisibility`; `style="rotate"`
 *   (default) rotates the active content 45deg.
 *
 * @param {object} vnode - Mithril vnode
 * @param {boolean} [vnode.attrs.active] - Applies the `swap-active` class to
 *   show `.swap-on` without depending on the checkbox state.
 * @param {'rotate'|'flip'} [vnode.attrs.style] - Transition style:
 *   `rotate` (default) or `flip` 3D.
 * @param {import('mithril').Children} [vnode.attrs.on] - Content visible
 *   when the swap is active (`swap-on`).
 * @param {import('mithril').Children} [vnode.attrs.off] - Content visible
 *   when the swap is inactive (`swap-off`).
 * @param {boolean} [vnode.attrs.checked] - Controlled state of the checkbox.
 * @param {(checked: boolean, e: Event) => void} [vnode.attrs.onchange] - Change handler of the
 *   checkbox (controlled use). Receives the new boolean state and the DOM event.
 * @param {string} [vnode.attrs.className] - Extra class(es) added after the
 *   base `swap` class and the recipe output.
 * @param {object} [vnode.attrs] - Any other attribute is propagated to the label.
 * @param {import('mithril').Children} [vnode.children] - Additional content
 *   after the on/off blocks.
 * @returns {import('mithril').Vnode} A `label.swap` element.
 * @type {import('mithril').Component<import('./index').SwapAttrs>}
 */
export const Swap = {    
  view(vnode) {
    const { active, style, size, className, on, off, checked, onchange, ...rest } = vnode.attrs
    return m('label', {
      className: cx('swap', swap({ style, size }), active && 'swap-active', className),
      ...rest
    }, [
      m('input', {
        type: 'checkbox',
        checked,
        onchange: onchange ? (e) => onchange(e.target.checked, e) : undefined
      }),
      on && m('div', { className: 'swap-on' }, on),
      off && m('div', { className: 'swap-off' }, off),
      vnode.children,
    ])
  }
}
