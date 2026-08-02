import m from 'mithril'
import {
  megamenuStyles,
  megamenuItemStyles,
  megamenuTriggerStyles,
  megamenuPanelStyles,
  megamenuActiveStyles,
} from '../../recipes/megamenu'
import { cx } from '../../utils/cx'


export const Megamenu = {
  view(vnode) {
    const { size, vertical, className, ...rest } = vnode.attrs

    return m('nav', {
      className: cx('megamenu', megamenuStyles({ size, vertical }), className),
      ...rest
    }, vnode.children)
  }
}

export const MegamenuItem = {
  view(vnode) {
    const { className, ...rest } = vnode.attrs
    return m('div', { className: cx('megamenu-item', megamenuItemStyles(), className), ...rest }, vnode.children)
  }
}

export const MegamenuTrigger = {
  view(vnode) {
    const { href, active, chevron = true, className, ...rest } = vnode.attrs

    return m(href ? 'a' : 'button', {
      type: href ? undefined : 'button',
      href,
      className: cx('megamenu-trigger', megamenuTriggerStyles({ active, chevron }), className),
      ...rest
    }, vnode.children)
  }
}

export const MegamenuPanel = {
  view(vnode) {
    const { className, ...rest } = vnode.attrs
    return m('div', { className: cx('megamenu-panel', megamenuPanelStyles(), className), ...rest }, vnode.children)
  }
}

export const MegamenuActive = {
  view(vnode) {
    const { className, ...rest } = vnode.attrs
    return m('span', { className: cx('megamenu-active', megamenuActiveStyles(), className), ...rest })
  }
}
