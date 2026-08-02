import { cva } from '../../styled-system/css'

export const footerStyles = cva({
  base: {
    display: 'grid',
    width: '100%',
    gridAutoFlow: 'row',
    placeItems: 'start',
    columnGap: '1rem',
    rowGap: '2.5rem',
    fontSize: '0.875rem',
    lineHeight: '1.25rem',

    '& > *': {
      display: 'grid',
      placeItems: 'start',
      gap: '0.5rem',
    },
  },
  variants: {
    center: {
      true: {
        gridAutoFlow: 'column dense',
        placeItems: 'center',
        textAlign: 'center',
        '& > *': { placeItems: 'center' },
      },
    },
    direction: {
      horizontal: { gridAutoFlow: 'column' },
      vertical: { gridAutoFlow: 'row' },
    },
  },
  compoundVariants: [
    { center: true, direction: 'horizontal', css: { gridAutoFlow: 'row dense' } },
    { center: true, direction: 'vertical', css: { gridAutoFlow: 'column dense' } },
  ],
})

export const footerTitleStyles = cva({
  base: {
    marginBottom: '0.5rem',
    textTransform: 'uppercase',
    opacity: '0.6',
    fontWeight: '600',
  },
})
