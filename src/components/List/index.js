import m from 'mithril'
import { list } from '../../../styled-system/recipes'
import { cx } from '../../../styled-system/css'

/**
 * Componente List. Lista vertical con separadores entre filas; los hijos
 * (`ListRow`/`ListCol`) se distribuyen en grid. Usa el slot `list` de la recipe.
 *
 * @type {import('mithril').Component<import('./index').ListAttrs>}
 */
export const List = {
  view(vnode) {
    const { className, ...rest } = vnode.attrs

    return m('ul', {
      className: cx('list', defaultStyles.list, className),
      ...rest
    }, vnode.children)
  }
}

/**
 * Resultado cacheado de `list({})` — el componente principal no pasa variantes,
 * así que las clases son determinísticas. Evita llamar al sva en cada render.
 * @type {ReturnType<typeof list>}
 */
const defaultStyles = list({})

/**
 * Componente ListRow. Fila de la lista (`<li>`); con `hover` se resalta al
 * pasar el cursor (slot `row` de la recipe).
 *
 * @type {import('mithril').Component<import('./index').ListRowAttrs>}
 */
export const ListRow = {
  view(vnode) {
    const { hover, className, ...rest } = vnode.attrs

    return m('li', {
      className: cx('list-row', list({ hover }).row, className),
      ...rest
    }, vnode.children)
  }
}

/**
 * Componente ListCol. Columna dentro de una fila; `grow` la expande para ocupar
 * el espacio restante y `wrap` la baja a la siguiente línea (slot `col`).
 *
 * @type {import('mithril').Component<import('./index').ListColAttrs>}
 */
export const ListCol = {
  view(vnode) {
    const { grow, wrap, className, ...rest } = vnode.attrs

    return m('div', {
      className: cx(grow && 'list-col-grow', wrap && 'list-col-wrap', list({ wrap }).col, className),
      ...rest
    }, vnode.children)
  }
}
