import m from 'mithril'
import {
  statsStyles,
  statStyles,
  statTitleStyles,
  statValueStyles,
  statDescStyles,
  statFigureStyles,
  statActionsStyles,
} from '../../recipes/stat'
import { cx } from '../../utils/cx'

export const Stats = {
  view(vnode) {
    const { horizontal, vertical, className, ...rest } = vnode.attrs
    const direction = vertical ? 'vertical' : 'horizontal'

    return m('div', {
      className: cx('stats', statsStyles({ direction }), className),
      ...rest
    }, vnode.children)
  }
}

export const Stat = {
  view(vnode) {
    const { className, ...rest } = vnode.attrs
    return m('div', { className: cx('stat', statStyles(), className), ...rest }, vnode.children)
  }
}

export const StatTitle = {
  view(vnode) {
    const { className, ...rest } = vnode.attrs
    return m('div', { className: cx('stat-title', statTitleStyles(), className), ...rest }, vnode.children)
  }
}

export const StatValue = {
  view(vnode) {
    const { className, ...rest } = vnode.attrs
    return m('div', { className: cx('stat-value', statValueStyles(), className), ...rest }, vnode.children)
  }
}

export const StatDesc = {
  view(vnode) {
    const { className, ...rest } = vnode.attrs
    return m('div', { className: cx('stat-desc', statDescStyles(), className), ...rest }, vnode.children)
  }
}

export const StatFigure = {
  view(vnode) {
    const { className, ...rest } = vnode.attrs
    return m('div', { className: cx('stat-figure', statFigureStyles(), className), ...rest }, vnode.children)
  }
}

export const StatActions = {
  view(vnode) {
    const { className, ...rest } = vnode.attrs
    return m('div', { className: cx('stat-actions', statActionsStyles(), className), ...rest }, vnode.children)
  }
}
