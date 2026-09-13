import m from 'mithril'
import {
  stat,
} from '../../../styled-system/recipes'
import { cx } from '../../../styled-system/css'

/**
 * Stats component. Grid container for one or more Stats, horizontal
 * or vertical.
 *
 * @type {import('mithril').Component<import('./index').StatsAttrs>}
 */
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

/**
 * Cached result of `stat({})` — the subcomponents pass no variants,
 * so their classes are deterministic. Avoids calling the sva on every render.
 * @type {ReturnType<typeof stat>}
 */
const defaultStyles = stat({})

/**
 * Individual Stat: a cell with its own internal grid.
 *
 * @type {import('mithril').Component<import('./index').StatAttrs>}
 */
export const Stat = {
  view(vnode) {
    const { className, ...rest } = vnode.attrs
    return m('div', { className: cx('stat', defaultStyles.stat, className), ...rest }, vnode.children)
  }
}

/**
 * Stat title.
 *
 * @type {import('mithril').Component<import('./index').StatTitleAttrs>}
 */
export const StatTitle = {
  view(vnode) {
    const { className, ...rest } = vnode.attrs
    return m('div', { className: cx('stat-title', defaultStyles.title, className), ...rest }, vnode.children)
  }
}

/**
 * Main value of the stat.
 *
 * @type {import('mithril').Component<import('./index').StatValueAttrs>}
 */
export const StatValue = {
  view(vnode) {
    const { className, ...rest } = vnode.attrs
    return m('div', { className: cx('stat-value', defaultStyles.value, className), ...rest }, vnode.children)
  }
}

/**
 * Description or detail of the stat.
 *
 * @type {import('mithril').Component<import('./index').StatDescAttrs>}
 */
export const StatDesc = {
  view(vnode) {
    const { className, ...rest } = vnode.attrs
    return m('div', { className: cx('stat-desc', defaultStyles.desc, className), ...rest }, vnode.children)
  }
}

/**
 * Figure or icon of the stat.
 *
 * @type {import('mithril').Component<import('./index').StatFigureAttrs>}
 */
export const StatFigure = {
  view(vnode) {
    const { className, ...rest } = vnode.attrs
    return m('div', { className: cx('stat-figure', defaultStyles.figure, className), ...rest }, vnode.children)
  }
}

/**
 * Actions area of the stat.
 *
 * @type {import('mithril').Component<import('./index').StatActionsAttrs>}
 */
export const StatActions = {
  view(vnode) {
    const { className, ...rest } = vnode.attrs
    return m('div', { className: cx('stat-actions', defaultStyles.actions, className), ...rest }, vnode.children)
  }
}
