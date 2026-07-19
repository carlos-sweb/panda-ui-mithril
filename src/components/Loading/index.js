import m from 'mithril'
import { loadingStyles } from '../../recipes/loading'
import { cx } from '../../utils/cx'


export const Loading = {
  view(vnode) {
    const { variant = 'spinner', size, className, ...rest } = vnode.attrs

    return m('span', {
      className: cx(
        'loading',
        loadingStyles({ variant, size }),
        variant !== 'spinner' && variant !== 'ring' && variant !== 'ball' && variant !== 'infinity' && `loading-${variant}`,
        className
      ),
      ...rest
    })
  }
}
