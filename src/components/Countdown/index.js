import m from 'mithril'
import { countdownStyles, countdownDigitStyles } from '../../recipes/countdown'
import { cx } from '../../utils/cx'

export const Countdown = {
  view(vnode) {
    const { value, digits, className, ...rest } = vnode.attrs
    const clamped = Math.max(0, Math.min(999, value))
    const numDigits = digits || Math.max(1, String(clamped).length)
    const digitChars = String(clamped).padStart(numDigits, '0').split('')

    return m('span', {
      className: cx('countdown', countdownStyles(), className),
      'aria-live': 'polite',
      'aria-label': String(value),
      ...rest
    }, digitChars.map((d, i) => m('span', {
      key: i,
      className: countdownDigitStyles(),
      style: `--n:${d}`,
    })))
  }
}
