import m from 'mithril'
import { button , filter } from '../../../styled-system/recipes'
import { cx } from '../../../styled-system/css'

/**
 * Componente Filter. Contenedor de un grupo de filtros con opciones
 * excluyentes estilo radio; agrupa los FilterOption y FilterReset.
 *
 * @type {import('mithril').Component<import('./index').FilterAttrs>}
 */
export const Filter = {
  view(vnode) {
    const { className, borderWidth, ...rest } = vnode.attrs

    return m('div', {
      className: cx('filter', filter(), className),
      ...rest
    }, vnode.children)
  }
}

/**
 * Componente FilterOption. Opción individual del filtro renderizada como un
 * `input` radio con aspecto de botón.
 *
 * @type {import('mithril').Component<import('./index').FilterOptionAttrs>}
 */
export const FilterOption = {
  view(vnode) {
    const { className, borderWidth, ...rest } = vnode.attrs
    return m('input', {
      type: 'radio',
      className: cx('btn', button({ borderWidth }), className),
      ...rest
    })
  }
}

/**
 * Componente FilterReset. Opción especial que limpia el filtro activo,
 * renderizada como un `input` radio con aspecto de botón.
 *
 * @type {import('mithril').Component<import('./index').FilterResetAttrs>}
 */
export const FilterReset = {
  view(vnode) {
    const { className, borderWidth, ...rest } = vnode.attrs
    return m('input', {
      type: 'radio',
      className: cx('btn filter-reset', button({ borderWidth }), className),
      ...rest
    })
  }
}
