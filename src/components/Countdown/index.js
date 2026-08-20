import m from 'mithril'
import { countdown, countdownDigit } from '../../../styled-system/recipes'
import { cx } from '../../../styled-system/css'

/**
 * Componente Countdown. Modo presentacional: muestra un número con `value`.
 * Modo timer: cuenta regresiva con `duration`, autostart y callbacks.
 *
 * @type {import('mithril').Component<import('./index').CountdownAttrs>}
 */
export const Countdown = {
  oninit(vnode) {
    const { duration, autostart } = vnode.attrs
    if (duration != null) {
      vnode.state.remaining = duration
      vnode.state._interval = null
      if (autostart) this._startTimer(vnode)
    }
  },

  onremove(vnode) {
    this._stopTimer(vnode)
  },

  _startTimer(vnode) {
    if (vnode.state._interval) return
    const { onstart } = vnode.attrs
    if (onstart) onstart()
    vnode.state._interval = setInterval(() => {
      vnode.state.remaining--
      m.redraw()
      if (vnode.state.remaining <= 0) {
        this._stopTimer(vnode)
        const { oncomplete } = vnode.attrs
        if (oncomplete) oncomplete(0)
      }
    }, 1000)
  },

  _stopTimer(vnode) {
    if (vnode.state._interval) {
      clearInterval(vnode.state._interval)
      vnode.state._interval = null
      const { onstop } = vnode.attrs
      if (onstop) onstop(vnode.state.remaining)
    }
  },

  view(vnode) {
    const { value, digits, duration, autostart, oncomplete, onstart, onstop, className, ...rest } = vnode.attrs
    const isTimer = duration != null
    const display = isTimer ? vnode.state.remaining : value
    const clamped = Math.max(0, Math.min(999, display))
    const numDigits = digits || Math.max(1, String(clamped).length)
    const digitChars = String(clamped).padStart(numDigits, '0').split('')

    return m('span', {
      className: cx('countdown', countdown(), className),
      'aria-live': 'polite',
      'aria-label': String(display),
      ...rest
    }, digitChars.map((d, i) => m('span', {
      key: i,
      className: countdownDigit(),
      style: `--n:${d}`,
    })))
  }
}
