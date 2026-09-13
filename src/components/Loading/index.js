import m from 'mithril'
import { LoaderCircle } from 'lucide-mithril'
import { loading } from '../../../styled-system/recipes'
import { cx } from '../../../styled-system/css'


/**
 * Loading indicator. `infinite` animations (spin/pulse) that are not migratable
 * to modern CSS (@starting-style / transition-behavior), so they are kept
 * as classic keyframes in the `loading` recipe (cva, single-slot).
 *
 * - `variant="spinner"` (default) renders the LoaderCircle icon with a spinning animation.
 * - The other variants (`dots`, `ring`, `ball`, `bars`, `infinity`) render a `<span>`
 *   with the `loading-{variant}` class defined in the recipe.
 *
 * @type {import('mithril').Component<import('./index').LoadingAttrs>}
 */
export const Loading = {
  /** @param {Object} vnode @returns {import('mithril').Vnode} */
  view(vnode) {
    const { variant = 'spinner', size, className, ...rest } = vnode.attrs

    const styles = cx(
      'loading',
      loading({ variant, size }),
      variant !== 'spinner' && variant !== 'ring' && variant !== 'ball' && variant !== 'infinity' && `loading-${variant}`,
      className
    )

    if (variant === 'spinner') {
      return m(LoaderCircle, { className: styles, ...rest })
    }

    return m('span', { className: styles, ...rest })
  }
}
