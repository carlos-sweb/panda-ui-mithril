import m from 'mithril'
import { button , filter } from '../../../styled-system/recipes'
import { cx } from '../../../styled-system/css'

/**
 * Filter component. Container for a group of filters with mutually
 * exclusive radio-style options; it groups FilterOption and FilterReset.
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
 * FilterOption component. Individual filter option rendered as a
 * radio `input` that looks like a button.
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
 * FilterReset component. Special option that clears the active filter,
 * rendered as a radio `input` that looks like a button.
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
