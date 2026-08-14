import { defineRecipe } from '@pandacss/dev'

export const dividerRecipe = defineRecipe({
  className:'divider',
  base: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
    whiteSpace: 'nowrap',
    height: 'token(spacing.4)',
    marginBlock: 'token(spacing.4)',
    marginInline: '0',
    '--divider-color': 'color-mix(in oklab, token(colors.base-content) 10%, transparent)',
    _before: { content: '""', height: 'token(spacing.0.5)', width: '100%', flexGrow: '1', backgroundColor: 'var(--divider-color)' },
    _after: { content: '""', height: 'token(spacing.0.5)', width: '100%', flexGrow: '1', backgroundColor: 'var(--divider-color)' },
    '&:not(:empty)': { gap: 'token(spacing.4)' },
  },
  variants: {
    color: {
      neutral: { '--divider-color': 'token(colors.neutral)' },
      primary: { '--divider-color': 'token(colors.primary)' },
      secondary: { '--divider-color': 'token(colors.secondary)' },
      accent: { '--divider-color': 'token(colors.accent)' },
      info: { '--divider-color': 'token(colors.info)' },
      success: { '--divider-color': 'token(colors.success)' },
      warning: { '--divider-color': 'token(colors.warning)' },
      error: { '--divider-color': 'token(colors.error)' },
    },
    direction: {
      // Default line-across-a-column divider (matches the original's plain `.divider`)
      horizontal: {},
      // Narrow bar divider for side-by-side content (matches the original's `.divider-horizontal`)
      vertical: {
        flexDirection: 'column',
        height: 'auto',
        width: 'token(spacing.4)',
        marginBlock: '0',
        marginInline: 'token(spacing.4)',
        _before: { height: '100%', width: 'token(spacing.0.5)' },
        _after: { height: '100%', width: 'token(spacing.0.5)' },
      },
    },
    placement: {
      start: { _before: { display: 'none' } },
      end: { _after: { display: 'none' } },
    },
  },
})
