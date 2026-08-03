import m from 'mithril'
import { megamenu } from '../../recipes/megamenu'
import { cx } from '../../utils/cx'


export const Megamenu = {
  view(vnode) {
    const { size, vertical, className, ...rest } = vnode.attrs

    return m('nav', {
      className: cx('megamenu', megamenu({ size, vertical }).megamenu, className),
      ...rest
    }, vnode.children)
  }
}

export const MegamenuItem = {
  view(vnode) {
    const { className, ...rest } = vnode.attrs
    return m('div', { className: cx('megamenu-item', megamenu({}).item, className), ...rest }, vnode.children)
  }
}

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

export const MegamenuPanel = {
  view(vnode) {
    const { className, ...rest } = vnode.attrs
    return m('div', { className: cx('megamenu-panel', megamenu({}).panel, className), ...rest }, vnode.children)
  }
}

export const MegamenuActive = {
  view(vnode) {
    const { className, ...rest } = vnode.attrs
    return m('span', { className: cx('megamenu-active', megamenu({}).active, className), ...rest })
  }
}
