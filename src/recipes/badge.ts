import { cva } from '../../styled-system/css'

export const badgeStyles = cva({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    verticalAlign: 'middle',
    width: 'fit-content',
    fontSize: '0.875rem',
    borderRadius: 'var(--radius-selector)',
    borderWidth: 'var(--border, 1px)',
    borderStyle: 'solid',
    borderColor: 'var(--badge-color, var(--colors-base-200))',
    color: 'var(--badge-fg, var(--colors-base-content))',
    backgroundColor: 'var(--badge-bg, var(--badge-color, var(--colors-base-100)))',
    backgroundImage: 'none, var(--fx-noise)',
    backgroundSize: 'auto, calc(var(--noise, 0) * 100%)',
    // daisyUI: --size: calc(var(--size-selector, 0.25rem) * 6) for the default (md) size
    '--badge-size': '1.5rem',
    height: 'var(--badge-size)',
    paddingInline: 'calc(var(--badge-size) / 2 - var(--border, 1px))',
  },
  variants: {
    color: {
      neutral: { '--badge-color': 'var(--colors-neutral)', '--badge-fg': 'var(--colors-neutral-content)' },
      primary: { '--badge-color': 'var(--colors-primary)', '--badge-fg': 'var(--colors-primary-content)' },
      secondary: { '--badge-color': 'var(--colors-secondary)', '--badge-fg': 'var(--colors-secondary-content)' },
      accent: { '--badge-color': 'var(--colors-accent)', '--badge-fg': 'var(--colors-accent-content)' },
      info: { '--badge-color': 'var(--colors-info)', '--badge-fg': 'var(--colors-info-content)' },
      success: { '--badge-color': 'var(--colors-success)', '--badge-fg': 'var(--colors-success-content)' },
      warning: { '--badge-color': 'var(--colors-warning)', '--badge-fg': 'var(--colors-warning-content)' },
      error: { '--badge-color': 'var(--colors-error)', '--badge-fg': 'var(--colors-error-content)' },
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
        color: 'var(--badge-color, var(--colors-base-content))',
        backgroundColor: 'color-mix(in oklab, var(--badge-color, var(--colors-base-content)) 8%, var(--colors-base-100))',
        borderColor: 'color-mix(in oklab, var(--badge-color, var(--colors-base-content)) 10%, var(--colors-base-100))',
        backgroundImage: 'none',
      },
      ghost: {
        borderColor: 'var(--colors-base-200)',
        backgroundColor: 'var(--colors-base-200)',
        color: 'var(--colors-base-content)',
        backgroundImage: 'none',
      },
    },
    size: {
      xs: { '--badge-size': '1rem', fontSize: '0.625rem' },
      sm: { '--badge-size': '1.25rem', fontSize: '0.75rem' },
      md: { '--badge-size': '1.5rem', fontSize: '0.875rem' },
      lg: { '--badge-size': '1.75rem', fontSize: '1rem' },
      xl: { '--badge-size': '2rem', fontSize: '1.125rem' },
    },
  },
})
