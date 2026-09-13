import m from 'mithril'
import { breadcrumbs } from '../../../styled-system/recipes'
import { cx } from '../../../styled-system/css'

/**
 * Breadcrumbs component. Breadcrumb trail with a chevron separator between
 * items. Accepts an `items` array ({label, href}) or children content.
 *
 * @type {import('mithril').Component<import('./index').BreadcrumbsAttrs>}
 */
export const Breadcrumbs = {
  view(vnode) {
    const { className, items, ...rest } = vnode.attrs

    return m('div', {
      className: cx(  breadcrumbs(), className),
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
