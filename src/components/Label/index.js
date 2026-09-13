import m from 'mithril'
import { label } from '../../../styled-system/recipes'
import { cx } from '../../../styled-system/css'

/**
 * Label component. Label for a form field. With `floating`
 * it renders a floating `<label>` that overlaps the input instead of an
 * inline `<span>`.
 *
 * @type {import('mithril').Component<import('./index').LabelAttrs>}
 */
export const Label = {
  view(vnode) {
    const { floating, className, ...rest } = vnode.attrs

    return m(floating ? 'label' : 'span', {
      className: cx(floating && 'floating-label', label({ floating: !!floating }), className),
      ...rest
    }, vnode.children)
  }
}
