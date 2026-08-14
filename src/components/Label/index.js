import m from 'mithril'
import { labelRecipe } from '../../recipes/label'
import { cx } from '../../utils/cx'

/**
 * Componente Label. Etiqueta para un campo de formulario. Con `floating`
 * renderiza un `<label>` flotante que se superpone al input en lugar de un
 * `<span>` en línea.
 *
 * @type {import('mithril').Component<import('./index').LabelAttrs>}
 */
export const Label = {
  view(vnode) {
    const { floating, className, ...rest } = vnode.attrs

    return m(floating ? 'label' : 'span', {
      className: cx(floating ? 'floating-label' : 'label', labelRecipe({ floating: !!floating }), className),
      ...rest
    }, vnode.children)
  }
}
