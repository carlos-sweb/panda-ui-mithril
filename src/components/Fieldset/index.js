import m from 'mithril'
import { fieldsetStyles, fieldsetLegendStyles } from '../../recipes/fieldset'
import { cx } from '../../utils/cx'

export const Fieldset = {
  view(vnode) {
    const { legend, className, ...rest } = vnode.attrs

    return m('fieldset', {
      className: cx('fieldset', fieldsetStyles(), className),
      ...rest
    }, [
      legend && m('legend', { className: cx('fieldset-legend', fieldsetLegendStyles()) }, legend),
      vnode.children,
    ])
  }
}
