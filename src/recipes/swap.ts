import { cva } from '../../styled-system/css'

export const swapStyles = cva({
  base: {
    position: 'relative',
    display: 'inline-grid',
    placeContent: 'center',
    verticalAlign: 'middle',
    cursor: 'pointer',
    userSelect: 'none',
    '& > *': {
      gridColumnStart: '1',
      gridRowStart: '1',
      transitionProperty: 'transform, rotate, opacity',
      transitionDuration: '0.2s',
      transitionTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)',
    },
    // hidden but still natively toggled by clicking the wrapping <label> — no JS required
    '& input': { display: 'none' },
    '& .swap-on': { opacity: '0' },
    '&.swap-active .swap-on, & input:checked ~ .swap-on': { opacity: '1' },
    '&.swap-active .swap-off, & input:checked ~ .swap-off': { opacity: '0' },
  },
  variants: {
    style: {
      rotate: {
        '& .swap-on': { rotate: '45deg' },
        '&.swap-active .swap-on, & input:checked ~ .swap-on': { rotate: '0deg' },
        '&.swap-active .swap-off, & input:checked ~ .swap-off': { rotate: '-45deg' },
      },
      flip: {
        transformStyle: 'preserve-3d',
        perspective: 'token(spacing.80)',
        '& .swap-on': { transform: 'rotateY(180deg)', backfaceVisibility: 'hidden' },
        '&.swap-active .swap-on, & input:checked ~ .swap-on': { transform: 'rotateY(0deg)' },
        '&.swap-active .swap-off, & input:checked ~ .swap-off': {
          transform: 'rotateY(-180deg)',
          backfaceVisibility: 'hidden',
          opacity: '1',
        },
      },
    },
  },
})
