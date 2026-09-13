import m from 'mithril'
import { skeleton } from '../../../styled-system/recipes'
import { cx } from '../../../styled-system/css'

/**
 * Skeleton component. Animated placeholder that indicates loading content.
 * With `text` it adjusts the size to look like a line of text instead of a block.
 *
 * @type {import('mithril').Component<import('./index').SkeletonAttrs>}
 */
export const Skeleton = {
  view(vnode) {
    const { text, className, ...rest } = vnode.attrs

    return m('div', {
      className: cx(text && 'skeleton-text', skeleton({ text: !!text }), className),
      ...rest
    })
  }
}
