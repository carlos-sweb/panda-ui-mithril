import m from 'mithril'
import { list } from '../../../styled-system/recipes'
import { cx } from '../../../styled-system/css'
import { Skeleton } from '../Skeleton/index.js'

/**
 * Componente List. Lista vertical con separadores entre filas; los hijos
 * (`ListRow`/`ListCol`) se distribuyen en grid. Usa el slot `list` de la recipe.
 *
 * Modos de uso:
 *  - **Compositivo** (sin `data`): children explícitos (`ListRow`/`ListCol`).
 *  - **Data-driven** (con `data`): el template se repite por item vía el prop
 *    `render={(item, index) => vnode}`. `key` controla el diffing al
 *    redimensionar/reordenar (default: índice). `header`/`footer` agregan
 *    filas estáticas, `empty` el estado vacío, `loading`/`loadingRows` filas
 *    Skeleton, `hover` resalta todas las filas y `ordered` renderiza `<ol>`.
 *    Los children también pueden ser UNA función `(item, index) => vnode`
 *    (único child) como alternativa legada a `render`.
 *
 * Nota: `header`/`footer` solo aplican en modo data-driven (en el modo
 * compositivo la cabecera se agrega como un `ListRow` normal, estilo daisyUI).
 *
 * @type {import('mithril').Component<import('./index').ListAttrs>}
 */
export const List = {
  view(vnode) {
    const { data, key, empty, header, footer, loading, loadingRows, hover, ordered, className, ...rest } = vnode.attrs
    const children = vnode.children

    // Resuelve el template: prop `render` primero; children-función (único
    // child) como alternativa. Mithril envuelve la función en un array [fn].
    const render = vnode.attrs.render
    const template = typeof render === 'function'
      ? render
      : (Array.isArray(children) && children.length === 1 && typeof children[0] === 'function')
        ? children[0]
        : null

    if (Array.isArray(data) && data.length > 0 && !template) {
      throw new Error(
        'List: se pasó `data` sin template. Usa `render={(item, index) => ...}` ' +
        'o un único child función. (Si mezclaste una función con otros children, ' +
        'la función debe ser el único child o moverla al prop `render`.)'
      )
    }

    const tag = ordered ? 'ol' : 'ul'

    let rows
    if (Array.isArray(data)) {
      if (loading) {
        // Fila skeleton por cada placeholder; todas con key (regla de Mithril)
        rows = Array.from({ length: loadingRows || 3 }, (_, i) =>
          m(ListRow, { key: `__loading-${i}__`, hover }, [
            m(ListCol, { grow: true }, m(Skeleton, { text: true })),
            m(ListCol, null, m(Skeleton, { text: true })),
          ])
        )
      } else if (data.length === 0) {
        // Estado vacío: header/empty/footer, todos sin key (nunca conviven
        // con filas keyed).
        rows = [
          ...(header != null ? [header] : []),
          ...(empty != null ? (Array.isArray(empty) ? empty : [empty]) : []),
          ...(footer != null ? [footer] : []),
        ]
      } else {
        const mapRow = (item, index) => {
          const row = template(item, index)
          if (row == null) return null
          // Inyecta key si el template no la puso (diffing de Mithril).
          const keyValue = key ? key(item, index) : index
          let out = row
          if (row.key == null && keyValue != null) {
            out = m(row.tag, { ...row.attrs, key: keyValue }, row.children)
          }
          // `hover` a nivel de List: aplica el resaltado a las filas ListRow.
          if (hover && out.tag === ListRow && !out.attrs.hover) {
            out = m(out.tag, { ...out.attrs, hover: true }, out.children)
          }
          return out
        }
        // header/footer con keys reservadas para mantener todo el array keyed
        rows = [
          ...(header != null ? [withKey(header, '__header__')] : []),
          ...data.map(mapRow).filter((row) => row != null),
          ...(footer != null ? [withKey(footer, '__footer__')] : []),
        ]
      }
    } else {
      rows = children
    }

    return m(tag, { className: cx('list', defaultStyles.list, className), ...rest }, rows)
  }
}

/**
 * Resultado cacheado de `list({})` — el componente principal no pasa variantes,
 * así que las clases son determinísticas. Evita llamar al sva en cada render.
 * @type {ReturnType<typeof list>}
 */
const defaultStyles = list({})

/** Clona el vnode inyectando `key` si no la tiene. */
function withKey(row, keyValue) {
  if (row == null || row.key != null || keyValue == null) return row
  return m(row.tag, { ...row.attrs, key: keyValue }, row.children)
}

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
