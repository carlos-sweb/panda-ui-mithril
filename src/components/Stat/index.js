import m from 'mithril'
import {
  stat,
} from '../../recipes/stat'
import { cx } from '../../utils/cx'

export const Stats = {
  view(vnode) {
    const { horizontal, vertical, className, ...rest } = vnode.attrs
    const direction = vertical ? 'vertical' : 'horizontal'

    return m('div', {
      className: cx('stats', stat({ direction }).stats, className),
      ...rest
    }, vnode.children)
  }
}

export const Stat = {
  view(vnode) {
    const { className, ...rest } = vnode.attrs
    return m('div', { className: cx('stat', stat({}).stat, className), ...rest }, vnode.children)
  }
}

export const StatTitle = {
  view(vnode) {
    const { className, ...rest } = vnode.attrs
    return m('div', { className: cx('stat-title', stat({}).title, className), ...rest }, vnode.children)
  }
}

export const StatValue = {
  view(vnode) {
    const { className, ...rest } = vnode.attrs
    return m('div', { className: cx('stat-value', stat({}).value, className), ...rest }, vnode.children)
  }
}

export const StatDesc = {
  view(vnode) {
    const { className, ...rest } = vnode.attrs
    return m('div', { className: cx('stat-desc', stat({}).desc, className), ...rest }, vnode.children)
  }
}

export const StatFigure = {
  view(vnode) {
    const { className, ...rest } = vnode.attrs
    return m('div', { className: cx('stat-figure', stat({}).figure, className), ...rest }, vnode.children)
  }
}

export const StatActions = {
  view(vnode) {
    const { className, ...rest } = vnode.attrs
    return m('div', { className: cx('stat-actions', stat({}).actions, className), ...rest }, vnode.children)
  }
}
