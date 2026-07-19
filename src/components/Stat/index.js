import m from 'mithril'
import { sva } from '../../styled-system/css'
import { cx } from '../../utils/cx'

const statStyles = sva({
  slots: ['root', 'title', 'value', 'desc', 'figure', 'actions'],
  base: {
    root: { display: 'flex', flexDirection: 'column', p: '4' },
    title: { fontSize: 'sm', color: 'base-content/60' },
    value: { fontSize: '2xl', fontWeight: 'bold' },
    desc: { fontSize: 'sm', color: 'base-content/60' },
    figure: { display: 'flex', alignItems: 'center' },
    actions: { display: 'flex', gap: '1', mt: '2' },
  },
  variants: {},
})

export const Stats = {
  view(vnode) {
    const { horizontal, vertical, className, children, ...rest } = vnode.attrs

    return m('div', {
      className: cx(
        'stats',
        horizontal && 'stats-horizontal',
        vertical && 'stats-vertical',
        className
      ),
      ...rest
    }, children)
  }
}

export const Stat = {
  view(vnode) {
    const { className, children, ...rest } = vnode.attrs
    return m('div', { className: cx('stat', className), ...rest }, children)
  }
}

export const StatTitle = {
  view(vnode) {
    const { className, children, ...rest } = vnode.attrs
    return m('div', { className: cx('stat-title', className), ...rest }, children)
  }
}

export const StatValue = {
  view(vnode) {
    const { className, children, ...rest } = vnode.attrs
    return m('div', { className: cx('stat-value', className), ...rest }, children)
  }
}

export const StatDesc = {
  view(vnode) {
    const { className, children, ...rest } = vnode.attrs
    return m('div', { className: cx('stat-desc', className), ...rest }, children)
  }
}

export const StatFigure = {
  view(vnode) {
    const { className, children, ...rest } = vnode.attrs
    return m('div', { className: cx('stat-figure', className), ...rest }, children)
  }
}

export const StatActions = {
  view(vnode) {
    const { className, children, ...rest } = vnode.attrs
    return m('div', { className: cx('stat-actions', className), ...rest }, children)
  }
}
