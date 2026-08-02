import m from 'mithril'
import { labelStyles } from '../../recipes/label'
import { cx } from '../../utils/cx'

export const Label = {
  view(vnode) {
    const { floating, className, ...rest } = vnode.attrs

    return m(floating ? 'label' : 'span', {
      className: cx(floating ? 'floating-label' : 'label', labelStyles({ floating: !!floating }), className),
      ...rest
    }, vnode.children)
  }
}
