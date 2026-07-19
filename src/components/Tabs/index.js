import m from 'mithril'
import { tabsStyles } from '../../recipes/tabs'
import { cx } from '../../utils/cx'


export const Tabs = {
  view(vnode) {
    const { variant, size, boxed, bordered, lifted, className, children, ...rest } = vnode.attrs

    return m('div', {
      role: 'tablist',
      className: cx(
        'tabs',
        tabsStyles({ variant: boxed ? 'box' : bordered ? 'border' : lifted ? 'lift' : variant, size }),
        className
      ),
      ...rest
    }, children)
  }
}

export const Tab = {
  view(vnode) {
    const { active, disabled, className, children, ...rest } = vnode.attrs

    return m('button', {
      role: 'tab',
      className: cx(
        'tab',
        active && 'tab-active',
        disabled && 'tab-disabled',
        className
      ),
      disabled,
      ...rest
    }, children)
  }
}

export const TabContent = {
  view(vnode) {
    const { className, children, ...rest } = vnode.attrs
    return m('div', { role: 'tabpanel', className: cx('tab-content', className), ...rest }, children)
  }
}
