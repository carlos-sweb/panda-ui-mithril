import m from 'mithril'
import { tabsStyles, tabStyles, tabContentStyles } from '../../recipes/tabs'
import { cx } from '../../utils/cx'

function resolveVariant(vnode) {
  const { variant, boxed, bordered, lifted } = vnode.attrs
  return boxed ? 'box' : bordered ? 'border' : lifted ? 'lift' : variant
}

export const Tabs = {
  view(vnode) {
    const { variant, size, boxed, bordered, lifted, className, ...rest } = vnode.attrs
    const resolved = resolveVariant(vnode)

    return m('div', {
      role: 'tablist',
      className: cx(
        'tabs',
        resolved && `tabs-${resolved}`,
        tabsStyles({ variant: resolved, size }),
        className
      ),
      ...rest
    }, vnode.children)
  }
}

export const Tab = {
  view(vnode) {
    const { active, disabled, variant, className, ...rest } = vnode.attrs

    return m('button', {
      type: 'button',
      role: 'tab',
      'aria-selected': active ? 'true' : 'false',
      className: cx(
        'tab',
        active && 'tab-active',
        disabled && 'tab-disabled',
        tabStyles({ variant }),
        className
      ),
      disabled,
      ...rest
    }, vnode.children)
  }
}

export const TabContent = {
  view(vnode) {
    const { active, variant, className, ...rest } = vnode.attrs
    return m('div', {
      role: 'tabpanel',
      className: cx('tab-content', tabContentStyles({ variant, active }), className),
      ...rest
    }, vnode.children)
  }
}
