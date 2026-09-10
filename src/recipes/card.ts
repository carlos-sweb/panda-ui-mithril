import { defineSlotRecipe } from '@pandacss/dev'

export const cardRecipe = defineSlotRecipe({
  className :'card',
  slots: ['card', 'body', 'title', 'actions'],
  base: {
    card: {
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: 'token(colors.base-100)',
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
    // Elevation — independent of border/dash, composes with either (or
    // neither). Not every Card should look "elevated", so this stays opt-in
    // rather than living in `base`.
    shadow: {
      true: { card: { boxShadow: '0 4px 12px color-mix(in oklab, black 15%, transparent)' } },
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
    // A CardBody as a divided side compartment — meant for `<Card side>`,
    // e.g. a vertical rail of quick actions/presets next to the card's main
    // content, with a divider border and its content centered along the row.
    rail: {
      true: {
        body: {
          justifyContent: 'center',
          borderInlineStart: 'var(--border, 1px) solid token(colors.base-200)',
        },
      },
    },
  },
  defaultVariants: {
    size: 'md',
  },
})
