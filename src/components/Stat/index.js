import m from 'mithril'
import {
  stat,
} from '../../../styled-system/recipes'
import { cx } from '../../../styled-system/css'

/**
 * Componente Stats. Contenedor en grid de una o más Stats, en horizontal
 * o vertical.
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
 * Resultado cacheado de `stat({})` — los subcomponentes no pasan variantes,
 * así que sus clases son determinísticas. Evita llamar al sva en cada render.
 * @type {ReturnType<typeof stat>}
 */
const defaultStyles = stat({})

/**
 * Stat individual: una celda con su propio grid interno.
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
 * Título de la stat.
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
 * Valor principal de la stat.
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
 * Descripción o detalle de la stat.
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
 * Figura o icono de la stat.
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
 * Zona de acciones de la stat.
 *
 * @type {import('mithril').Component<import('./index').StatActionsAttrs>}
 */
export const StatActions = {
  view(vnode) {
    const { className, ...rest } = vnode.attrs
    return m('div', { className: cx('stat-actions', defaultStyles.actions, className), ...rest }, vnode.children)
  }
}
