import m from 'mithril'
import { cx } from '../../styled-system/css'

export const Timeline = {
  view(vnode) {
    const { horizontal, vertical, snapIcon, compact, className, children, ...rest } = vnode.attrs

    return m('ul', {
      className: cx(
        'timeline',
        horizontal && 'timeline-horizontal',
        vertical !== false && !horizontal && 'timeline-vertical',
        snapIcon && 'timeline-snap-icon',
        compact && 'timeline-compact',
        className
      ),
      ...rest
    }, children)
  }
}

export const TimelineItem = {
  view(vnode) {
    const { className, children, ...rest } = vnode.attrs
    return m('li', { className: cx(className), ...rest }, children)
  }
}

export const TimelineStart = {
  view(vnode) {
    const { className, children, ...rest } = vnode.attrs
    return m('div', { className: cx('timeline-start', className), ...rest }, children)
  }
}

export const TimelineMiddle = {
  view(vnode) {
    const { className, children, ...rest } = vnode.attrs
    return m('div', { className: cx('timeline-middle', className), ...rest }, children)
  }
}

export const TimelineEnd = {
  view(vnode) {
    const { className, children, ...rest } = vnode.attrs
    return m('div', { className: cx('timeline-end', className), ...rest }, children)
  }
}
