import m from 'mithril'
import { cx } from '../../styled-system/css'

export const Countdown = {
  view(vnode) {
    const { value, className, ...rest } = vnode.attrs

    return m('span', {
      className: cx('countdown', className),
      style: `--value:${value}`,
      ...rest
    }, m('span', { 'aria-live': 'polite', 'aria-label': value }))
  }
}
