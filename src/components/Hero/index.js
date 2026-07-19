import m from 'mithril'
import { cx } from '../../../styled-system/css'

export const Hero = {
  view(vnode) {
    const { className, children, ...rest } = vnode.attrs

    return m('div', {
      className: cx('hero', className),
      ...rest
    }, children)
  }
}

export const HeroContent = {
  view(vnode) {
    const { className, children, ...rest } = vnode.attrs
    return m('div', { className: cx('hero-content', className), ...rest }, children)
  }
}

export const HeroOverlay = {
  view(vnode) {
    const { className, children, ...rest } = vnode.attrs
    return m('div', { className: cx('hero-overlay', className), ...rest }, children)
  }
}
