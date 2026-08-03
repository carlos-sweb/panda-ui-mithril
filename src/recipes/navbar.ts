import { sva } from '../../styled-system/css'

export const navbar = sva({
  slots: ['navbar', 'start', 'center', 'end'],
  base: {
    navbar: {
      position: 'relative',
      display: 'flex',
      width: '100%',
      alignItems: 'center',
      padding: 'token(spacing.2)',
      minHeight: 'token(spacing.16)',
      backgroundColor: 'token(colors.base-100)',
      color: 'token(colors.base-content)',
    },
    start: {
      display: 'inline-flex',
      alignItems: 'center',
      width: '50%',
      justifyContent: 'flex-start',
    },
    center: {
      display: 'inline-flex',
      alignItems: 'center',
      flexShrink: '0',
    },
    end: {
      display: 'inline-flex',
      alignItems: 'center',
      width: '50%',
      justifyContent: 'flex-end',
    },
  },
})
