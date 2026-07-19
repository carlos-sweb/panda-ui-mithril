import m from 'mithril'
import { cx } from '../../styled-system/css'

export const Breadcrumbs = {
  view(vnode) {
    const { className, items, children, ...rest } = vnode.attrs

    return m('div', {
      className: cx('breadcrumbs', className),
      ...rest
    }, m('ul', null, items
      ? items.map((item, i) =>
          m('li', { key: i }, item.href
            ? m('a', { href: item.href }, item.label)
            : m('span', null, item.label)
          )
        )
      : children
    ))
  }
}
