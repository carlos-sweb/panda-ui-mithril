import m from 'mithril'
import { heroStyles, heroOverlayStyles, heroContentStyles } from '../../recipes/hero'
import { cx } from '../../utils/cx'

export const Hero = {
  view(vnode) {
    const { className, ...rest } = vnode.attrs

    return m('div', {
      className: cx('hero', heroStyles(), className),
      ...rest
    }, vnode.children)
  }
}

export const HeroContent = {
  view(vnode) {
    const { className, ...rest } = vnode.attrs
    return m('div', { className: cx('hero-content', heroContentStyles(), className), ...rest }, vnode.children)
  }
}

export const HeroOverlay = {
  view(vnode) {
    const { className, ...rest } = vnode.attrs
    return m('div', { className: cx('hero-overlay', heroOverlayStyles(), className), ...rest }, vnode.children)
  }
}
