import m from 'mithril'
import { Rating } from '../Rating/index.js'
import { cx } from '../../utils/cx'
import { ratingGroupRecipe, ratingGroupLabelRecipe } from '../../recipes/ratingGroup'

/**
 * RatingGroup — envuelve un Rating con label y display de valor.
 * Delega todas las props de Rating internamente.
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
      className: cx('rating-group', ratingGroupRecipe(), className),
      ...rest,
    }, [
      label != null && m('span', { className: cx('rating-group-label', ratingGroupLabelRecipe()) }, [
        label,
        showValue && typeof current === 'number' ? `: ${current}` : ''
      ]),
      m(Rating, { value, defaultValue, max, color, size, readonly, onchange }),
    ])
  }
}
