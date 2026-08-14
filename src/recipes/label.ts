import { defineRecipe } from '@pandacss/dev'

export const labelRecipe = defineRecipe({
   className:'label',
  base: {},
  variants: {
    floating: {
      false: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 'token(spacing.1.5)',
        whiteSpace: 'nowrap',
        color: 'color-mix(in oklab, currentColor 60%, transparent)',
        '&:has(input)': { cursor: 'pointer' },
      },
      true: {
        position: 'relative',
        display: 'flex',
        '& > span': {
          position: 'absolute',
          insetInlineStart: 'token(spacing.3)',
          zIndex: '1',
          paddingInline: 'token(spacing.1)',
           backgroundColor: 'base-100',
          fontSize: 'token(fontSizes.md)',
          lineHeight: 'token(lineHeights.none)',
          borderRadius: '2px',
          opacity: '0',
          pointerEvents: 'none',
          top: 'calc(0.25rem * 5)',
          translate: '0 -50%',
          transition: 'top 0.1s ease-out, translate 0.1s ease-out, scale 0.1s ease-out, opacity 0.1s ease-out',
        },
        '&:focus-within > span, &:not(:has(input:placeholder-shown, textarea:placeholder-shown)) > span': {
          opacity: '1',
          top: '0',
          translate: '-12.5% calc(-50% - 0.125em)',
          scale: '0.75',
          pointerEvents: 'auto',
          zIndex: '2',
        },
        '&:has(:disabled, [disabled]) > span': {
          opacity: '0',
        },
      },
    },
  },
})
