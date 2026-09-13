import m from 'mithril'
import { fieldset, fieldsetLegend } from '../../../styled-system/recipes'
import { cx } from '../../../styled-system/css'

/**
 * Fieldset component. Groups related form fields inside a `<fieldset>` with an
 * optional `<legend>` (`legend`).
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
