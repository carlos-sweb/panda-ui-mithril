import m from 'mithril'
import { Rating } from '../Rating/index.js'
import { cx } from '../../../styled-system/css'
import { ratingGroup, ratingGroupLabel } from '../../../styled-system/recipes'

/**
 * RatingGroup — wraps a Rating with a label and a value display.
 * Delegates all Rating props internally.
 *
 * @type {import('mithril').Component<import('./index').RatingGroupAttrs>}
 */
export const RatingGroup = {
  view(vnode) {
    const {
      label,
      value,
      defaultValue,
      max,
      color,
      size,
      readonly,
      onchange,
      className,
      showValue = true,
      ...rest
    } = vnode.attrs

    const current = typeof value === 'number' ? value : defaultValue

    return m('div', {
      className: cx('rating-group', ratingGroup(), className),
      ...rest,
    }, [
      label != null && m('span', { className: cx('rating-group-label', ratingGroupLabel()) }, [
        label,
        showValue && typeof current === 'number' ? `: ${current}` : ''
      ]),
      m(Rating, { value, defaultValue, max, color, size, readonly, onchange }),
    ])
  }
}
