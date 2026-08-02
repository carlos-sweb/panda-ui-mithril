import { cva } from '../../styled-system/css'

export const textareaStyles = cva({
  base: {
    display: 'block',
    width: 'clamp(3rem, 20rem, 100%)',
    minHeight: '5rem',
    paddingInline: '0.75rem',
    paddingBlock: '0.5rem',
    fontSize: '0.875rem',
    borderRadius: 'var(--radius-field)',
    backgroundColor: 'var(--colors-base-100)',
    '--input-color': 'color-mix(in oklab, var(--colors-base-content) 20%, transparent)',
    border: 'var(--border, 1px) solid var(--input-color)',
    boxShadow: '0 1px color-mix(in oklab, var(--input-color) 10%, transparent) inset, 0 -1px oklch(100% 0 0 / 0.1) inset',
    resize: 'vertical',
    _placeholder: { color: 'var(--colors-base-content)', opacity: '0.5' },
    _focus: {
      '--input-color': 'var(--colors-base-content)',
      boxShadow: '0 1px color-mix(in oklab, var(--input-color) 10%, transparent)',
      outline: '2px solid var(--input-color)',
      outlineOffset: '2px',
    },
    _disabled: {
      borderColor: 'var(--colors-base-200)',
      backgroundColor: 'var(--colors-base-200)',
      color: 'color-mix(in oklab, var(--colors-base-content) 40%, transparent)',
      cursor: 'not-allowed',
      boxShadow: 'none',
    },
  },
  variants: {
    color: {
      neutral: { _focus: { '--input-color': 'var(--colors-neutral)' } },
      primary: { _focus: { '--input-color': 'var(--colors-primary)' } },
      secondary: { _focus: { '--input-color': 'var(--colors-secondary)' } },
      accent: { _focus: { '--input-color': 'var(--colors-accent)' } },
      info: { _focus: { '--input-color': 'var(--colors-info)' } },
      success: { _focus: { '--input-color': 'var(--colors-success)' } },
      warning: { _focus: { '--input-color': 'var(--colors-warning)' } },
      error: { _focus: { '--input-color': 'var(--colors-error)' } },
    },
    size: {
      xs: { fontSize: '0.6875rem' },
      sm: { fontSize: '0.75rem' },
      md: { fontSize: '0.875rem' },
      lg: { fontSize: '1.125rem' },
      xl: { fontSize: '1.375rem' },
    },
    ghost: {
      true: {
        backgroundColor: 'transparent',
        boxShadow: 'none',
        borderColor: 'transparent',
        _focus: { backgroundColor: 'var(--colors-base-100)', borderColor: 'transparent', boxShadow: 'none' },
      },
    },
  },
})
