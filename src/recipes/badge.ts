import { cva } from '../../styled-system/css'

export const badgeStyles = cva({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 'token(spacing.2)',
    verticalAlign: 'middle',
    width: 'fit-content',
    fontSize: 'token(fontSizes.md)',
    borderRadius: 'var(--radius-selector)',
    borderWidth: 'var(--border, 1px)',
    borderStyle: 'solid',
    borderColor: 'var(--badge-color, token(colors.base-200))',
    color: 'var(--badge-fg, token(colors.base-content))',
    backgroundColor: 'var(--badge-bg, var(--badge-color, token(colors.base-100)))',
    backgroundImage: 'none, var(--fx-noise)',
    backgroundSize: 'auto, calc(var(--noise, 0) * 100%)',
    // the original implementation: --size: calc(var(--size-selector, 0.25rem) * 6) for the default (md) size
    '--badge-size': 'token(spacing.6)',
    height: 'var(--badge-size)',
    paddingInline: 'calc(var(--badge-size) / 2 - var(--border, 1px))',
  },
  variants: {
    color: {
      neutral: { '--badge-color': 'token(colors.neutral)', '--badge-fg': 'token(colors.neutral-content)' },
      primary: { '--badge-color': 'token(colors.primary)', '--badge-fg': 'token(colors.primary-content)' },
      secondary: { '--badge-color': 'token(colors.secondary)', '--badge-fg': 'token(colors.secondary-content)' },
      accent: { '--badge-color': 'token(colors.accent)', '--badge-fg': 'token(colors.accent-content)' },
      info: { '--badge-color': 'token(colors.info)', '--badge-fg': 'token(colors.info-content)' },
      success: { '--badge-color': 'token(colors.success)', '--badge-fg': 'token(colors.success-content)' },
      warning: { '--badge-color': 'token(colors.warning)', '--badge-fg': 'token(colors.warning-content)' },
      error: { '--badge-color': 'token(colors.error)', '--badge-fg': 'token(colors.error-content)' },
    },
    variant: {
      outline: {
        color: 'var(--badge-color)',
        '--badge-bg': 'transparent',
        backgroundImage: 'none',
        borderColor: 'currentColor',
      },
      dash: {
        color: 'var(--badge-color)',
        '--badge-bg': 'transparent',
        backgroundImage: 'none',
        borderColor: 'currentColor',
        borderStyle: 'dashed',
      },
      soft: {
        color: 'var(--badge-color, token(colors.base-content))',
        backgroundColor: 'color-mix(in oklab, var(--badge-color, token(colors.base-content)) 8%, token(colors.base-100))',
        borderColor: 'color-mix(in oklab, var(--badge-color, token(colors.base-content)) 10%, token(colors.base-100))',
        backgroundImage: 'none',
      },
      ghost: {
        borderColor: 'token(colors.base-200)',
        backgroundColor: 'token(colors.base-200)',
        color: 'token(colors.base-content)',
        backgroundImage: 'none',
      },
    },
    size: {
      xs: { '--badge-size': 'token(spacing.4)', fontSize: 'token(fontSizes.2xs)' },
      sm: { '--badge-size': 'token(spacing.5)', fontSize: 'token(fontSizes.sm)' },
      md: { '--badge-size': 'token(spacing.6)', fontSize: 'token(fontSizes.md)' },
      lg: { '--badge-size': 'token(spacing.7)', fontSize: 'token(fontSizes.lg)' },
      xl: { '--badge-size': 'token(spacing.8)', fontSize: 'token(fontSizes.xl)' },
    },
  },
  defaultVariants: {
    size: 'md',
  },
})
