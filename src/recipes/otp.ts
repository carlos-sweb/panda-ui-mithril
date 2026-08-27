import { defineSlotRecipe } from '@pandacss/dev'

/**
 * OTP — un input real por celda (patrón Mantine/Ant/PrimeReact). Cada celda es
 * un <input> de verdad: caret nativo, focus ring nativo y click-to-position sin
 * hacks de superposición. El estado del código lo gestiona el componente en JS
 * (avance de focus, backspace, flechas, paste, mask, oncomplete).
 */
export const otpRecipe = defineSlotRecipe({
  className: 'otp',
  slots: ['root', 'input', 'separator'],
  base: {
    root: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 'token(spacing.1)',
      direction: 'ltr',
      '--otp-color': 'token(colors.primary)',
      '--otp-size': 'token(spacing.10)',
      '--otp-fs': 'token(fontSizes.5xl)',
    },
    input: {
      width: 'var(--otp-size)',
      height: 'var(--otp-size)',
      padding: '0',
      textAlign: 'center',
      fontFamily: 'monospace',
      fontSize: 'var(--otp-fs)',
      fontVariantNumeric: 'tabular-nums',
      appearance: 'none',
      border: '1px solid token(colors.base-300)',
      borderRadius: 'var(--radius-field)',
      backgroundColor: 'base-100',
      color: 'base-content',
      caretColor: 'var(--otp-color)',
      outline: 'none',
      transition: 'border-color 0.15s ease, box-shadow 0.15s ease',
      '&::placeholder': {
        color: 'color-mix(in oklab, token(colors.base-content) 40%, transparent)',
      },
      '&:focus': {
        borderColor: 'var(--otp-color)',
        boxShadow: '0 0 0 2px color-mix(in oklab, var(--otp-color) 25%, transparent)',
      },
      '&:disabled': {
        opacity: '0.5',
        cursor: 'not-allowed',
      },
      '&[readonly]': {
        cursor: 'default',
      },
    },
    separator: {
      color: 'color-mix(in oklab, token(colors.base-content) 50%, transparent)',
      fontSize: 'var(--otp-fs)',
      alignSelf: 'center',
      userSelect: 'none',
    },
  },
  variants: {
    size: {
      xs: { root: { '--otp-size': 'token(spacing.6)', '--otp-fs': 'token(fontSizes.2xl)' } },
      sm: { root: { '--otp-size': 'token(spacing.8)', '--otp-fs': 'token(fontSizes.4xl)' } },
      md: { root: { '--otp-size': 'token(spacing.10)', '--otp-fs': 'token(fontSizes.5xl)' } },
      lg: { root: { '--otp-size': 'token(spacing.12)', '--otp-fs': 'token(fontSizes.6xl)' } },
      xl: { root: { '--otp-size': 'token(spacing.14)', '--otp-fs': 'token(fontSizes.7xl)' } },
    },
    color: {
      neutral: { root: { '--otp-color': 'token(colors.neutral)' } },
      primary: { root: { '--otp-color': 'token(colors.primary)' } },
      secondary: { root: { '--otp-color': 'token(colors.secondary)' } },
      accent: { root: { '--otp-color': 'token(colors.accent)' } },
      info: { root: { '--otp-color': 'token(colors.info)' } },
      success: { root: { '--otp-color': 'token(colors.success)' } },
      warning: { root: { '--otp-color': 'token(colors.warning)' } },
      error: { root: { '--otp-color': 'token(colors.error)' } },
    },
    joined: {
      true: {
        root: { gap: '0' },
        input: {
          '&:first-child': { borderStartEndRadius: '0', borderEndEndRadius: '0' },
          '&:last-child': { borderStartStartRadius: '0', borderEndStartRadius: '0' },
          '&:not(:first-child):not(:last-child)': { borderRadius: '0' },
          '&:not(:last-child)': { borderInlineEndWidth: '0' },
        },
      },
    },
    error: {
      true: {
        input: {
          borderColor: 'token(colors.error)',
          '&:focus': {
            borderColor: 'token(colors.error)',
            boxShadow: '0 0 0 2px color-mix(in oklab, token(colors.error) 25%, transparent)',
          },
        },
      },
    },
  },
  defaultVariants: {
    size: 'md',
    color: 'primary',
  },
})
