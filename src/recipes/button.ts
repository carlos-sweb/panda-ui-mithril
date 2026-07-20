import { cva } from '../../styled-system/css'

export const buttonStyles = cva({
  base: {
    // Layout
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '2',
    cursor: 'pointer',
    textDecoration: 'none',
    userSelect: 'none',
    flexShrink: 0,

    // daisyUI-compatible sizing
    height: 'var(--size)',
    paddingInline: 'var(--btn-p)',
    fontSize: 'var(--fontsize)',
    fontWeight: '600',
    lineHeight: '1em',
    letterSpacing: '0.01em',

    // Colors via CSS variables
    backgroundColor: 'var(--btn-bg)',
    color: 'var(--btn-fg)',
    borderColor: 'var(--btn-border)',
    borderStyle: 'var(--btn-border-style, solid)',
    borderRadius: 'var(--btn-radius)',

    // Visual effects (daisyUI)
    backgroundImage: 'none, var(--fx-noise)',
    backgroundSize: 'auto, calc(var(--noise, 0) * 100%)',
    textShadow: '0 .5px oklch(100% 0 0 / calc(var(--depth, 1) * .15))',
    boxShadow: 'var(--btn-inset) inset, var(--btn-shadow)',

    // Effects
    fontSmoothing: 'antialiased',
    transition: 'all 0.2s ease',

    // Focus
    _focusVisible: {
      outline: '2px solid',
      outlineColor: 'var(--btn-color, var(--colors-base-content))',
      outlineOffset: '2px',
    },

    // Disabled
    _disabled: { opacity: '0.5', cursor: 'not-allowed', pointerEvents: 'none' },
  },
  variants: {
    color: {
      neutral: {
        '--btn-bg': 'var(--colors-neutral)',
        '--btn-fg': 'var(--colors-neutral-content)',
        '--btn-border': 'var(--colors-neutral)',
        _hover: { filter: 'brightness(0.92)' },
      },
      primary: {
        '--btn-bg': 'var(--colors-primary)',
        '--btn-fg': 'var(--colors-primary-content)',
        '--btn-border': 'var(--colors-primary)',
        _hover: { filter: 'brightness(0.92)' },
      },
      secondary: {
        '--btn-bg': 'var(--colors-secondary)',
        '--btn-fg': 'var(--colors-secondary-content)',
        '--btn-border': 'var(--colors-secondary)',
        _hover: { filter: 'brightness(0.92)' },
      },
      accent: {
        '--btn-bg': 'var(--colors-accent)',
        '--btn-fg': 'var(--colors-accent-content)',
        '--btn-border': 'var(--colors-accent)',
        _hover: { filter: 'brightness(0.92)' },
      },
      info: {
        '--btn-bg': 'var(--colors-info)',
        '--btn-fg': 'var(--colors-info-content)',
        '--btn-border': 'var(--colors-info)',
        _hover: { filter: 'brightness(0.92)' },
      },
      success: {
        '--btn-bg': 'var(--colors-success)',
        '--btn-fg': 'var(--colors-success-content)',
        '--btn-border': 'var(--colors-success)',
        _hover: { filter: 'brightness(0.92)' },
      },
      warning: {
        '--btn-bg': 'var(--colors-warning)',
        '--btn-fg': 'var(--colors-warning-content)',
        '--btn-border': 'var(--colors-warning)',
        _hover: { filter: 'brightness(0.92)' },
      },
      error: {
        '--btn-bg': 'var(--colors-error)',
        '--btn-fg': 'var(--colors-error-content)',
        '--btn-border': 'var(--colors-error)',
        _hover: { filter: 'brightness(0.92)' },
      },
    },
    variant: {
      outline: {
        '--btn-bg': 'transparent',
        '--btn-border': 'currentColor',
        '--btn-fg': 'currentColor',
        _hover: { '--btn-bg': 'color-mix(in srgb, var(--colors-base-content) 5%, transparent)' },
      },
      dash: {
        '--btn-bg': 'transparent',
        '--btn-border': 'currentColor',
        '--btn-border-style': 'dashed',
        '--btn-fg': 'currentColor',
        _hover: { '--btn-bg': 'color-mix(in srgb, var(--colors-base-content) 5%, transparent)' },
      },
      soft: {
        '--btn-bg': 'color-mix(in srgb, var(--colors-base-content) 10%, transparent)',
        _hover: { '--btn-bg': 'color-mix(in srgb, var(--colors-base-content) 15%, transparent)' },
      },
      ghost: {
        '--btn-bg': 'transparent',
        '--btn-fg': 'currentColor',
        _hover: { '--btn-bg': 'color-mix(in srgb, var(--colors-base-content) 10%, transparent)' },
      },
      link: {
        '--btn-bg': 'transparent',
        '--btn-fg': 'currentColor',
        textDecoration: 'underline',
        _hover: { opacity: '0.8', textDecorationOffset: '3px' },
      },
    },
    size: {
      xs: { '--size': '1.5rem', '--btn-p': '0.5rem', '--fontsize': '.75rem' },
      sm: { '--size': '2rem', '--btn-p': '0.75rem', '--fontsize': '.8125rem' },
      md: { '--size': '2.75rem', '--btn-p': '1rem', '--fontsize': '.875rem' },
      lg: { '--size': '3.5rem', '--btn-p': '1.5rem', '--fontsize': '1rem' },
      xl: { '--size': '4.5rem', '--btn-p': '2rem', '--fontsize': '1.125rem' },
    },
    active: {
      true: { '--btn-bg': 'color-mix(in srgb, var(--colors-base-content) 15%, transparent)', transform: 'translateY(1px)' },
    },
    shape: {
      square: { aspectRatio: '1', p: '0', minW: 'auto' },
      circle: { aspectRatio: '1', p: '0', borderRadius: 'full', minW: 'auto' },
    },
    fluid: {
      block: { w: 'full', display: 'flex' },
      wide: { '--btn-p': '2rem', minW: '14rem' },
    },
  },
  defaultVariants: {
    color: 'neutral',
    size: 'md',
  },
})
