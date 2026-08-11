import { cva } from '../../styled-system/css'

export const checkboxStyles = cva({
  base: {
    position: 'relative',
    display: 'inline-block',
    flexShrink: '0',
    verticalAlign: 'middle',
    cursor: 'pointer',
    appearance: 'none',
    color: 'base-content',
    borderRadius: 'var(--radius-selector)',
    '--input-color': 'color-mix(in oklab, token(colors.base-content) 20%, transparent)',
    border: 'var(--border, 1px) solid var(--input-color)',
    boxShadow: '0 1px oklch(0% 0 0 / 0.1) inset',
    transition: 'background-color 0.2s, box-shadow 0.2s',
    '--checkbox-size': 'token(spacing.6)',
    width: 'var(--checkbox-size)',
    height: 'var(--checkbox-size)',
    padding: 'token(spacing.1)',
    _before: {
      content: '""',
      display: 'block',
      width: '100%',
      height: '100%',
      rotate: '45deg',
      backgroundColor: 'currentColor',
      opacity: '0',
      clipPath: 'polygon(20% 100%, 20% 80%, 50% 80%, 50% 80%, 70% 80%, 70% 100%)',
      transition: 'clip-path 0.3s, opacity 0.1s, rotate 0.3s, translate 0.3s',
      transitionDelay: '0.1s',
    },
    '&:focus-visible': { outline: '2px solid var(--input-color)', outlineOffset: '2px' },
    '&:checked, &[aria-checked="true"]': {
      backgroundColor: 'var(--input-color)',
      _before: {
        opacity: '1',
        clipPath: 'polygon(20% 100%, 20% 80%, 50% 80%, 50% 0%, 70% 0%, 70% 100%)',
      },
    },
    '&:indeterminate': {
      backgroundColor: 'var(--input-color)',
      _before: {
        opacity: '1',
        rotate: '0deg',
        translate: '0 -35%',
        clipPath: 'polygon(20% 100%, 20% 80%, 50% 80%, 50% 80%, 80% 80%, 80% 100%)',
      },
    },
    _disabled: { opacity: '0.2', cursor: 'not-allowed' },
  },
  variants: {
    color: {
      neutral: { color: 'neutral-content', '--input-color': 'token(colors.neutral)' },
      primary: { color: 'primary-content', '--input-color': 'token(colors.primary)' },
      secondary: { color: 'secondary-content', '--input-color': 'token(colors.secondary)' },
      accent: { color: 'accent-content', '--input-color': 'token(colors.accent)' },
      info: { color: 'info-content', '--input-color': 'token(colors.info)' },
      success: { color: 'success-content', '--input-color': 'token(colors.success)' },
      warning: { color: 'warning-content', '--input-color': 'token(colors.warning)' },
      error: { color: 'error-content', '--input-color': 'token(colors.error)' },
    },
    size: {
      xs: { '--checkbox-size': 'token(spacing.4)', padding: 'token(spacing.0.5)' },
      sm: { '--checkbox-size': 'token(spacing.5)', padding: '0.1875rem' },
      md: { '--checkbox-size': 'token(spacing.6)', padding: 'token(spacing.1)' },
      lg: { '--checkbox-size': 'token(spacing.7)', padding: '0.3125rem' },
      xl: { '--checkbox-size': 'token(spacing.8)', padding: 'token(spacing.1.5)' },
    },
  },
  defaultVariants: {
    size: 'md',
  },
})
