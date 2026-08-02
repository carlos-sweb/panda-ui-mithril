import { cva } from '../../styled-system/css'

export const indicatorStyles = cva({
  base: {
    position: 'relative',
    display: 'inline-flex',
    width: 'max-content',
    // Matches daisyUI's `:where(.indicator-item)` — positions ANY descendant
    // carrying this class, not just ones rendered via the `item` prop.
    '& .indicator-item': {
      position: 'absolute',
      whiteSpace: 'nowrap',
      zIndex: '1',
      top: 'var(--indicator-t, 0)',
      bottom: 'var(--indicator-b, auto)',
      left: 'var(--indicator-s, auto)',
      right: 'var(--indicator-e, 0)',
      translate: 'var(--indicator-x, 50%) var(--indicator-y, -50%)',
    },
  },
  variants: {
    horizontal: {
      start: { '--indicator-s': '0', '--indicator-e': 'auto', '--indicator-x': '-50%' },
      center: { '--indicator-s': '50%', '--indicator-e': 'auto', '--indicator-x': '-50%' },
      end: { '--indicator-s': 'auto', '--indicator-e': '0', '--indicator-x': '50%' },
    },
    vertical: {
      top: { '--indicator-t': '0', '--indicator-b': 'auto', '--indicator-y': '-50%' },
      middle: { '--indicator-t': '50%', '--indicator-b': 'auto', '--indicator-y': '-50%' },
      bottom: { '--indicator-t': 'auto', '--indicator-b': '0', '--indicator-y': '50%' },
    },
  },
})

export const indicatorItemStyles = cva({
  base: {
    position: 'absolute',
    whiteSpace: 'nowrap',
    zIndex: '1',
    top: 'var(--indicator-t, 0)',
    bottom: 'var(--indicator-b, auto)',
    left: 'var(--indicator-s, auto)',
    right: 'var(--indicator-e, 0)',
    translate: 'var(--indicator-x, 50%) var(--indicator-y, -50%)',
  },
})
