import m from 'mithril'
import { cva } from '../../../styled-system/css'
import { cx } from '../../utils/cx'

const ratingStyles = cva({
  base: {
    display: 'inline-flex',
    gap: '0.25',
    position: 'relative',
  },
})

export const Rating = {
  view(vnode) {
    const { size, value, max = 5, readonly, className, onchange, ...rest } = vnode.attrs

    return m('div', {
      className: cx('rating', ratingStyles(), className),
      ...rest
    }, Array.from({ length: max }, (_, i) => {
      const starValue = i + 1
      return m('input', {
        type: 'radio',
        name: vnode.attrs.name || 'rating',
        className: 'mask mask-star-2',
        value: starValue,
        checked: value === starValue,
        disabled: readonly,
        'aria-label': `${starValue} star${starValue > 1 ? 's' : ''}`,
        onchange: () => onchange && onchange(starValue),
      })
    }))
  }
}
