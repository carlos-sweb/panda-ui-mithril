import { sva } from '../../styled-system/css'

export const footer = sva({
  slots: ['footer', 'title'],
  base: {
    footer: {
      display: 'grid',
      width: '100%',
      gridAutoFlow: 'row',
      placeItems: 'start',
      columnGap: 'token(spacing.4)',
      rowGap: 'token(spacing.10)',
      fontSize: 'token(fontSizes.base)',
      lineHeight: 'token(spacing.5)',

      '& > *': {
        display: 'grid',
        placeItems: 'start',
        gap: 'token(spacing.2)',
      },
    },
    title: {
      marginBottom: 'token(spacing.2)',
      textTransform: 'uppercase',
      opacity: '0.6',
      fontWeight: '600',
    },
  },
  variants: {
    center: {
      true: {
        footer: {
          gridAutoFlow: 'column dense',
          placeItems: 'center',
          textAlign: 'center',
          '& > *': { placeItems: 'center' },
        },
      },
    },
    direction: {
      horizontal: { footer: { gridAutoFlow: 'column' } },
      vertical: { footer: { gridAutoFlow: 'row' } },
    },
  },
  compoundVariants: [
    { center: true, direction: 'horizontal', css: { footer: { gridAutoFlow: 'row dense' } } },
    { center: true, direction: 'vertical', css: { footer: { gridAutoFlow: 'column dense' } } },
  ],
})
