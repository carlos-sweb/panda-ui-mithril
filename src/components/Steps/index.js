import m from 'mithril'
import { cx } from '../../../styled-system/css'

export const Steps = {
  view(vnode) {
    const { horizontal, vertical, className, children, ...rest } = vnode.attrs

    return m('ul', {
      className: cx(
        'steps',
        horizontal !== false && 'steps-horizontal',
        vertical && 'steps-vertical',
        className
      ),
      ...rest
    }, children)
  }
}

export const Step = {
  view(vnode) {
    const { color, primary, className, children, ...rest } = vnode.attrs

    return m('li', {
      className: cx(
        'step',
        color && `step-${color}`,
        primary && 'step-primary',
        className
      ),
      ...rest
    }, children)
  }
}

export const StepIcon = {
  view(vnode) {
    const { className, children, ...rest } = vnode.attrs
    return m('span', { className: cx('step-icon', className), ...rest }, children)
  }
}
