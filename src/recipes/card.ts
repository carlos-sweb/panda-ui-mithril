import { defineSlotRecipe } from '@pandacss/dev'

export const cardRecipe = defineSlotRecipe({
  className :'card',
  slots: ['card', 'body', 'title', 'actions'],
  base: {
    card: {
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      borderRadius: 'var(--radius-box)',

      '& figure': {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      '& figure:first-child': {
        overflow: 'hidden',
        borderStartStartRadius: 'inherit',
        borderStartEndRadius: 'inherit',
        borderEndStartRadius: '0',
        borderEndEndRadius: '0',
      },
      '& figure:last-child': {
        overflow: 'hidden',
        borderStartStartRadius: '0',
        borderStartEndRadius: '0',
        borderEndStartRadius: 'inherit',
        borderEndEndRadius: 'inherit',
      },
    },
    body: {
      display: 'flex',
      flex: '1 1 auto',
      flexDirection: 'column',
      gap: 'token(spacing.2)',
      padding: 'var(--card-p, token(spacing.6))',
      fontSize: 'var(--card-fs, token(fontSizes.md))',

      '& p': { flexGrow: '1' },
    },
    title: {
      display: 'flex',
      alignItems: 'center',
      gap: 'token(spacing.2)',
      fontSize: 'var(--cardtitle-fs, token(fontSizes.xl))',
      fontWeight: 'token(fontWeights.semibold)',
    },
    actions: {
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'flex-start',
      gap: 'token(spacing.2)',
    },
  },
  variants: {
    size: {
      xs: {
        body: { '--card-p': 'token(spacing.2)', '--card-fs': 'token(fontSizes.xs)' },
        title: { '--cardtitle-fs': 'token(fontSizes.md)' },
      },
      sm: {
        body: { '--card-p': 'token(spacing.4)', '--card-fs': 'token(fontSizes.sm)' },
        title: { '--cardtitle-fs': 'token(fontSizes.lg)' },
      },
      md: {
        body: { '--card-p': 'token(spacing.6)', '--card-fs': 'token(fontSizes.md)' },
        title: { '--cardtitle-fs': 'token(fontSizes.xl)' },
      },
      lg: {
        body: { '--card-p': 'token(spacing.8)', '--card-fs': 'token(fontSizes.lg)' },
        title: { '--cardtitle-fs': 'token(fontSizes.2xl)' },
      },
      xl: {
        body: { '--card-p': 'token(spacing.10)', '--card-fs': 'token(fontSizes.xl)' },
        title: { '--cardtitle-fs': 'token(fontSizes.3xl)' },
      },
    },
    border: {
      true: { card: { border: 'var(--border, 1px) solid token(colors.base-200)' } },
    },
    dash: {
      true: { card: { border: 'var(--border, 1px) dashed token(colors.base-200)' } },
    },
    side: {
      true: {
        card: {
          alignItems: 'stretch',
          flexDirection: 'row',
          '& figure:first-child': {
            overflow: 'hidden',
            borderStartStartRadius: 'inherit',
            borderStartEndRadius: '0',
            borderEndStartRadius: 'inherit',
            borderEndEndRadius: '0',
          },
          '& figure:last-child': {
            overflow: 'hidden',
            borderStartStartRadius: '0',
            borderStartEndRadius: 'inherit',
            borderEndStartRadius: '0',
            borderEndEndRadius: 'inherit',
          },
          '& figure > *': {
            maxWidth: 'unset',
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          },
        },
      },
    },
    imageFull: {
      true: {
        card: {
          display: 'grid',
          '& > *': { gridColumnStart: '1', gridRowStart: '1' },
          '& > .card-body': { position: 'relative', color: 'neutral-content' },
          '& figure': { overflow: 'hidden', borderRadius: 'inherit' },
          '& figure img': { height: '100%', objectFit: 'cover', filter: 'brightness(28%)' },
        },
      },
    },
    justify: {
      start: { actions: { justifyContent: 'flex-start' } },
      center: { actions: { justifyContent: 'center' } },
      end: { actions: { justifyContent: 'flex-end' } },
      between: { actions: { justifyContent: 'space-between' } },
    },
  },
  defaultVariants: {
    size: 'md',
  },
})
