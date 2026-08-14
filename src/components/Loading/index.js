import m from 'mithril'
import { LoaderCircle } from 'lucide-mithril'
import { loadingRecipe } from '../../recipes/loading'
import { cx } from '../../utils/cx'


/**
 * Indicador de carga. Animaciones `infinite` (spin/pulse) que no son migrables
 * a CSS moderno (@starting-style / transition-behavior), por eso se mantienen
 * como keyframes clásicos en el recipe `loading` (cva, single-slot).
 *
 * - `variant="spinner"` (default) renderiza el icono LoaderCircle con animación de giro.
 * - Las demás variantes (`dots`, `ring`, `ball`, `bars`, `infinity`) renderizan un `<span>`
 *   con la clase `loading-{variant}` definida en el recipe.
 *
 * @type {import('mithril').Component<import('./index').LoadingAttrs>}
 */
export const Loading = {
  /** @param {Object} vnode @returns {import('mithril').Vnode} */
  view(vnode) {
    const { variant = 'spinner', size, className, ...rest } = vnode.attrs

    const styles = cx(
      'loading',
      loadingRecipe({ variant, size }),
      variant !== 'spinner' && variant !== 'ring' && variant !== 'ball' && variant !== 'infinity' && `loading-${variant}`,
      className
    )

    if (variant === 'spinner') {
      return m(LoaderCircle, { className: styles, ...rest })
    }

    return m('span', { className: styles, ...rest })
  }
}
