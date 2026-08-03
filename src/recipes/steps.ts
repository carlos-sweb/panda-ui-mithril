import { sva } from '../../styled-system/css'

export const steps = sva({
  slots: ['steps', 'step'],
  base: {
    steps: {
      display: 'inline-grid',
      gridAutoFlow: 'column',
      gridAutoColumns: '1fr',
      overflow: 'hidden',
      overflowX: 'auto',
      counterReset: 'step',
    },
    step: {
      display: 'grid',
      placeItems: 'center',
      textAlign: 'center',
      gridTemplateColumns: 'auto',
      gridTemplateRows: '40px 1fr',
      minWidth: 'token(spacing.16)',
      '--step-bg': 'token(colors.base-300)',
      '--step-fg': 'token(colors.base-content)',

      '&:before': {
        content: '""',
        gridColumnStart: '1',
        gridRowStart: '1',
        top: '0',
        height: 'token(spacing.2)',
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
        height: 'token(spacing.8)',
        width: 'token(spacing.8)',
        borderRadius: '9999px',
        color: 'var(--step-fg)',
        backgroundColor: 'var(--step-bg)',
        border: '1px solid var(--step-bg)',
      },
    },
  },
  variants: {
    direction: {
      horizontal: {
        steps: {
          gridAutoFlow: 'column',
          gridAutoColumns: '1fr',
        },
      },
      vertical: {
        steps: {
          gridAutoFlow: 'row',
          gridAutoRows: '1fr',
          '& > .step': {
            gridTemplateColumns: '40px 1fr',
            gridTemplateRows: 'auto',
            gap: 'token(spacing.2)',
            justifyItems: 'start',
            minHeight: 'token(spacing.16)',
            minWidth: '0',
          },
          '& > .step:before': {
            height: '100%',
            width: 'token(spacing.2)',
            marginInlineStart: '50%',
            translate: '-50% -50%',
          },
        },
      },
    },
    color: {
      neutral: {
        step: {
          '& > .step-icon, &:not(:has(.step-icon)):after': { '--step-bg': 'token(colors.neutral)', '--step-fg': 'token(colors.neutral-content)' },
          '&.step-neutral + .step-neutral:before': { '--step-bg': 'token(colors.neutral)' },
        },
      },
      primary: {
        step: {
          '& > .step-icon, &:not(:has(.step-icon)):after': { '--step-bg': 'token(colors.primary)', '--step-fg': 'token(colors.primary-content)' },
          '&.step-primary + .step-primary:before': { '--step-bg': 'token(colors.primary)' },
        },
      },
      secondary: {
        step: {
          '& > .step-icon, &:not(:has(.step-icon)):after': { '--step-bg': 'token(colors.secondary)', '--step-fg': 'token(colors.secondary-content)' },
          '&.step-secondary + .step-secondary:before': { '--step-bg': 'token(colors.secondary)' },
        },
      },
      accent: {
        step: {
          '& > .step-icon, &:not(:has(.step-icon)):after': { '--step-bg': 'token(colors.accent)', '--step-fg': 'token(colors.accent-content)' },
          '&.step-accent + .step-accent:before': { '--step-bg': 'token(colors.accent)' },
        },
      },
      info: {
        step: {
          '& > .step-icon, &:not(:has(.step-icon)):after': { '--step-bg': 'token(colors.info)', '--step-fg': 'token(colors.info-content)' },
          '&.step-info + .step-info:before': { '--step-bg': 'token(colors.info)' },
        },
      },
      success: {
        step: {
          '& > .step-icon, &:not(:has(.step-icon)):after': { '--step-bg': 'token(colors.success)', '--step-fg': 'token(colors.success-content)' },
          '&.step-success + .step-success:before': { '--step-bg': 'token(colors.success)' },
        },
      },
      warning: {
        step: {
          '& > .step-icon, &:not(:has(.step-icon)):after': { '--step-bg': 'token(colors.warning)', '--step-fg': 'token(colors.warning-content)' },
          '&.step-warning + .step-warning:before': { '--step-bg': 'token(colors.warning)' },
        },
      },
      error: {
        step: {
          '& > .step-icon, &:not(:has(.step-icon)):after': { '--step-bg': 'token(colors.error)', '--step-fg': 'token(colors.error-content)' },
          '&.step-error + .step-error:before': { '--step-bg': 'token(colors.error)' },
        },
      },
    },
  },
  defaultVariants: {
    direction: 'horizontal',
  },
})
