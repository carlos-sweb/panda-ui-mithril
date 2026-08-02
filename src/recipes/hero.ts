import { cva } from '../../styled-system/css'

export const heroStyles = cva({
  base: {
    display: 'grid',
    width: '100%',
    placeItems: 'center',
    backgroundSize: 'cover',
    backgroundPosition: 'center',

    '& > *': {
      gridColumnStart: '1',
      gridRowStart: '1',
    },
  },
})

export const heroOverlayStyles = cva({
  base: {
    gridColumnStart: '1',
    gridRowStart: '1',
    height: '100%',
    width: '100%',
    backgroundColor: 'color-mix(in oklab, var(--colors-neutral) 50%, transparent)',
  },
})

export const heroContentStyles = cva({
  base: {
    isolation: 'isolate',
    display: 'flex',
    maxWidth: '80rem',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '1rem',
    padding: '1rem',
  },
})
