import { cva } from '../../styled-system/css'

export const diffStyles = cva({
  base: {
    position: 'relative',
    width: '100%',
    aspectRatio: '16 / 9',
    overflow: 'hidden',
    userSelect: 'none',
    borderRadius: 'var(--radius-box)',
    touchAction: 'none',
  },
})

export const diffItemStyles = cva({
  base: {
    position: 'absolute',
    inset: '0',
    overflow: 'hidden',

    '& > *': {
      position: 'absolute',
      inset: '0',
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      objectPosition: 'center',
      pointerEvents: 'none',
    },
  },
  variants: {
    item: {
      1: {
        zIndex: '1',
        clipPath: 'inset(0 calc(100% - var(--diff-pos, 50%)) 0 0)',
      },
      2: {
        zIndex: '0',
      },
    },
  },
})

export const diffResizerStyles = cva({
  base: {
    position: 'absolute',
    top: '0',
    bottom: '0',
    zIndex: '2',
    left: 'var(--diff-pos, 50%)',
    transform: 'translateX(-50%)',
    width: '3px',
    backgroundColor: 'color-mix(in oklab, white 70%, transparent)',
    cursor: 'ew-resize',
    pointerEvents: 'none',

    '&:after': {
      content: '""',
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '2rem',
      height: '2rem',
      borderRadius: '9999px',
      backgroundColor: 'color-mix(in oklab, white 90%, transparent)',
      boxShadow: '0 1px 4px color-mix(in oklab, black 30%, transparent)',
    },
    '&:before': {
      content: '"❮ ❯"',
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      zIndex: '1',
      fontSize: '0.625rem',
      letterSpacing: '-0.05em',
      color: 'black',
    },
  },
})
