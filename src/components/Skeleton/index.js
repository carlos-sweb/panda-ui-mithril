import m from 'mithril'
import { skeletonStyles } from '../../recipes/skeleton'
import { cx } from '../../utils/cx'

/**
 * Componente Skeleton. Placeholder animado que indica contenido en carga.
 * Con `text` ajusta el tamaño para parecer una línea de texto en vez de un bloque.
 *
 * @type {import('mithril').Component<import('./index').SkeletonAttrs>}
 */
export const Skeleton = {
  view(vnode) {
    const { text, className, ...rest } = vnode.attrs

    return m('div', {
      className: cx('skeleton', text && 'skeleton-text', skeletonStyles({ text: !!text }), className),
      ...rest
    })
  }
}
