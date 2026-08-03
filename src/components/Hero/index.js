import m from 'mithril'
import { hero } from '../../recipes/hero'
import { cx } from '../../utils/cx'

export const Hero = {
  view(vnode) {
    const { className, ...rest } = vnode.attrs

    return m('div', {
      className: cx('hero', hero({}).hero, className),
      ...rest
    }, vnode.children)
  }
}

export const HeroContent = {
  view(vnode) {
    const { className, ...rest } = vnode.attrs
    return m('div', { className: cx('hero-content', hero({}).content, className), ...rest }, vnode.children)
  }
}

export const HeroOverlay = {
  view(vnode) {
    const { className, ...rest } = vnode.attrs
    return m('div', { className: cx('hero-overlay', hero({}).overlay, className), ...rest }, vnode.children)
  }
}
