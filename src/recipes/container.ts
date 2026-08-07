import { cva } from '../../styled-system/css'

export const containerStyles = cva({
  base: {
    width: '100%',
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingLeft: 'token(spacing.4)',
    paddingRight: 'token(spacing.4)',
    maxWidth: '1344px',
    '@media (max-width: 1407px)': {
      maxWidth: '1152px',
    },
    '@media (max-width: 1215px)': {
      maxWidth: '960px',
    },
    '@media (max-width: 1023px)': {
      maxWidth: '100%',
    },
  },
  variants: {
    maxWidth: {
      fullhd: { maxWidth: '1344px' },
      widescreen: {
        maxWidth: '1152px',
        '@media (max-width: 1407px)': { maxWidth: '1152px' },
        '@media (max-width: 1215px)': { maxWidth: '960px' },
      },
      desktop: {
        maxWidth: '960px',
        '@media (max-width: 1407px)': { maxWidth: '960px' },
        '@media (max-width: 1215px)': { maxWidth: '960px' },
      },
      tablet: { maxWidth: '768px' },
    },
    fluid: {
      true: { maxWidth: '100%', paddingLeft: 'token(spacing.8)', paddingRight: 'token(spacing.8)' },
    },
  },
  defaultVariants: {
    maxWidth: 'fullhd',
  },
})
