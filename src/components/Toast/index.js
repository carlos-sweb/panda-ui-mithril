import m from 'mithril'
import { toast } from '../../../styled-system/recipes'
import { cx } from '../../../styled-system/css'

const VERTICALS = ['top', 'middle', 'bottom']
const HORIZONTALS = ['start', 'center', 'end']

/**
 * Toast component. `position: fixed` container for notifications; the
 * position is defined with space-separated tokens ("top end", "bottom start",
 * default "bottom end"). The children enter with the `toast` animation
 * (theme keyframes, see `keyframes.toast` in panda.config.ts).
 *
 * @type {import('mithril').Component<import('./index').ToastAttrs>}
 */
export const Toast = {
  view(vnode) {
    const { position, className, ...rest } = vnode.attrs
    const tokens = (position || '').split(/\s+/)
    const vertical = tokens.find((t) => VERTICALS.includes(t)) || 'bottom'
    const horizontal = tokens.find((t) => HORIZONTALS.includes(t)) || 'end'

    return m('div', {
      className: cx('toast', toast({ vertical, horizontal }), className),
      ...rest
    }, vnode.children)
  }
}
