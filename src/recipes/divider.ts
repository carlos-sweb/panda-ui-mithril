import { cva } from '../../styled-system/css'

export const dividerStyles = cva({
  base: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
    whiteSpace: 'nowrap',
    height: '1rem',
    marginBlock: '1rem',
    marginInline: '0',
    '--divider-color': 'color-mix(in oklab, var(--colors-base-content) 10%, transparent)',
    _before: { content: '""', height: '0.125rem', width: '100%', flexGrow: '1', backgroundColor: 'var(--divider-color)' },
    _after: { content: '""', height: '0.125rem', width: '100%', flexGrow: '1', backgroundColor: 'var(--divider-color)' },
    '&:not(:empty)': { gap: '1rem' },
  },
  variants: {
    color: {
      neutral: { '--divider-color': 'var(--colors-neutral)' },
      primary: { '--divider-color': 'var(--colors-primary)' },
      secondary: { '--divider-color': 'var(--colors-secondary)' },
      accent: { '--divider-color': 'var(--colors-accent)' },
      info: { '--divider-color': 'var(--colors-info)' },
      success: { '--divider-color': 'var(--colors-success)' },
      warning: { '--divider-color': 'var(--colors-warning)' },
      error: { '--divider-color': 'var(--colors-error)' },
    },
    direction: {
      // Default line-across-a-column divider (matches daisyUI's plain `.divider`)
      horizontal: {},
      // Narrow bar divider for side-by-side content (matches daisyUI's `.divider-horizontal`)
      vertical: {
        flexDirection: 'column',
        height: 'auto',
        width: '1rem',
        marginBlock: '0',
        marginInline: '1rem',
        _before: { height: '100%', width: '0.125rem' },
        _after: { height: '100%', width: '0.125rem' },
      },
    },
    placement: {
      start: { _before: { display: 'none' } },
      end: { _after: { display: 'none' } },
    },
  },
})
