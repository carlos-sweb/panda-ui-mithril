import { cva } from '../../styled-system/css'

export const navbarStyles = cva({
  base: {
    position: 'relative',
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    padding: '0.5rem',
    minHeight: '4rem',
  },
})

export const navbarStartStyles = cva({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    width: '50%',
    justifyContent: 'flex-start',
  },
})

export const navbarCenterStyles = cva({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    flexShrink: '0',
  },
})

export const navbarEndStyles = cva({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    width: '50%',
    justifyContent: 'flex-end',
  },
})
