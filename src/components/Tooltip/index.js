import m from 'mithril'
import { cx } from '../../styled-system/css'

export const Tooltip = {
  view(vnode) {
    const { tip, position, color, open, className, children, ...rest } = vnode.attrs

    return m('div', {
      className: cx(
        'tooltip',
        position && `tooltip-${position}`,
        color && `tooltip-${color}`,
        open && 'tooltip-open',
        className
      ),
      'data-tip': tip,
      ...rest
    }, children)
  }
}
