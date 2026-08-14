import m from 'mithril'
import { button } from '../../../styled-system/recipes'
import { cx } from '../../utils/cx'

/**
 * Componente Button. Botón con variantes de color, estilo y tamaño.
 * Si recibe `href` renderiza un `<a>`, en caso contrario un `<button>`;
 * `block`/`wide` controlan el ancho y `square`/`circle` la forma.
 *
 * @type {import('mithril').Component<import('./index').ButtonAttrs>}
 */
export const Button = {
  view(vnode) {
    const { color, variant, size, active, disabled, block, wide, square, circle, borderWidth, className, ...rest } = vnode.attrs
    const isLink = !!vnode.attrs.href

    const styles = cx(
      'btn',
      button({
        color,
        variant,
        size,
        active,
        shape: circle ? 'circle' : square ? 'square' : undefined,
        fluid: wide ? 'wide' : block ? 'block' : undefined,
        borderWidth,
      }),
      className
    )

    if (isLink) {
      return (
        <a className={styles} data-active={active || undefined} {...rest}>
          {vnode.children}
        </a>
      )
    }

    return (
      <button className={styles} disabled={disabled} data-active={active || undefined} {...rest}>
        {vnode.children}
      </button>
    )
  }
}
