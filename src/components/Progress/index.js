import m from 'mithril'
import { progress } from '../../../styled-system/recipes'
import { cx } from '../../../styled-system/css'


/**
 * Progress bar that fills toward `max` based on `value`.
 * @type {import('mithril').Component<import('./index').ProgressAttrs>}
 */
export const Progress = {
  view(vnode) {
    const { color, value, max, className, ...rest } = vnode.attrs

    return m('progress', {
      className: cx('progress', progress({ color }), className),
      value,
      max: max || 100,
      ...rest
    })
  }
}
