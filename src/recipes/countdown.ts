import { cva } from '../../styled-system/css'

// NOTE: real daisyUI implements this with a single combined-value CSS trick
// (mod()/round() math + a 00-99 content strip clipped via text-align:end +
// direction:rtl). Ported it byte-for-byte first, but it rendered digits
// transposed in testing (23 -> "32") — the RTL clip-to-1ch behavior didn't
// resolve the way the source assumes in this browser. Per the
// js-over-daisyui-purity memory: this library has real JS via Mithril, so
// instead of chasing the exact bidi/clip behavior, digit decomposition
// happens in JS (see Countdown component) and each digit gets its own
// single-column 0-9 strip — same visual roll effect, no ambiguity about
// which character is showing.
const digitStrip = Array.from({ length: 10 }, (_, i) => String(i)).join('\\A ')

export const countdownStyles = cva({
  base: {
    display: 'inline-flex',
    lineHeight: '1em',
  },
})

export const countdownDigitStyles = cva({
  base: {
    position: 'relative',
    display: 'inline-block',
    overflow: 'hidden',
    width: '1ch',
    height: '1em',
    verticalAlign: 'top',

    '&:after': {
      content: `"${digitStrip}"`,
      position: 'absolute',
      insetInlineStart: '0',
      top: 'calc(var(--n) * -1em)',
      whiteSpace: 'pre',
      fontVariantNumeric: 'tabular-nums',
      transitionProperty: 'top',
      transitionDuration: '0.5s',
      transitionTimingFunction: 'cubic-bezier(1, 0, 0, 1)',
    },
  },
})
