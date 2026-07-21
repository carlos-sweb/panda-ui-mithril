import { cva } from '../../styled-system/css'

export const alertStyles = cva({
  base: {
    // daisyUI uses grid layout, not flex
    display: 'grid',
    alignItems: 'center',
    justifyContent: 'start',
    justifyItems: 'start',
    gridAutoFlow: 'column',
    gridTemplateColumns: 'auto',
    textAlign: 'start',
    gap: '4',
    paddingInline: '4',
    paddingBlock: '3',
    borderRadius: 'var(--radius-box)',
    fontSize: '0.875rem',
    lineHeight: '1.25rem',
    fontWeight: '400',

    // Colors via CSS variables (daisyUI pattern)
    backgroundColor: 'var(--alert-color, var(--colors-base-200))',
    color: 'var(--colors-base-content)',
    borderWidth: 'var(--border, 1px)',
    borderStyle: 'solid',
    borderColor: 'var(--alert-border-color, var(--colors-base-200))',

    // daisyUI visual effects
    backgroundImage: 'none, var(--fx-noise)',
    backgroundSize: 'auto, calc(var(--noise, 0) * 33%)',
    boxShadow: [
      '0 3px 0 -2px oklch(100% 0 0 / calc(var(--depth, 1) * 0.08)) inset',
      '0 1px color-mix(in oklab, color-mix(in oklab, #000 20%, var(--alert-color, var(--colors-base-200))) calc(var(--depth, 1) * 20%), #0000)',
      '0 4px 3px -2px oklch(0% 0 0 / calc(var(--depth, 1) * 0.08))',
    ].join(', '),

    // Icon defaults
    '& svg': {
      width: '1.25rem',
      height: '1.25rem',
      flexShrink: '0',
      stroke: 'currentColor',
    },

    // Title/description styling
    '& h3': {
      fontWeight: '700',
      fontSize: 'inherit',
      lineHeight: 'inherit',
      margin: '0',
    },
    '& .alert-description': {
      fontSize: '0.75rem',
      opacity: '0.8',
    },
  },
  variants: {
    color: {
      info: {
        '--alert-color': 'var(--colors-info)',
        '--alert-border-color': 'var(--colors-info)',
        color: 'var(--colors-info-content)',
      },
      success: {
        '--alert-color': 'var(--colors-success)',
        '--alert-border-color': 'var(--colors-success)',
        color: 'var(--colors-success-content)',
      },
      warning: {
        '--alert-color': 'var(--colors-warning)',
        '--alert-border-color': 'var(--colors-warning)',
        color: 'var(--colors-warning-content)',
      },
      error: {
        '--alert-color': 'var(--colors-error)',
        '--alert-border-color': 'var(--colors-error)',
        color: 'var(--colors-error-content)',
      },
    },
    variant: {
      outline: {
        backgroundColor: 'transparent',
        color: 'var(--alert-color)',
        boxShadow: 'none',
        backgroundImage: 'none',
      },
      dash: {
        backgroundColor: 'transparent',
        color: 'var(--alert-color)',
        borderStyle: 'dashed',
        boxShadow: 'none',
        backgroundImage: 'none',
      },
      soft: {
        color: 'var(--alert-color, var(--colors-base-content))',
        backgroundColor: 'color-mix(in oklab, var(--alert-color, var(--colors-base-content)) 8%, var(--colors-base-100))',
        '--alert-border-color': 'color-mix(in oklab, var(--alert-color, var(--colors-base-content)) 10%, var(--colors-base-100))',
        boxShadow: 'none',
        backgroundImage: 'none',
      },
    },
    direction: {
      horizontal: {
        justifyContent: 'start',
        justifyItems: 'start',
        gridAutoFlow: 'column',
        textAlign: 'start',
      },
      vertical: {
        justifyContent: 'center',
        justifyItems: 'center',
        gridAutoFlow: 'row',
        textAlign: 'center',
      },
    },
  },
  defaultVariants: {
    direction: 'horizontal',
  },
})