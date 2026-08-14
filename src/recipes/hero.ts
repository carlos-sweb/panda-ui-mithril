import { defineSlotRecipe } from '@pandacss/dev'

export const heroRecipe = defineSlotRecipe({
  className : 'hero',
  slots: ['hero', 'overlay', 'content'],
  base: {
    hero: {
      display: 'grid',
      width: '100%',
      placeItems: 'center',
      backgroundSize: 'cover',
      backgroundPosition: 'center',

      '& > *': {
        gridColumnStart: '1',
        gridRowStart: '1',
      },
    },
    overlay: {
      gridColumnStart: '1',
      gridRowStart: '1',
      height: '100%',
      width: '100%',
      backgroundColor: 'color-mix(in oklab, token(colors.neutral) 50%, transparent)',
    },
    content: {
      isolation: 'isolate',
      display: 'flex',
      maxWidth: 'token(spacing.320)',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 'token(spacing.4)',
      padding: 'token(spacing.4)',
    },
  },
})
