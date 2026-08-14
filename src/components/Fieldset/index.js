import m from 'mithril'
import { fieldset, fieldsetLegend } from '../../../styled-system/recipes'
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
      className: cx('fieldset', fieldset(), className),
      ...rest
    }, [
      legend && m('legend', { className: cx('fieldset-legend', fieldsetLegend()) }, legend),
      vnode.children,
    ])
  }
}
