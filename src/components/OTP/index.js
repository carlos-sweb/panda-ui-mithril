import m from 'mithril'
import { otp } from '../../../styled-system/recipes'
import { cx } from '../../../styled-system/css'

const NUMERIC_RE = /^\d$/
const ALPHANUMERIC_RE = /^[a-zA-Z0-9]$/
const MASK_DEFAULT = '•'

/**
 * Componente OTP. Código de un solo uso con un input real por celda (patrón
 * Mantine/Ant/PrimeReact): caret y focus nativos, avance de focus al teclear,
 * Backspace/flechas para navegar, paste de código completo, mask opcional,
 * estados disabled/readonly/error y eventos `onchange` (cada cambio) y
 * `oncomplete` (código completo).
 *
 * Controlado: `value` + `onchange`. No controlado: `defaultValue`.
 *
 * @type {import('mithril').Component<import('./index').OTPAttrs>}
 */
export const OTP = {
  /** @param {Object} vnode */
  oninit(vnode) {
    const { value, defaultValue = '', readonly } = vnode.attrs
    if (typeof value === 'string' && !readonly && typeof vnode.attrs.onchange !== 'function') {
      console.warn(
        '[OTP] `value` without `onchange` makes a controlled OTP that never updates. ' +
        'Pass `onchange` to update `value`, or use `defaultValue` for internal state.'
      )
    }
    vnode.state.value = typeof value === 'string' ? value : defaultValue
  },

  /** @param {Object} vnode */
  oncreate(vnode) {
    if (vnode.attrs.autoFocus) {
      const first = vnode.dom.querySelector('input:not([type="hidden"]):not(:disabled)')
      if (first) first.focus()
    }
  },

  /**
   * @param {Object} vnode
   * @returns {import('mithril').Vnode[]} */
  view(vnode) {
    const {
      value, defaultValue = '', length = 4, type = 'numeric', pattern,
      mask, placeholder, disabled, readonly, error, autoFocus, oneTimeCode,
      name, separator, size, color, joined, className, onchange, oncomplete,
      ...rest
    } = vnode.attrs

    const controlled = typeof value === 'string'
    const current = (controlled ? value : vnode.state.value) || ''
    const maskChar = mask === true ? MASK_DEFAULT : (typeof mask === 'string' ? mask : null)
    const re = pattern || (type === 'alphanumeric' ? ALPHANUMERIC_RE : NUMERIC_RE)

    const setValue = (next) => {
      const clamped = next.slice(0, length)
      if (!controlled) vnode.state.value = clamped
      if (onchange) onchange(clamped)
      if (clamped.length === length && oncomplete) oncomplete(clamped)
    }

    const styles = otp({ size, color, joined, error })

    /** @param {number} index */
    const focusCell = (index) => {
      const inputs = vnode.dom.querySelectorAll('input:not([type="hidden"])')
      const target = inputs[index]
      if (target) target.focus()
    }

    const cells = []
    for (let i = 0; i < length; i++) {
      const char = current[i] || ''
      const display = char ? (maskChar ? maskChar : char) : ''
      cells.push(m('input', {
        key: `cell-${i}`,
        className: cx('otp-input', styles.input),
        type: 'text',
        maxlength: 1,
        inputmode: type === 'numeric' ? 'numeric' : 'text',
        autocomplete: i === 0 && oneTimeCode ? 'one-time-code' : 'off',
        value: display,
        placeholder: !char && placeholder !== undefined ? placeholder : undefined,
        disabled,
        readonly: readonly || undefined,
        'aria-invalid': error || undefined,
        'aria-label': `Digit ${i + 1} of ${length}`,
        onfocus: (e) => e.target.select(),
        oninput: (e) => {
          if (disabled || readonly) return
          const raw = e.target.value
          const ch = raw.slice(-1)
          if (ch && !re.test(ch)) {
            // Carácter inválido: restaurar el valor anterior de la celda.
            e.target.value = display
            return
          }
          const nextChars = current.split('')
          nextChars[i] = ch
          setValue(nextChars.join(''))
          if (ch) {
            // Avanzar el focus a la siguiente celda vacía.
            const nextEmpty = nextChars.findIndex((c, idx) => !c && idx > i)
            focusCell(nextEmpty === -1 ? i + 1 : nextEmpty)
          }
        },
        onkeydown: (e) => {
          if (e.key === 'Backspace') {
            e.preventDefault()
            const nextChars = current.split('')
            nextChars[i] = ''
            setValue(nextChars.join(''))
            if (i > 0) focusCell(i - 1)
          } else if (e.key === 'Delete') {
            e.preventDefault()
            const nextChars = current.split('')
            nextChars[i] = ''
            setValue(nextChars.join(''))
          } else if (e.key === 'ArrowLeft' && i > 0) {
            e.preventDefault()
            focusCell(i - 1)
          } else if (e.key === 'ArrowRight' && i < length - 1) {
            e.preventDefault()
            focusCell(i + 1)
          } else if (e.key === 'Home') {
            e.preventDefault()
            focusCell(0)
          } else if (e.key === 'End') {
            e.preventDefault()
            focusCell(length - 1)
          }
        },
        onpaste: (e) => {
          if (disabled || readonly) return
          e.preventDefault()
          const text = (e.clipboardData || window.clipboardData).getData('text') || ''
          const chars = text.split('').filter((c) => re.test(c))
          if (!chars.length) return
          const nextChars = current.split('')
          for (let j = 0; j < chars.length && i + j < length; j++) {
            nextChars[i + j] = chars[j]
          }
          setValue(nextChars.join(''))
          focusCell(Math.min(i + chars.length - 1, length - 1))
        },
      }))
      // Separador visual entre grupos de 3 celdas (p. ej. "123-456").
      if (separator && (i + 1) % 3 === 0 && i < length - 1) {
        cells.push(m('span', { key: `sep-${i}`, className: cx('otp-separator', styles.separator) }, separator))
      }
    }

    const group = m('div', {
      className: cx('otp', styles.root, className),
      role: 'group',
      ...rest,
    }, cells)

    // Hidden input para formularios: si se pasa `name`, el valor real del código
    // viaja en FormData al submit (patrón Mantine). Sin holes en el fragment
    // (null rompe la regla de keys de Mithril) — solo se añade si existe.
    const children = [group]
    if (name) children.push(m('input', { key: '__hidden__', type: 'hidden', name, value: current }))

    return children
  }
}
