import { cva } from '../../styled-system/css'

export const kbdStyles = cva({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    verticalAlign: 'middle',
    flexShrink: '0',
    backgroundColor: 'var(--colors-base-200)',
    color: 'var(--colors-base-content)',
    borderRadius: 'var(--radius-field)',
    paddingInline: '0.5em',
    borderWidth: 'var(--border, 1px)',
    borderStyle: 'solid',
    borderColor: 'color-mix(in srgb, var(--colors-base-content) 20%, transparent)',
    borderBottomWidth: 'calc(var(--border, 1px) + 1px)',
    // daisyUI: --size: calc(var(--size-selector, 0.25rem) * 6) for the default (md) size
    '--kbd-size': '1.5rem',
    height: 'var(--kbd-size)',
    minWidth: 'var(--kbd-size)',
    fontSize: '0.875rem',
  },
  variants: {
    size: {
      xs: { '--kbd-size': '1rem', fontSize: '0.625rem' },
      sm: { '--kbd-size': '1.25rem', fontSize: '0.75rem' },
      md: { '--kbd-size': '1.5rem', fontSize: '0.875rem' },
      lg: { '--kbd-size': '1.75rem', fontSize: '1rem' },
      xl: { '--kbd-size': '2rem', fontSize: '1.125rem' },
    },
  },
})
