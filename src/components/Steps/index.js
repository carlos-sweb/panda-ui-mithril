import m from 'mithril'
import { steps } from '../../recipes/steps'
import { cx } from '../../utils/cx'

export const Steps = {
  view(vnode) {
    const { horizontal, vertical, className, ...rest } = vnode.attrs
    const direction = vertical && !horizontal ? 'vertical' : 'horizontal'

    return m('ul', {
      className: cx('steps', steps({ direction }).steps, className),
      ...rest
    }, vnode.children)
  }
}

export const Step = {
  view(vnode) {
    const { color, className, ...rest } = vnode.attrs

    return m('li', {
      className: cx('step', color && `step-${color}`, steps({ color }).step, className),
      ...rest
    }, vnode.children)
  }
}

export const StepIcon = {
  view(vnode) {
    const { className, ...rest } = vnode.attrs
    return m('span', { className: cx('step-icon', className), ...rest }, vnode.children)
  }
}
