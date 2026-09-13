import m from 'mithril'
import { timeline } from '../../../styled-system/recipes'
import { cx } from '../../../styled-system/css'

/**
 * Timeline component. Timeline, horizontal or vertical, with
 * `snapIcon` to compact the central marker.
 *
 * @type {import('mithril').Component<import('./index').TimelineAttrs>}
 */
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

/**
 * Cached result of `timeline({})` — the subcomponents pass no variants
 * (only `box` activates the `box` slot class), so their classes are
 * deterministic. Avoids calling the sva on every render.
 * @type {ReturnType<typeof timeline>}
 */
const defaultStyles = timeline({})

/**
 * Timeline element; `hrBefore`/`hrAfter` add connectors.
 *
 * @type {import('mithril').Component<import('./index').TimelineItemAttrs>}
 */
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

/**
 * Initial content of the element; `box` renders it as a bordered callout.
 *
 * @type {import('mithril').Component<import('./index').TimelineStartAttrs>}
 */
export const TimelineStart = {
  view(vnode) {
    const { box, className, ...rest } = vnode.attrs
    return m('div', { className: cx('timeline-start', box && defaultStyles.box, box && 'timeline-box', className), ...rest }, vnode.children)
  }
}

/**
 * Central marker of the timeline.
 *
 * @type {import('mithril').Component<import('./index').TimelineMiddleAttrs>}
 */
export const TimelineMiddle = {
  view(vnode) {
    const { className, ...rest } = vnode.attrs
    return m('div', { className: cx('timeline-middle', className), ...rest }, vnode.children)
  }
}

/**
 * Final content of the element; `box` renders it as a bordered callout.
 *
 * @type {import('mithril').Component<import('./index').TimelineEndAttrs>}
 */
export const TimelineEnd = {
  view(vnode) {
    const { box, className, ...rest } = vnode.attrs
    return m('div', { className: cx('timeline-end', box && defaultStyles.box, box && 'timeline-box', className), ...rest }, vnode.children)
  }
}
