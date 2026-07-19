import m from 'mithril'
import { otpStyles } from '../../recipes/otp'
import { cx } from '../../utils/cx'


export const OTP = {
  view(vnode) {
    const { size, color, joined, className, value, length = 4, oninput, ...rest } = vnode.attrs

    return m('label', {
      className: cx('otp', otpStyles({ size, color, joined }), className),
      ...rest
    }, [
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
