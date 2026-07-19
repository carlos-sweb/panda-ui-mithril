import m from 'mithril'
import { cx } from '../../../styled-system/css'

export const Indicator = {
  view(vnode) {
    const { position, className, item, children, ...rest } = vnode.attrs

    return m('div', {
      className: cx(
        'indicator',
        position && `indicator-${position}`,
        className
      ),
      ...rest
    }, [
      item && m('span', { className: cx('indicator-item', item.className) }, item),
      children,
    ])
  }
}
