import m from 'mithril'
import { skeletonStyles } from '../../recipes/skeleton'
import { cx } from '../../utils/cx'

export const Skeleton = {
  view(vnode) {
    const { text, className, ...rest } = vnode.attrs

    return m('div', {
      className: cx('skeleton', text && 'skeleton-text', skeletonStyles({ text: !!text }), className),
      ...rest
    })
  }
}
