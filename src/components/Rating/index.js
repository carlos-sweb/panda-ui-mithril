import m from 'mithril'
import { ratingStyles } from '../../recipes/rating'
import { maskStyles } from '../../recipes/mask'
import { cx } from '../../utils/cx'

// TODO (reported 2026-08-02, redesign for later): N masked radio inputs per
// star is a direct daisyUI port, but daisyUI has to do it that way — it has
// no JS layer. This library wraps Mithril specifically so components CAN use
// real state/events instead of copying the no-JS constraint by default.
// Proposed replacement:
//   - Two cases: a read-only rating (someone else's score, can't be edited —
//     current `readonly` prop stays as-is for this) vs an editable one.
//   - Editable case: one hidden <input name="evaluation" type="range" min="0"
//     max="5"> holding the real value (so it still participates in native
//     <form> submission), plus N <IconStar> elements (not masked radios)
//     rendered from an `icon` prop, each with its own onclick that updates
//     component state and fires the existing `onchange` callback — no masked
//     radios, no per-instance name-collision handling needed at all.
// Keep the mask-based version working until this is scheduled; don't break
// existing consumers silently.
let ratingInstanceCount = 0

export const Rating = {
  oninit(vnode) {
    ratingInstanceCount += 1
    vnode.state.autoName = `rating-${ratingInstanceCount}`
  },

  view(vnode) {
    const { size, color, value, max = 5, readonly, className, name, onchange, ...rest } = vnode.attrs

    return m('div', {
      className: cx('rating', ratingStyles({ size, color }), className),
      ...rest
    }, Array.from({ length: max }, (_, i) => {
      const starValue = i + 1
      return m('input', {
        type: 'radio',
        name: name || vnode.state.autoName,
        className: cx('mask mask-star-2', maskStyles({ shape: 'star-2' })),
        value: starValue,
        checked: value === starValue,
        disabled: readonly,
        'aria-label': `${starValue} star${starValue > 1 ? 's' : ''}`,
        onchange: () => onchange && onchange(starValue),
      })
    }))
  }
}
