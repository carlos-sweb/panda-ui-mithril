import m from 'mithril'
import { hero } from '../../../styled-system/recipes'
import { cx } from '../../../styled-system/css'

/**
 * Hero component. Full-width hero section; the HeroOverlay and
 * HeroContent children overlap the background in the same grid.
 *
 * @type {import('mithril').Component<import('./index').HeroAttrs>}
 */
export const Hero = {
  view(vnode) {
    const { className, ...rest } = vnode.attrs

    return m('div', {
      className: cx('hero', defaultStyles.hero, className),
      ...rest
    }, vnode.children)
  }
}

/**
 * Cached result of `hero({})` — subcomponents pass no variants,
 * so the classes are deterministic. Avoids calling sva on every render.
 * @type {ReturnType<typeof hero>}
 */
const defaultStyles = hero({})

/**
 * HeroContent component. Hero content, isolated above the overlay
 * (the recipe's `content` slot).
 *
 * @type {import('mithril').Component<import('./index').HeroContentAttrs>}
 */
export const HeroContent = {
  view(vnode) {
    const { className, ...rest } = vnode.attrs
    return m('div', { className: cx('hero-content', defaultStyles.content, className), ...rest }, vnode.children)
  }
}

/**
 * HeroOverlay component. Dark layer over the hero background (the recipe's
 * `overlay` slot).
 *
 * @type {import('mithril').Component<import('./index').HeroOverlayAttrs>}
 */
export const HeroOverlay = {
  view(vnode) {
    const { className, ...rest } = vnode.attrs
    return m('div', { className: cx('hero-overlay', defaultStyles.overlay, className), ...rest }, vnode.children)
  }
}
