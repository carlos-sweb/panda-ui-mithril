import { cva } from '../../styled-system/css'

export const textareaStyles = cva({
  base: {
    display: 'block',
    width: 'clamp(3rem, 20rem, 100%)',
    minHeight: 'token(spacing.20)',
    paddingInline: 'token(spacing.3)',
    paddingBlock: 'token(spacing.2)',
    fontSize: 'token(fontSizes.base)',
    borderRadius: 'var(--radius-field)',
    backgroundColor: 'token(colors.base-100)',
    '--input-color': 'color-mix(in oklab, token(colors.base-content) 20%, transparent)',
    border: 'var(--border, 1px) solid var(--input-color)',
    boxShadow: '0 1px color-mix(in oklab, var(--input-color) 10%, transparent) inset, 0 -1px oklch(100% 0 0 / 0.1) inset',
    resize: 'vertical',
    _placeholder: { color: 'token(colors.base-content)', opacity: '0.5' },
    _focus: {
      '--input-color': 'token(colors.base-content)',
      boxShadow: '0 1px color-mix(in oklab, var(--input-color) 10%, transparent)',
      outline: '2px solid var(--input-color)',
      outlineOffset: '2px',
    },
    _disabled: {
      borderColor: 'token(colors.base-200)',
      backgroundColor: 'token(colors.base-200)',
      color: 'color-mix(in oklab, token(colors.base-content) 40%, transparent)',
      cursor: 'not-allowed',
      boxShadow: 'none',
    },
  },
  variants: {
    color: {
      neutral: { _focus: { '--input-color': 'token(colors.neutral)' } },
      primary: { _focus: { '--input-color': 'token(colors.primary)' } },
      secondary: { _focus: { '--input-color': 'token(colors.secondary)' } },
      accent: { _focus: { '--input-color': 'token(colors.accent)' } },
      info: { _focus: { '--input-color': 'token(colors.info)' } },
      success: { _focus: { '--input-color': 'token(colors.success)' } },
      warning: { _focus: { '--input-color': 'token(colors.warning)' } },
      error: { _focus: { '--input-color': 'token(colors.error)' } },
    },
    size: {
      xs: { fontSize: 'token(fontSizes.xs)' },
      sm: { fontSize: 'token(fontSizes.sm)' },
      md: { fontSize: 'token(fontSizes.base)' },
      lg: { fontSize: 'token(fontSizes.xl)' },
      xl: { fontSize: 'token(fontSizes.3xl)' },
    },
    ghost: {
      true: {
        backgroundColor: 'transparent',
        boxShadow: 'none',
        borderColor: 'transparent',
        _focus: { backgroundColor: 'token(colors.base-100)', borderColor: 'transparent', boxShadow: 'none' },
      },
    },
  },
  defaultVariants: {
    size: 'md',
  },
})
