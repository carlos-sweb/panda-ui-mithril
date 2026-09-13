import m from 'mithril'
import { steps } from '../../../styled-system/recipes'
import { cx } from '../../../styled-system/css'

/**
 * Steps component. Step progress, horizontal or vertical.
 *
 * @type {import('mithril').Component<import('./index').StepsAttrs>}
 */
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

/**
 * Individual step; `color` changes the color of its marker.
 *
 * @type {import('mithril').Component<import('./index').StepAttrs>}
 */
export const Step = {
  view(vnode) {
    const { color, className, ...rest } = vnode.attrs

    return m('li', {
      className: cx('step', color && `step-${color}`, steps({ color }).step, className),
      ...rest
    }, vnode.children)
  }
}

/**
 * Optional icon inside a step (replaces the default number).
 *
 * @type {import('mithril').Component<import('./index').StepIconAttrs>}
 */
export const StepIcon = {
  view(vnode) {
    const { className, ...rest } = vnode.attrs
    return m('span', { className: cx('step-icon', className), ...rest }, vnode.children)
  }
}
