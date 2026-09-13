import m from 'mithril'
import { megamenu } from '../../../styled-system/recipes'
import { cx } from '../../../styled-system/css'

/**
 * Cached result of `megamenu({})` — subcomponents without variants
 * reuse the same classes on every render. Avoids calling the sva repeatedly.
 * @type {ReturnType<typeof megamenu>}
 */
const defaultStyles = megamenu({})

/**
 * Megamenu component. Navigation bar with dropdown panels that
 * open on hover/focus over each trigger. `size` controls the
 * height and `vertical` stacks the items in a column.
 *
 * @type {import('mithril').Component<import('./index').MegamenuAttrs>}
 */
export const Megamenu = {
  view(vnode) {
    const { size, vertical, className, ...rest } = vnode.attrs

    return m('nav', {
      className: cx('megamenu', megamenu({ size, vertical }).megamenu, className),
      ...rest
    }, vnode.children)
  }
}

/**
 * MegamenuItem component. Wraps a trigger and its panel; on hover or
 * focus over the item the associated panel is shown.
 *
 * @type {import('mithril').Component<import('./index').MegamenuItemAttrs>}
 */
export const MegamenuItem = {
  view(vnode) {
    const { className, ...rest } = vnode.attrs
    return m('div', { className: cx('megamenu-item', defaultStyles.item, className), ...rest }, vnode.children)
  }
}

/**
 * MegamenuTrigger component. Button or link that opens the panel. With `href`
 * it renders an `<a>`, otherwise a `<button>`; `active` highlights the trigger and
 * `chevron` adds the dropdown arrow.
 *
 * @type {import('mithril').Component<import('./index').MegamenuTriggerAttrs>}
 */
export const MegamenuTrigger = {
  view(vnode) {
    const { href, active, chevron = true, className, ...rest } = vnode.attrs

    return m(href ? 'a' : 'button', {
      type: href ? undefined : 'button',
      href,
      className: cx('megamenu-trigger', megamenu({ active, chevron }).trigger, className),
      ...rest
    }, vnode.children)
  }
}

/**
 * MegamenuPanel component. Dropdown content of a MegamenuItem,
 * absolutely positioned below the trigger.
 *
 * @type {import('mithril').Component<import('./index').MegamenuPanelAttrs>}
 */
export const MegamenuPanel = {
  view(vnode) {
    const { className, ...rest } = vnode.attrs
    return m('div', { className: cx('megamenu-panel', defaultStyles.panel, className), ...rest }, vnode.children)
  }
}

/**
 * MegamenuActive component. Decorative layer that highlights the active trigger.
 *
 * @type {import('mithril').Component<import('./index').MegamenuActiveAttrs>}
 */
export const MegamenuActive = {
  view(vnode) {
    const { className, ...rest } = vnode.attrs
    return m('span', { className: cx('megamenu-active', defaultStyles.active, className), ...rest })
  }
}
