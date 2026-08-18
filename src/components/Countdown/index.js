import m from 'mithril'
import { countdown, countdownDigit } from '../../../styled-system/recipes'
import { cx } from '../../../styled-system/css'

/**
 * Componente Countdown. Muestra un número como dígitos individuales con
 * transición flip. `value` es el número a mostrar (0-999) y `digits` fija
 * cuántos dígitos rellenar con ceros a la izquierda.
 *
 * @type {import('mithril').Component<import('./index').CountdownAttrs>}
 */
export const Countdown = {
  view(vnode) {
    const { value, digits, className, ...rest } = vnode.attrs
    const clamped = Math.max(0, Math.min(999, value))
    const numDigits = digits || Math.max(1, String(clamped).length)
    const digitChars = String(clamped).padStart(numDigits, '0').split('')

    return m('span', {
      className: cx('countdown', countdown(), className),
      'aria-live': 'polite',
      'aria-label': String(value),
      ...rest
    }, digitChars.map((d, i) => m('span', {
      key: i,
      className: countdownDigit(),
      style: `--n:${d}`,
    })))
  }
}
