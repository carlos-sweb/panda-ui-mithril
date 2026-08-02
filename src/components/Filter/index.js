import m from 'mithril'
import { filterStyles } from '../../recipes/filter'
import { buttonStyles } from '../../recipes/button'
import { cx } from '../../utils/cx'

export const Filter = {
  view(vnode) {
    const { className, ...rest } = vnode.attrs

    return m('div', {
      className: cx('filter', filterStyles(), className),
      ...rest
    }, vnode.children)
  }
}

export const FilterOption = {
  view(vnode) {
    const { className, ...rest } = vnode.attrs
    return m('input', {
      type: 'radio',
      className: cx('btn', buttonStyles(), className),
      ...rest
    })
  }
}

export const FilterReset = {
  view(vnode) {
    const { className, ...rest } = vnode.attrs
    return m('input', {
      type: 'radio',
      className: cx('btn filter-reset', buttonStyles(), className),
      ...rest
    })
  }
}
