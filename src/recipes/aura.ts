import { defineRecipe } from '@pandacss/dev'

export const auraRecipe = defineRecipe({
  className:'aura',
  base: {
    position: 'relative',
    display: 'inline-block',
    '--aura-padding': 'token(spacing.0.5)',
    padding: 'var(--aura-padding)',
    borderRadius: 'calc(var(--aura-padding) + var(--aura-radius, var(--radius-box)))',
    animation: 'aura 6s linear infinite',
    backgroundImage: 'conic-gradient(from var(--aura-angle), transparent 225deg, currentColor)',

    '&:before, &:after': {
      content: '""',
      position: 'absolute',
      top: '50%',
      left: '50%',
      zIndex: '0',
      display: 'block',
      opacity: '0.7',
      translate: '-50% -50%',
      width: '100%',
      height: '100%',
      animation: 'inherit',
      backgroundColor: 'inherit',
      backgroundImage: 'inherit',
      borderRadius: 'inherit',
      filter: 'blur(0.25rem)',
    },
    '&:after': {
      opacity: '0.3',
      filter: 'blur(1rem)',
    },
    '& > *': {
      position: 'relative',
      zIndex: '1',
    },
  },
  variants: {
    variant: {
      default: {},
      rainbow: {
        backgroundImage: 'conic-gradient(from var(--aura-angle) in oklch longer hue, transparent 10%, oklch(80% 0.15 0deg), oklch(80% 0.15 360deg), transparent 90%)',
      },
      holo: {
        backgroundImage: 'repeating-conic-gradient(from var(--aura-angle), oklch(0.82 0.17 327), oklch(0.75 0.12 274), oklch(0.82 0.11 191), oklch(0.91 0.11 105), oklch(0.88 0.08 68), oklch(0.82 0.17 327) 10%)',
        animation: 'aura 20s linear infinite',
      },
      dual: {
        backgroundImage: 'repeating-conic-gradient(from var(--aura-angle), transparent 0%, transparent 40%, currentColor 50%)',
      },
      silver: {
        backgroundImage: 'repeating-conic-gradient(from var(--aura-angle), oklch(0.3 0 0), oklch(0.9 0 0), oklch(0.6 0 0), oklch(0.9 0 0), oklch(0.5 0 0), oklch(0.3 0 0) 50%)',
      },
      gold: {
        backgroundImage: 'repeating-conic-gradient(from var(--aura-angle), oklch(0.6598 0.1863 72.37), oklch(0.9635 0.0768 102.94), oklch(0.7157 0.1691 82.23), oklch(0.9602 0.0792 103.13), oklch(0.6066 0.1181 76.17), oklch(0.6598 0.1863 72.37) 50%)',
      },
      glow: {
        animation: 'none',
        backgroundImage: 'radial-gradient(closest-corner at center, currentColor 0%, transparent 90%)',
        '&:before': { animation: 'aura-glow 6s ease-out infinite' },
        '&:after': { animation: 'aura-glow-after 6s ease-out infinite' },
      },
    },
    shape: {
      box: { '--aura-radius': 'var(--radius-box)' },
      field: { '--aura-radius': 'var(--radius-field)' },
      selector: { '--aura-radius': 'var(--radius-selector)' },
    },
    size: {
      xs: { '--aura-padding': '0rem' },
      sm: { '--aura-padding': '0.0625rem' },
      md: { '--aura-padding': 'token(spacing.0.5)' },
      lg: { '--aura-padding': '0.15625rem' },
      xl: { '--aura-padding': 'token(spacing.1)' },
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'md',
  },
})
