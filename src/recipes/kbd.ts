import { cva } from '../../styled-system/css'

export const kbdStyles = cva({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    verticalAlign: 'middle',
    flexShrink: '0',
    backgroundColor: 'token(colors.base-200)',
    color: 'token(colors.base-content)',
    borderRadius: 'var(--radius-field)',
    paddingInline: '0.5em',
    borderWidth: 'var(--border, 1px)',
    borderStyle: 'solid',
    borderColor: 'color-mix(in srgb, token(colors.base-content) 20%, transparent)',
    borderBottomWidth: 'calc(var(--border, 1px) + 1px)',
    // the original implementation: --size: calc(var(--size-selector, 0.25rem) * 6) for the default (md) size
    '--kbd-size': 'token(spacing.6)',
    height: 'var(--kbd-size)',
    minWidth: 'var(--kbd-size)',
    fontSize: 'token(fontSizes.base)',
  },
  variants: {
    size: {
      xs: { '--kbd-size': 'token(spacing.4)', fontSize: 'token(fontSizes.2xs)' },
      sm: { '--kbd-size': 'token(spacing.5)', fontSize: 'token(fontSizes.sm)' },
      md: { '--kbd-size': 'token(spacing.6)', fontSize: 'token(fontSizes.base)' },
      lg: { '--kbd-size': 'token(spacing.7)', fontSize: 'token(fontSizes.lg)' },
      xl: { '--kbd-size': 'token(spacing.8)', fontSize: 'token(fontSizes.xl)' },
    },
  },
  defaultVariants: {
    size: 'md',
  },
})
