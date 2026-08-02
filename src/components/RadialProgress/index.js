import m from 'mithril'
import { radialProgressStyles } from '../../recipes/radialProgress'
import { cx } from '../../utils/cx'

export const RadialProgress = {
  view(vnode) {
    const { value, size, thickness, className, ...rest } = vnode.attrs

    return m('div', {
      role: 'progressbar',
      className: cx('radial-progress', radialProgressStyles(), className),
      style: `--value:${value || 0};${size ? `--size:${size};` : ''}${thickness ? `--thickness:${thickness};` : ''}`,
      'aria-valuenow': value || 0,
      ...rest
    }, vnode.children)
  }
}
