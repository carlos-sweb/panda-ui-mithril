import m from 'mithril'
import { list } from '../../recipes/list'
import { cx } from '../../utils/cx'


export const List = {
  view(vnode) {
    const { className, ...rest } = vnode.attrs

    return m('ul', {
      className: cx('list', list({}).list, className),
      ...rest
    }, vnode.children)
  }
}

export const ListRow = {
  view(vnode) {
    const { hover, className, ...rest } = vnode.attrs

    return m('li', {
      className: cx('list-row', list({ hover }).row, className),
      ...rest
    }, vnode.children)
  }
}

export const ListCol = {
  view(vnode) {
    const { grow, wrap, className, ...rest } = vnode.attrs

    return m('div', {
      className: cx(grow && 'list-col-grow', wrap && 'list-col-wrap', list({ wrap }).col, className),
      ...rest
    }, vnode.children)
  }
}
