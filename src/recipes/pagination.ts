import { defineRecipe } from '@pandacss/dev'

export const paginationRecipe = defineRecipe({
  className: 'pagination',
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    // Base size (Button scale); the items inherit it via --btn-size.
    '--btn-size': 'token(spacing.10)',
    fontSize: 'token(fontSizes.md)',

    // Ellipsis: same height as the buttons, fixed width, muted text.
    '& > .pagination-ellipsis': {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 'var(--btn-size)',
      height: 'var(--btn-size)',
      color: 'color-mix(in oklab, token(colors.base-content) 40%, transparent)',
      userSelect: 'none',
    },
  },
  variants: {
    // joined: buttons stuck together. The Button recipe sets borderRadius on all 4
    // corners of each item, so joined first RESETS the whole radius and
    // then rounds only the outer corners: left of the first and
    // right of the last. The middle ones stay straight.
    variant: {
      joined: {
        '& > .pagination-item': {
          borderRadius: '0',
        },
        '& > .pagination-item:not(:first-child)': {
          marginInlineStart: 'calc(var(--border, 1px) * -1)',
        },
        '& > .pagination-item:first-child': {
          borderStartStartRadius: 'var(--radius-field)',
          borderEndStartRadius: 'var(--radius-field)',
        },
        '& > .pagination-item:last-child': {
          borderStartEndRadius: 'var(--radius-field)',
          borderEndEndRadius: 'var(--radius-field)',
        },
      },
      separated: {
        gap: 'token(spacing.1)',
        '& > .pagination-item, & > .pagination-ellipsis': {
          borderRadius: 'var(--radius-field)',
        },
      },
    },
    // square: button radius according to variant. circle: fully round.
    shape: {
      square: {},
      circle: {
        '& > .pagination-item, & > .pagination-ellipsis': { borderRadius: '9999px' },
        // joined + circle: only the outer corners round (crescent
        // outward); the inner ones and the middle ones stay straight so the
        // button chain reads as stuck together.
        '&.pagination--variant_joined > .pagination-item:first-child': {
          borderStartStartRadius: '9999px',
          borderEndStartRadius: '9999px',
          borderStartEndRadius: '0',
          borderEndEndRadius: '0',
        },
        '&.pagination--variant_joined > .pagination-item:last-child': {
          borderStartEndRadius: '9999px',
          borderEndEndRadius: '9999px',
          borderStartStartRadius: '0',
          borderEndStartRadius: '0',
        },
        '&.pagination--variant_joined > .pagination-item:not(:first-child):not(:last-child)': {
          borderRadius: '0',
        },
      },
    },
    size: {
      xs: { '--btn-size': 'token(spacing.6)', fontSize: 'token(fontSizes.xs)' },
      sm: { '--btn-size': 'token(spacing.8)', fontSize: 'token(fontSizes.sm)' },
      md: { '--btn-size': 'token(spacing.10)', fontSize: 'token(fontSizes.md)' },
      lg: { '--btn-size': 'token(spacing.12)', fontSize: 'token(fontSizes.xl)' },
      xl: { '--btn-size': 'token(spacing.14)', fontSize: 'token(fontSizes.3xl)' },
    },
  },
  defaultVariants: {
    variant: 'joined',
    shape: 'square',
    size: 'md',
  },
})
