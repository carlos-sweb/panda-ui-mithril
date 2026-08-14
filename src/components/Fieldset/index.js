import m from 'mithril'
import { fieldsetRecipe, fieldsetLegendRecipe } from '../../recipes/fieldset'
import { cx } from '../../utils/cx'

/**
 * Componente Fieldset. Agrupa campos de formulario relacionados dentro de un
 * `<fieldset>` con una `<legend>` opcional (`legend`).
 *
 * @type {import('mithril').Component<import('./index').FieldsetAttrs>}
 */
export const Fieldset = {
  view(vnode) {
    const { legend, className, ...rest } = vnode.attrs

    return m('fieldset', {
      className: cx('fieldset', fieldsetRecipe(), className),
      ...rest
    }, [
      legend && m('legend', { className: cx('fieldset-legend', fieldsetLegendRecipe()) }, legend),
      vnode.children,
    ])
  }
}
