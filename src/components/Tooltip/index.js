import m from 'mithril'
import { tooltipStyles } from '../../recipes/tooltip'
import { cx } from '../../utils/cx'

export const Tooltip = {
  view(vnode) {
    const { tip, position, color, open, className, ...rest } = vnode.attrs

    return m('div', {
      className: cx(
        'tooltip',
        tooltipStyles({ position, color }),
        open && 'tooltip-open',
        className
      ),
      'data-tip': tip,
      ...rest
    }, vnode.children)
  }
}
