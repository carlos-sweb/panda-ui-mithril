import { cva } from '../../styled-system/css'

export const stepsStyles = cva({
  base: {
    display: 'inline-grid',
    gridAutoFlow: 'column',
    gridAutoColumns: '1fr',
    overflow: 'hidden',
    overflowX: 'auto',
    counterReset: 'step',
  },
  variants: {
    direction: {
      horizontal: {
        gridAutoFlow: 'column',
        gridAutoColumns: '1fr',
      },
      vertical: {
        gridAutoFlow: 'row',
        gridAutoRows: '1fr',
        '& > .step': {
          gridTemplateColumns: '40px 1fr',
          gridTemplateRows: 'auto',
          gap: '0.5rem',
          justifyItems: 'start',
          minHeight: '4rem',
          minWidth: '0',
        },
        '& > .step:before': {
          height: '100%',
          width: '0.5rem',
          marginInlineStart: '50%',
          translate: '-50% -50%',
        },
      },
    },
  },
  defaultVariants: {
    direction: 'horizontal',
  },
})

export const stepStyles = cva({
  base: {
    display: 'grid',
    placeItems: 'center',
    textAlign: 'center',
    gridTemplateColumns: 'auto',
    gridTemplateRows: '40px 1fr',
    minWidth: '4rem',
    '--step-bg': 'var(--colors-base-300)',
    '--step-fg': 'var(--colors-base-content)',

    '&:before': {
      content: '""',
      gridColumnStart: '1',
      gridRowStart: '1',
      top: '0',
      height: '0.5rem',
      width: '100%',
      marginInlineStart: '-100%',
      border: '1px solid var(--step-bg)',
      backgroundColor: 'var(--step-bg)',
    },
    '&:first-child:before': {
      content: 'none',
    },
    '& > .step-icon, &:not(:has(.step-icon)):after': {
      content: 'counter(step)',
      counterIncrement: 'step',
      position: 'relative',
      zIndex: '1',
      gridColumnStart: '1',
      gridRowStart: '1',
      display: 'grid',
      placeItems: 'center',
      placeSelf: 'center',
      height: '2rem',
      width: '2rem',
      borderRadius: '9999px',
      color: 'var(--step-fg)',
      backgroundColor: 'var(--step-bg)',
      border: '1px solid var(--step-bg)',
    },
  },
  variants: {
    color: {
      neutral: {
        '& > .step-icon, &:not(:has(.step-icon)):after': { '--step-bg': 'var(--colors-neutral)', '--step-fg': 'var(--colors-neutral-content)' },
        '&.step-neutral + .step-neutral:before': { '--step-bg': 'var(--colors-neutral)' },
      },
      primary: {
        '& > .step-icon, &:not(:has(.step-icon)):after': { '--step-bg': 'var(--colors-primary)', '--step-fg': 'var(--colors-primary-content)' },
        '&.step-primary + .step-primary:before': { '--step-bg': 'var(--colors-primary)' },
      },
      secondary: {
        '& > .step-icon, &:not(:has(.step-icon)):after': { '--step-bg': 'var(--colors-secondary)', '--step-fg': 'var(--colors-secondary-content)' },
        '&.step-secondary + .step-secondary:before': { '--step-bg': 'var(--colors-secondary)' },
      },
      accent: {
        '& > .step-icon, &:not(:has(.step-icon)):after': { '--step-bg': 'var(--colors-accent)', '--step-fg': 'var(--colors-accent-content)' },
        '&.step-accent + .step-accent:before': { '--step-bg': 'var(--colors-accent)' },
      },
      info: {
        '& > .step-icon, &:not(:has(.step-icon)):after': { '--step-bg': 'var(--colors-info)', '--step-fg': 'var(--colors-info-content)' },
        '&.step-info + .step-info:before': { '--step-bg': 'var(--colors-info)' },
      },
      success: {
        '& > .step-icon, &:not(:has(.step-icon)):after': { '--step-bg': 'var(--colors-success)', '--step-fg': 'var(--colors-success-content)' },
        '&.step-success + .step-success:before': { '--step-bg': 'var(--colors-success)' },
      },
      warning: {
        '& > .step-icon, &:not(:has(.step-icon)):after': { '--step-bg': 'var(--colors-warning)', '--step-fg': 'var(--colors-warning-content)' },
        '&.step-warning + .step-warning:before': { '--step-bg': 'var(--colors-warning)' },
      },
      error: {
        '& > .step-icon, &:not(:has(.step-icon)):after': { '--step-bg': 'var(--colors-error)', '--step-fg': 'var(--colors-error-content)' },
        '&.step-error + .step-error:before': { '--step-bg': 'var(--colors-error)' },
      },
    },
  },
})
