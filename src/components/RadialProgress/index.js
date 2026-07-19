import m from 'mithril'
import { cx } from '../../styled-system/css'

export const RadialProgress = {
  view(vnode) {
    const { value, size, thickness, className, children, ...rest } = vnode.attrs

    return m('div', {
      role: 'progressbar',
      className: cx('radial-progress', className),
      style: `--value:${value || 0};${size ? `--size:${size};` : ''}${thickness ? `--thickness:${thickness};` : ''}`,
      'aria-valuenow': value || 0,
      ...rest
    }, children)
  }
}
