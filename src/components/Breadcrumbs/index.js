import m from 'mithril'
import { breadcrumbs } from '../../../styled-system/recipes'
import { cx } from '../../../styled-system/css'

/**
 * Componente Breadcrumbs. Miga de pan con separador en chevron entre items.
 * Acepta un array `items` ({label, href}) o contenido como children.
 *
 * @type {import('mithril').Component<import('./index').BreadcrumbsAttrs>}
 */
export const Breadcrumbs = {
  view(vnode) {
    const { className, items, ...rest } = vnode.attrs

    return m('div', {
      className: cx('breadcrumbs', breadcrumbs(), className),
      ...rest
    }, m('ul', null, items
      ? items.map((item, i) =>
          m('li', { key: i }, item.href
            ? m('a', { href: item.href }, item.label)
            : m('span', null, item.label)
          )
        )
      : vnode.children
    ))
  }
}
