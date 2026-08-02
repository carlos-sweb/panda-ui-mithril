import { cva } from '../../styled-system/css'

export const fabStyles = cva({
  base: {
    pointerEvents: 'none',
    position: 'fixed',
    insetInlineEnd: '1rem',
    bottom: '1rem',
    zIndex: '999',
    display: 'flex',
    flexDirection: 'column-reverse',
    alignItems: 'flex-end',
    gap: '0.5rem',
    fontSize: '0.875rem',
    whiteSpace: 'nowrap',
    userSelect: 'none',

    '& > *': {
      pointerEvents: 'auto',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
    },
    '& > *:hover, & > *:has(:focus-visible)': {
      zIndex: '1',
    },
    '& > [tabindex]:first-child': {
      position: 'relative',
      display: 'grid',
      transitionProperty: 'opacity, visibility, rotate',
      transitionDuration: '0.2s',
      transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
    },
    '&:focus-within > [tabindex]:first-child': {
      pointerEvents: 'none',
      rotate: '90deg',
      opacity: '0',
    },
    '& > :nth-child(n + 2)': {
      visibility: 'hidden',
      scale: '0.8',
      opacity: '0',
      transitionProperty: 'opacity, scale, visibility',
      transitionDuration: '0.2s',
      transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
    },
    '& > :nth-child(3)': { transitionDelay: '30ms' },
    '& > :nth-child(4)': { transitionDelay: '60ms' },
    '& > :nth-child(5)': { transitionDelay: '90ms' },
    '& > :nth-child(6)': { transitionDelay: '120ms' },
    '&:focus-within > :nth-child(n + 2)': {
      visibility: 'visible',
      scale: '1',
      opacity: '1',
    },
  },
})

export const fabLabelStyles = cva({
  base: {
    backgroundColor: 'var(--colors-neutral)',
    color: 'var(--colors-neutral-content)',
    paddingInline: '0.625rem',
    paddingBlock: '0.25rem',
    borderRadius: 'var(--radius-field)',
  },
})
