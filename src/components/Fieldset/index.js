import m from 'mithril'
import { cx } from '../../styled-system/css'

export const Fieldset = {
  view(vnode) {
    const { legend, className, children, ...rest } = vnode.attrs

    return m('fieldset', {
      className: cx('fieldset', className),
      ...rest
    }, [
      legend && m('legend', { className: 'fieldset-legend' }, legend),
      children,
    ])
  }
}
