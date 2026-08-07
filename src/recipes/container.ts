import { cva } from '../../styled-system/css'

export const containerStyles = cva({
  base: {
    width: '100%',
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingLeft: 'token(spacing.3)',
    paddingRight: 'token(spacing.3)',
    '@media (min-width: 768px)': {
      paddingLeft: 'token(spacing.4)',
      paddingRight: 'token(spacing.4)',
    },
    '@media (min-width: 1024px)': {
      maxWidth: '960px',
    },
    '@media (min-width: 1216px)': {
      maxWidth: '1152px',
    },
    '@media (min-width: 1408px)': {
      maxWidth: '1344px',
    },
  },
  variants: {
    maxWidth: {
      fullhd: {},
      widescreen: {
        '@media (min-width: 1024px)': { maxWidth: '1152px' },
        '@media (min-width: 1216px)': { maxWidth: '1152px' },
        '@media (min-width: 1408px)': { maxWidth: '1152px' },
      },
      desktop: {
        '@media (min-width: 1024px)': { maxWidth: '960px' },
        '@media (min-width: 1216px)': { maxWidth: '960px' },
        '@media (min-width: 1408px)': { maxWidth: '960px' },
      },
      tablet: { maxWidth: '768px' },
    },
    fluid: {
      true: {
        paddingLeft: 'token(spacing.4)',
        paddingRight: 'token(spacing.4)',
        '@media (min-width: 768px)': {
          paddingLeft: 'token(spacing.6)',
          paddingRight: 'token(spacing.6)',
        },
        '@media (min-width: 1024px)': {
          paddingLeft: 'token(spacing.8)',
          paddingRight: 'token(spacing.8)',
        },
        maxWidth: '100%',
      },
    },
  },
  defaultVariants: {
    maxWidth: 'fullhd',
  },
})
