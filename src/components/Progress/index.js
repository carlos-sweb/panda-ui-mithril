import m from 'mithril'
import { progressRecipe } from '../../recipes/progress'
import { cx } from '../../utils/cx'


/**
 * Progress bar that fills toward `max` based on `value`.
 * @type {import('mithril').Component<import('./index').ProgressAttrs>}
 */
export const Progress = {
  view(vnode) {
    const { color, value, max, className, ...rest } = vnode.attrs

    return m('progress', {
      className: cx('progress', progressRecipe({ color }), className),
      value,
      max: max || 100,
      ...rest
    })
  }
}
