import { cva } from '../../styled-system/css'

export const radialProgressStyles = cva({
  base: {
    position: 'relative',
    display: 'inline-grid',
    placeContent: 'center',
    verticalAlign: 'middle',
    flexShrink: '0',
    borderRadius: '9999px',
    backgroundColor: 'transparent',
    boxSizing: 'content-box',
    '--value': '0',
    '--size': '5rem',
    '--thickness': 'calc(var(--size) / 10)',
    '--radialprogress': 'calc(var(--value) * 1%)',
    width: 'var(--size)',
    height: 'var(--size)',
    transition: '--radialprogress 0.3s linear',

    '&:before': {
      content: '""',
      position: 'absolute',
      inset: '0',
      borderRadius: '9999px',
      background: 'radial-gradient(farthest-side, currentColor 98%, transparent) top / var(--thickness) var(--thickness) no-repeat, conic-gradient(currentColor var(--radialprogress), transparent 0)',
      mask: 'radial-gradient(farthest-side, transparent calc(100% - var(--thickness)), #000 calc(100% + 0.5px - var(--thickness)))',
    },
    '&:after': {
      content: '""',
      position: 'absolute',
      borderRadius: '9999px',
      backgroundColor: 'currentColor',
      transition: 'transform 0.3s linear',
      inset: 'calc(50% - var(--thickness) / 2)',
      transform: 'rotate(calc(var(--value) * 3.6deg - 90deg)) translate(calc(var(--size) / 2 - 50%))',
    },
  },
})
