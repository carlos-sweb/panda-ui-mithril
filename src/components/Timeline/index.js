import m from 'mithril'
import { timeline } from '../../recipes/timeline'
import { cx } from '../../utils/cx'

export const Timeline = {
  view(vnode) {
    const { horizontal, vertical, snapIcon, className, ...rest } = vnode.attrs
    const direction = vertical && !horizontal ? 'vertical' : 'horizontal'

    return m('ul', {
      className: cx('timeline', timeline({ direction, snapIcon }).timeline, className),
      ...rest
    }, vnode.children)
  }
}

export const TimelineItem = {
  view(vnode) {
    const { hrBefore, hrAfter, className, ...rest } = vnode.attrs
    return m('li', { className, ...rest }, [
      hrBefore && m('hr'),
      vnode.children,
      hrAfter && m('hr'),
    ])
  }
}

export const TimelineStart = {
  view(vnode) {
    const { box, className, ...rest } = vnode.attrs
    return m('div', { className: cx('timeline-start', box && timeline({}).box, box && 'timeline-box', className), ...rest }, vnode.children)
  }
}

export const TimelineMiddle = {
  view(vnode) {
    const { className, ...rest } = vnode.attrs
    return m('div', { className: cx('timeline-middle', className), ...rest }, vnode.children)
  }
}

export const TimelineEnd = {
  view(vnode) {
    const { box, className, ...rest } = vnode.attrs
    return m('div', { className: cx('timeline-end', box && timeline({}).box, box && 'timeline-box', className), ...rest }, vnode.children)
  }
}
