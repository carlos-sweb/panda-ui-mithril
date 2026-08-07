import m from 'mithril'
import { joinStyles } from '../../recipes/join'
import { buttonStyles } from '../../recipes/button'
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
      className: cx('join', joinStyles(), className),
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
      className: cx('btn join-item', buttonStyles({ active, borderWidth }), className),
      disabled,
      ...rest
    }, vnode.children)
  }
}
