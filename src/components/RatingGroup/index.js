import m from 'mithril'
import { Rating } from '../Rating/index.js'
import { cx } from '../../utils/cx'
import { css } from '../../../styled-system/css'

const groupClass = css({
  display: 'inline-flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: 'token(spacing.1)',
})

const labelClass = css({
  fontSize: 'token(fontSizes.sm)',
  fontWeight: '500',
  color: 'token(colors.base-content)',
  opacity: 0.7,
})

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
      className: cx('rating-group', groupClass, className),
      ...rest,
    }, [
      label != null && m('span', { className: cx('rating-group-label', labelClass) }, [
        label,
        showValue && typeof current === 'number' ? `: ${current}` : ''
      ]),
      m(Rating, { value, defaultValue, max, color, size, readonly, onchange }),
    ])
  }
}
