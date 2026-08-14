import m from 'mithril'
import { radialProgressRecipe } from '../../recipes/radialProgress'
import { cx } from '../../utils/cx'

export const RadialProgress = {
  view(vnode) {
    const { value, size, thickness, className, ...rest } = vnode.attrs

    return m('div', {
      role: 'progressbar',
      className: cx('radial-progress', radialProgressRecipe(), className),
      style: `--value:${value || 0};${size ? `--rprogress-size:${size};` : ''}${thickness ? `--thickness:${thickness};` : ''}`,
      'aria-valuenow': value || 0,
      ...rest
    }, vnode.children)
  }
}
