import m from 'mithril'
import { toastStyles } from '../../recipes/toast'
import { cx } from '../../utils/cx'

const VERTICALS = ['top', 'middle', 'bottom']
const HORIZONTALS = ['start', 'center', 'end']

export const Toast = {
  view(vnode) {
    const { position, className, ...rest } = vnode.attrs
    const tokens = (position || '').split(/\s+/)
    const vertical = tokens.find((t) => VERTICALS.includes(t)) || 'bottom'
    const horizontal = tokens.find((t) => HORIZONTALS.includes(t)) || 'end'

    return m('div', {
      className: cx('toast', toastStyles({ vertical, horizontal }), className),
      ...rest
    }, vnode.children)
  }
}
