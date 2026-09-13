import m from 'mithril'
import { tooltip } from '../../../styled-system/recipes'
import { cx } from '../../../styled-system/css'

/**
 * Tooltip. Shows additional information (`tip`) on hover, on receiving
 * focus-visible or imperatively via `open`.
 *
 * - The bubble and the tail are pseudo-elements (`:before`/`:after`) that are
 *   always in the DOM with `opacity: 0`; the recipe animates them to `opacity: 1`
 *   with `transition` (see `recipes.ts`).
 * - Hover and focus-visible are already 100% CSS (selectors `:hover` and
 *   `:has(:focus-visible)` in the recipe). The `open` prop covers the state
 *   controlled by the consumer (any condition other than hover/focus,
 *   e.g. click, timer, state machine) by adding the `tooltip-open` class.
 * - It is not migratable to `@starting-style` + `transition`: the pseudo-elements
 *   never go through `display: none` (they always exist at `opacity: 0`), so
 *   `@starting-style` never fires; and it also cannot express arbitrary
 *   JS state, only insertion/display changes. The imperative class
 *   `tooltip-open` is kept.
 *
 * @type {import('mithril').Component<import('./index').TooltipAttrs>}
 */
export const Tooltip = {
  /** @param {Object} vnode @returns {import('mithril').Vnode} */
  view(vnode) {
    const { tip, position, color, open, className, ...rest } = vnode.attrs

    return m('div', {
      className: cx(
        'tooltip',
        tooltip({ position, color }),
        open && 'tooltip-open',
        className
      ),
      'data-tip': tip,
      ...rest
    }, vnode.children)
  }
}
