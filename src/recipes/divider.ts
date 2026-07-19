import { cva } from '../../styled-system/css'

export const dividerStyles = cva({
  base: {
    display: 'flex',
    alignItems: 'center',
    w: '100%',
    px: '2',
    fontSize: 'sm',
    color: 'base-content/40',
    _before: { content: '""', flex: '1', h: '1px', bg: 'currentColor' },
    _after: { content: '""', flex: '1', h: '1px', bg: 'currentColor' },
  },
  variants: {
    color: {
      neutral: { color: 'neutral' },
      primary: { color: 'primary' },
      secondary: { color: 'secondary' },
      accent: { color: 'accent' },
      info: { color: 'info' },
      success: { color: 'success' },
      warning: { color: 'warning' },
      error: { color: 'error' },
    },
    direction: {
      horizontal: {},
      vertical: {
        flexDirection: 'column',
        w: 'auto',
        minW: '1px',
        h: 'auto',
        py: '0',
        px: '2',
        _before: { h: 'auto', w: '1px' },
        _after: { h: 'auto', w: '1px' },
      },
    },
    placement: {
      start: { _before: { display: 'none' } },
      end: { _after: { display: 'none' } },
    },
  },
})
