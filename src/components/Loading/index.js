import m from 'mithril'
import { LoaderCircle } from 'lucide-mithril'
import { loadingStyles } from '../../recipes/loading'
import { cx } from '../../utils/cx'


export const Loading = {
  view(vnode) {
    const { variant = 'spinner', size, className, ...rest } = vnode.attrs

    const styles = cx(
      'loading',
      loadingStyles({ variant, size }),
      variant !== 'spinner' && variant !== 'ring' && variant !== 'ball' && variant !== 'infinity' && `loading-${variant}`,
      className
    )

    if (variant === 'spinner') {
      return m(LoaderCircle, { className: styles, ...rest })
    }

    return m('span', { className: styles, ...rest })
  }
}
