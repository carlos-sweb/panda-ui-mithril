import m from 'mithril'
import { breadcrumbsStyles } from '../../recipes/breadcrumbs'
import { cx } from '../../utils/cx'

export const Breadcrumbs = {
  view(vnode) {
    const { className, items, ...rest } = vnode.attrs

    return m('div', {
      className: cx('breadcrumbs', breadcrumbsStyles(), className),
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
