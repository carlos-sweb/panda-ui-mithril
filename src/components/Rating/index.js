import m from 'mithril'
import { Star } from 'lucide-mithril'
import { rating } from '../../recipes/rating'
import { cx } from '../../utils/cx'

const clamp = (v, min, max) => Math.min(max, Math.max(min, v))
// Integer-only scores: 0..max
const toInt = (v, max) => clamp(Math.round(v), 0, max)

export const Rating = {
  oninit(vnode) {
    const { defaultValue = 0, value, onchange, readonly } = vnode.attrs
    if (typeof value === 'number' && !readonly && typeof onchange !== 'function') {
      console.warn(
        '[Rating] `value` without `onchange` makes a controlled rating that never updates. ' +
        'Pass `onchange` to update `value`, use `defaultValue` for internal state, ' +
        'or `readonly` for a static display.'
      )
    }
    // Controlled (value provided) keeps the source of truth in the consumer;
    // otherwise the component owns its state, initialized from defaultValue.
    vnode.state.rating = typeof value === 'number' ? value : defaultValue
  },

  view(vnode) {
    const {
      value, defaultValue = 0, max = 5, readonly = false,
      color, size, className, onchange, ...rest
    } = vnode.attrs

    const controlled = typeof value === 'number'
    const current = toInt(controlled ? value : vnode.state.rating, max)
    const display = toInt(vnode.state.preview ?? current, max)

    const setValue = (next) => {
      const final = toInt(next, max)
      if (!controlled) vnode.state.rating = final
      vnode.state.preview = null
      if (onchange) onchange(final)
    }

    const rootClass = rating({ size, color, readonly }).root

    const stars = Array.from({ length: max }, (_, i) => {
      const star = i + 1
      const state = star <= display ? 'full' : 'empty'
      const attrs = {
        className: cx('rating-star', rating({ size, color, readonly, state }).star),
      }
      if (readonly) {
        attrs['aria-hidden'] = 'true'
      } else {
        attrs.type = 'button'
        attrs.role = 'radio'
        attrs['aria-checked'] = state === 'full' ? 'true' : 'false'
        attrs['aria-label'] = `${star} star${star > 1 ? 's' : ''}`
        attrs.key = star
        attrs.onclick = () => {
          // Re-selecting the current value clears the rating (0)
          setValue(star === current ? 0 : star)
        }
        attrs.onmouseenter = () => { vnode.state.preview = star }
        attrs.onmouseleave = () => { vnode.state.preview = null }
      }
      return m(readonly ? 'span' : 'button', attrs, starIcon(state))
    })

    return m('div', {
      className: cx('rating', rootClass, className),
      role: readonly ? 'img' : 'radiogroup',
      'aria-label': readonly ? `${display} of ${max} stars` : 'Rating',
      onkeydown: readonly ? undefined : (e) => {
        const dir =
          (e.key === 'ArrowRight' || e.key === 'ArrowUp') ? 1 :
          (e.key === 'ArrowLeft' || e.key === 'ArrowDown') ? -1 : 0
        if (!dir) return
        e.preventDefault()
        setValue(clamp(current + dir, 0, max))
      },
      ...rest,
    }, stars)
  }
}

function starIcon(state) {
  const filled = state === 'full'
  const props = { size: 'var(--rating-size)', 'aria-hidden': 'true', fill: filled ? 'currentColor' : 'none' }
  if (filled) props['stroke-width'] = 0
  return m(Star, props)
}
