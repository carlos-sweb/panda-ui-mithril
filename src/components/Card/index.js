import m from 'mithril'
import { card } from '../../../styled-system/recipes'
import { cx } from '../../../styled-system/css'

/**
 * Card component. Content container with size variants, border
 * (`border`/`dash`), shadow (`shadow`), side layout (`side`) and
 * full-bleed image (`imageFull`). It brings `backgroundColor:
 * token(colors.base-100)` in its base (its own recipe) — no need
 * to add it by hand.
 *
 * @type {import('mithril').Component<import('./index').CardAttrs>}
 */
export const Card = {
  view(vnode) {
    const { size, border, dash, shadow, side, imageFull, className, ...rest } = vnode.attrs

    return m('div', {
      className: cx(
        'card',
        border && 'card-border',
        dash && 'card-dash',
        shadow && 'card-shadow',
        side && 'card-side',
        imageFull && 'image-full',
        card({ size, border, dash, shadow, side, imageFull }).card,
        className
      ),
      ...rest
    }, vnode.children)
  }
}

/**
 * Cached result of `card({})` — the subcomponents pass no variants
 * (except CardActions with `justify`), so their classes are deterministic.
 * Avoids calling the sva on every render.
 * @type {ReturnType<typeof card>}
 */
const defaultStyles = card({})

/**
 * Card body: stacks the content with padding and gap. `rail` turns it
 * into a split side compartment (intended for
 * `<Card side>`) — divider border + content centered in the row, for
 * example a vertical rail of actions/presets next to the main content.
 *
 * @type {import('mithril').Component<import('./index').CardBodyAttrs>}
 */
export const CardBody = {
  view(vnode) {
    const { rail, className, ...rest } = vnode.attrs
    // `rail` is the only real variant CardBody can receive — avoid
    // calling card({}) again (and losing the defaultStyles cache)
    // unless it is actually needed.
    const styles = rail ? card({ rail }).body : defaultStyles.body
    return m('div', { className: cx('card-body', rail && 'card-body-rail', styles, className), ...rest }, vnode.children)
  }
}

/**
 * Card title.
 *
 * @type {import('mithril').Component<import('./index').CardTitleAttrs>}
 */
export const CardTitle = {
  view(vnode) {
    const { className, ...rest } = vnode.attrs
    return m('h2', { className: cx('card-title', defaultStyles.title, className), ...rest }, vnode.children)
  }
}

/**
 * Card actions area; `justify` controls its alignment
 * (start, center, end, between).
 *
 * @type {import('mithril').Component<import('./index').CardActionsAttrs>}
 */
export const CardActions = {
  view(vnode) {
    const { justify, className, ...rest } = vnode.attrs
    return m('div', {
      className: cx('card-actions', card({ justify }).actions, className),
      ...rest
    }, vnode.children)
  }
}

/**
 * Card featured image (uses `<figure>`).
 *
 * @type {import('mithril').Component<import('./index').CardFigureAttrs>}
 */
export const CardFigure = {
  view(vnode) {
    const { className, ...rest } = vnode.attrs
    return m('figure', { className, ...rest }, vnode.children)
  }
}
