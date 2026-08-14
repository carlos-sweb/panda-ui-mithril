import m from 'mithril'
import { otpRecipe } from '../../recipes/otp'
import { cx } from '../../utils/cx'

/**
 * Componente OTP. Entrada de código de un solo uso (one-time password) con
 * celdas visuales para cada dígito. `length` controla el número de dígitos
 * (por defecto 4), `joined` une las celdas y `oninput` recibe el valor
 * completo al escribir.
 *
 * @type {import('mithril').Component<import('./index').OTPAttrs>}
 */
export const OTP = {
  view(vnode) {
    const { size, color, joined, className, value, length = 4, oninput, ...rest } = vnode.attrs

    return m('label', {
      className: cx('otp', otpRecipe({ size, color, joined }), className),
      ...rest
    }, [
      ...Array.from({ length }, () => m('span')),
      m('input', {
        type: 'text',
        autocomplete: 'one-time-code',
        inputmode: 'numeric',
        maxlength: length,
        pattern: `[0-9]{${length}}`,
        required: true,
        value,
        oninput: (e) => oninput && oninput(e.target.value),
      }),
    ])
  }
}
