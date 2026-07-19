import m from 'mithril'
import { cx } from '../../styled-system/css'

export const Filter = {
  view(vnode) {
    const { className, children, ...rest } = vnode.attrs

    return m('div', {
      className: cx('filter', className),
      ...rest
    }, children)
  }
}

export const FilterReset = {
  view(vnode) {
    const { className, ...rest } = vnode.attrs
    return m('input', {
      type: 'radio',
      className: cx('btn filter-reset', className),
      name: 'filter',
      ...rest
    })
  }
}
