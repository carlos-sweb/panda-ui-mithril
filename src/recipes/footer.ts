import { defineSlotRecipe } from '@pandacss/dev'

export const footerRecipe = defineSlotRecipe({
  className : 'footer',
  slots: ['footer', 'title'],
  base: {
    footer: {
      display: 'grid',
      width: '100%',
      gridAutoFlow: 'row',
      placeItems: 'start',
      columnGap: 'token(spacing.4)',
      rowGap: 'token(spacing.10)',
      fontSize: 'token(fontSizes.md)',
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
      fontWeight: 'token(fontWeights.semibold)',
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
