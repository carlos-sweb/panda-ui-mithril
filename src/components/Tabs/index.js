import m from 'mithril'
import { cva } from '../../../styled-system/css'
import { cx } from '../../utils/cx'

const tabsStyles = cva({
  base: {
    display: 'flex',
    rounded: 'box',
  },
  variants: {
    variant: {
      box: { bg: 'base-200', p: '1', gap: '1' },
      border: { borderBottomWidth: '1px', borderColor: 'base-300' },
      lift: { borderBottomWidth: '2px', borderColor: 'base-300', mb: '-2px' },
    },
    size: {
      xs: { text: 'xs' },
      sm: { text: 'sm' },
      md: { text: 'sm' },
      lg: { text: 'md' },
      xl: { text: 'lg' },
    },
  },
})

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
