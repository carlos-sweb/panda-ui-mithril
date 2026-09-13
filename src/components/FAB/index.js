import m from 'mithril'
import { button , fab, fabLabel } from '../../../styled-system/recipes'
import { cx } from '../../../styled-system/css'

// TODO (noted 2026-08-02, needs a closer look later): visuals/CSS are fine,
// but event handling is minimal — currently relies entirely on native
// :focus-within (click/Tab to open, click elsewhere or Escape does NOT
// explicitly close it beyond whatever blur naturally does). Worth reviewing:
// closing on outside click, Escape key, and firing a callback when an
// FABAction is chosen (so the menu can close itself after a selection).
/**
 * FAB component (Floating Action Button). Floating actions container;
 * with `flower` it spreads the actions in a semicircle instead of a vertical stack.
 *
 * @type {import('mithril').Component<import('./index').FABAttrs>}
 */
export const FAB = {
  view(vnode) {
    const { flower, className, ...rest } = vnode.attrs

    return m('div', {
      className: cx('fab', flower && 'fab-flower', fab(), className),
      ...rest
    }, vnode.children)
  }
}

/**
 * FAB main button: large colored circle that opens/closes the actions.
 *
 * @type {import('mithril').Component<import('./index').FABMainAttrs>}
 */
export const FABMain = {
  view(vnode) {
    const { color, className, borderWidth, ...rest } = vnode.attrs

    return m('div', {
      className: cx('btn btn-lg btn-circle', button({ shape: 'circle', size: 'lg', color: color || 'primary', borderWidth }), className),
      tabindex: '0',
      role: 'button',
      ...rest
    }, vnode.children)
  }
}

/**
 * Individual FAB action, with an optional text label (`label`)
 * and its own color.
 *
 * @type {import('mithril').Component<import('./index').FABActionAttrs>}
 */
export const FABAction = {
  view(vnode) {
    const { label, color, className, borderWidth, ...rest } = vnode.attrs

    return m('div', { className: cx(className) }, [
      label && m('span', { className: cx('fab-action-label', fabLabel()) }, label),
      m('button', {
        className: cx('btn btn-lg btn-circle', button({ shape: 'circle', size: 'lg', color, borderWidth })),
        ...rest
      }, vnode.children),
    ])
  }
}
