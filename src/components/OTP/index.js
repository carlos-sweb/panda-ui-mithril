import m from 'mithril'
import { cva } from '../../../styled-system/css'
import { cx } from '../../utils/cx'

const otpStyles = cva({
  base: {
    display: 'inline-flex',
    gap: '0.25',
    position: 'relative',
  },
  variants: {
    size: {
      xs: { h: '8', text: 'xs' },
      sm: { h: '10', text: 'sm' },
      md: { h: '12', text: 'md' },
      lg: { h: '14', text: 'lg' },
      xl: { h: '16', text: 'xl' },
    },
    color: {
      primary: {},
      secondary: {},
      accent: {},
      info: {},
      success: {},
      warning: {},
      error: {},
    },
    joined: {
      true: { gap: '0' },
    },
  },
})

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
