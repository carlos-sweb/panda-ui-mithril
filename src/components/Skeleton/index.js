import m from 'mithril'
import { skeleton } from '../../../styled-system/recipes'
import { cx } from '../../../styled-system/css'

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
      className: cx('skeleton', text && 'skeleton-text', skeleton({ text: !!text }), className),
      ...rest
    })
  }
}
