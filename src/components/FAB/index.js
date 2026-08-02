import m from 'mithril'
import { fabStyles, fabLabelStyles } from '../../recipes/fab'
import { buttonStyles } from '../../recipes/button'
import { cx } from '../../utils/cx'

// TODO (noted 2026-08-02, needs a closer look later): visuals/CSS are fine,
// but event handling is minimal — currently relies entirely on native
// :focus-within (click/Tab to open, click elsewhere or Escape does NOT
// explicitly close it beyond whatever blur naturally does). Worth reviewing:
// closing on outside click, Escape key, and firing a callback when an
// FABAction is chosen (so the menu can close itself after a selection).
export const FAB = {
  view(vnode) {
    const { flower, className, ...rest } = vnode.attrs

    return m('div', {
      className: cx('fab', flower && 'fab-flower', fabStyles(), className),
      ...rest
    }, vnode.children)
  }
}

export const FABMain = {
  view(vnode) {
    const { color, className, ...rest } = vnode.attrs

    return m('div', {
      className: cx('btn btn-lg btn-circle', buttonStyles({ shape: 'circle', size: 'lg', color: color || 'primary' }), className),
      tabindex: '0',
      role: 'button',
      ...rest
    }, vnode.children)
  }
}

export const FABAction = {
  view(vnode) {
    const { label, color, className, ...rest } = vnode.attrs

    return m('div', { className: cx(className) }, [
      label && m('span', { className: cx('fab-action-label', fabLabelStyles()) }, label),
      m('button', {
        className: cx('btn btn-lg btn-circle', buttonStyles({ shape: 'circle', size: 'lg', color })),
        ...rest
      }, vnode.children),
    ])
  }
}
