import m from 'mithril'
import { join } from '../../../styled-system/recipes'
import { button } from '../../../styled-system/recipes'
import { cx } from '../../utils/cx'

/**
 * Componente Pagination. Contenedor `join` que agrupa botones de paginación
 * contiguos con esquinas redondeadas en los extremos.
 *
 * @type {import('mithril').Component<import('./index').PaginationAttrs>}
 */
export const Pagination = {
  view(vnode) {
    const { className, ...rest } = vnode.attrs

    return m('div', {
      className: cx('join', join(), className),
      ...rest
    }, vnode.children)
  }
}

/**
 * Componente PaginationButton. Botón de paginación; `active` marca la página
 * actual y `disabled` deshabilita la interacción.
 *
 * @type {import('mithril').Component<import('./index').PaginationButtonAttrs>}
 */
export const PaginationButton = {
  view(vnode) {
    const { active, disabled, className, borderWidth, ...rest } = vnode.attrs

    return m('button', {
      className: cx('btn join-item', button({ active, borderWidth }), className),
      disabled,
      ...rest
    }, vnode.children)
  }
}
