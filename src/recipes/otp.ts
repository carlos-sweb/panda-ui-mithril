import { cva } from '../../styled-system/css'

export const otpStyles = cva({
  base: {
    position: 'relative',
    display: 'inline-flex',
    fontFamily: 'monospace',
    direction: 'ltr',
    clipPath: 'inset(-3.5px 3.5px -3.5px -3.5px)',
    borderRadius: 'var(--radius-field)',
    fontSize: 'token(fontSizes.5xl)',
    '--input-color': 'color-mix(in oklab, token(colors.base-content) 20%, transparent)',
    '--otp-ch': '1ch',
    // Safari computes `ch` for monospace fonts differently than Chromium/Firefox,
    // which throws off every stride/margin calc below — same patch the original implementation ships.
    '@supports (font: -apple-system-body)': {
      '--otp-ch': '0.618164em',
    },
    '--otp-gap': 'calc(var(--otp-ch) * 0.5)',
    '--otp-w': 'calc(var(--otp-ch) * 2)',
    '--otp-size': 'token(spacing.10)',
    '--stride': 'calc(var(--otp-w) + var(--otp-gap))',
    gap: 'var(--otp-gap)',

    '& > input': {
      pointerEvents: 'none',
      position: 'relative',
      insetInlineStart: '0',
      zIndex: '1',
      margin: '0',
      appearance: 'none',
      border: 'none',
      backgroundColor: 'transparent',
      padding: '0',
      paddingInlineStart: 'calc(var(--otp-ch) * 0.5 + var(--border, 1px))',
      outline: 'none',
      lineHeight: 'token(lineHeights.none)',
      letterSpacing: 'calc(var(--stride) - var(--otp-ch))',
      fontVariantNumeric: 'tabular-nums',
      // keeps the (invisible) input's own box the width of its typed text,
      // instead of the browser's default ~20ch — without this the text
      // starts from the input's native width and reads as shifted off the boxes
      fieldSizing: 'content',
    },

    '& > span': {
      position: 'absolute',
      display: 'flex',
      transition: 'border-color 0.2s',
      inlineSize: 'var(--otp-w)',
      blockSize: 'var(--otp-size)',
      backgroundColor: 'token(colors.base-100)',
      border: 'var(--border, 1px) solid var(--input-color)',
      borderRadius: 'inherit',
      outline: '2px solid transparent',
      outlineOffset: '1px',
      boxShadow: '0 1px color-mix(in oklab, var(--input-color) 10%, transparent) inset, 0 -1px oklch(100% 0 0 / 0.1) inset',
      '&:nth-child(1)': { left: '1px' },
      '&:nth-child(2)': { left: 'calc(var(--stride) * 1)', transitionDelay: '0.02s' },
      '&:nth-child(3)': { left: 'calc(var(--stride) * 2)', transitionDelay: '0.04s' },
      '&:nth-child(4)': { left: 'calc(var(--stride) * 3)', transitionDelay: '0.06s' },
      '&:nth-child(5)': { left: 'calc(var(--stride) * 4)', transitionDelay: '0.08s' },
      '&:nth-child(6)': { left: 'calc(var(--stride) * 5)', transitionDelay: '0.1s' },
      '&:nth-child(7)': { left: 'calc(var(--stride) * 6)', transitionDelay: '0.12s' },
      '&:nth-child(8)': { left: 'calc(var(--stride) * 7)', transitionDelay: '0.14s' },
    },

    // KNOWN ISSUE (2026-08-01): user reports this focus ring reading as
    // shifted slightly left of its target box, with extra gap on the left
    // side specifically. Verified pixel-perfect (::after left edge == target
    // span's left edge, computed from live getBoundingClientRect) across
    // multiple cursor positions in Chromium — could not reproduce here.
    // Added the the original implementation Safari `ch`-unit patch on --otp-ch as the likely
    // cause (WebKit computes `ch` differently for monospace fonts, which
    // this whole ring/stride math is built on) but unconfirmed — revisit if
    // it recurs. Low priority: OTP is a minor component vs. Button etc.
    '&:after': {
      content: '""',
      flexShrink: '0',
      width: 'var(--otp-w)',
      height: 'var(--otp-size)',
      borderRadius: 'var(--radius-field)',
      outline: '2px solid transparent',
      outlineOffset: '1px',
      zIndex: '10',
      marginInlineStart: 'calc(-1 * (var(--otp-gap) + var(--otp-ch) * 0.5 + var(--border, 1px)))',
    },

    '&:focus-within': {
      isolation: 'isolate',
      '--input-color': 'token(colors.base-content)',
      '& > span': { boxShadow: '0 1px color-mix(in oklab, var(--input-color) 10%, transparent)' },
      '&:after': { outlineColor: 'var(--input-color)' },
    },

    '&:has(> span:nth-child(1))': { width: 'calc(var(--stride) * 1)' },
    '&:has(> span:nth-child(2))': { width: 'calc(var(--stride) * 2)' },
    '&:has(> span:nth-child(3))': { width: 'calc(var(--stride) * 3)' },
    '&:has(> span:nth-child(4))': { width: 'calc(var(--stride) * 4)' },
    '&:has(> span:nth-child(5))': { width: 'calc(var(--stride) * 5)' },
    '&:has(> span:nth-child(6))': { width: 'calc(var(--stride) * 6)' },
    '&:has(> span:nth-child(7))': { width: 'calc(var(--stride) * 7)' },
    '&:has(> span:nth-child(8))': { width: 'calc(var(--stride) * 8)' },
  },
  variants: {
    // Re-asserted under &:focus-within so a chosen color survives typing —
    // otherwise the base ":focus-within" rule (higher specificity, always
    // forces --input-color to base-content) wins and the color flips to a
    // generic dark ring while the field has focus.
    color: {
      neutral: { '--input-color': 'token(colors.neutral)', '&:focus-within': { '--input-color': 'token(colors.neutral)' } },
      primary: { '--input-color': 'token(colors.primary)', '&:focus-within': { '--input-color': 'token(colors.primary)' } },
      secondary: { '--input-color': 'token(colors.secondary)', '&:focus-within': { '--input-color': 'token(colors.secondary)' } },
      accent: { '--input-color': 'token(colors.accent)', '&:focus-within': { '--input-color': 'token(colors.accent)' } },
      info: { '--input-color': 'token(colors.info)', '&:focus-within': { '--input-color': 'token(colors.info)' } },
      success: { '--input-color': 'token(colors.success)', '&:focus-within': { '--input-color': 'token(colors.success)' } },
      warning: { '--input-color': 'token(colors.warning)', '&:focus-within': { '--input-color': 'token(colors.warning)' } },
      error: { '--input-color': 'token(colors.error)', '&:focus-within': { '--input-color': 'token(colors.error)' } },
    },
    size: {
      xs: { fontSize: 'token(fontSizes.2xl)', '--otp-size': 'token(spacing.6)' },
      sm: { fontSize: 'token(fontSizes.4xl)', '--otp-size': 'token(spacing.8)' },
      md: { fontSize: 'token(fontSizes.5xl)', '--otp-size': 'token(spacing.10)' },
      lg: { fontSize: 'token(fontSizes.6xl)', '--otp-size': 'token(spacing.12)' },
      xl: { fontSize: 'token(fontSizes.7xl)', '--otp-size': 'token(spacing.14)' },
    },
    joined: {
      true: {
        '--otp-gap': '0rem',
        clipPath: 'inset(-3.5px 0 -3.5px -3.5px)',
        '& > span:first-of-type': { borderStartEndRadius: '0', borderEndEndRadius: '0' },
        '& > span:not(:last-of-type)': { borderInlineEndWidth: '0' },
        '& > span:not(:first-of-type):not(:last-of-type)': { borderRadius: '0' },
        '& > span:last-of-type': { borderStartStartRadius: '0', borderEndStartRadius: '0' },
      },
    },
  },
  defaultVariants: {
    size: 'md',
  },
})
