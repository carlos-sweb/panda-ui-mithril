import { cva } from '../../styled-system/css'

export const filterStyles = cva({
  base: {
    display: 'flex',
    flexWrap: 'wrap',

    '& input[type="radio"]': {
      width: 'auto',
    },
    '& input': {
      overflow: 'hidden',
      opacity: '1',
      scale: '1',
      transitionProperty: 'visibility, margin, opacity, padding, border-width',
      transitionDuration: '0.1s, 0.1s, 0.3s, 0.3s, 0.1s',
    },
    '& input.filter-reset': {
      aspectRatio: '1 / 1',
    },
    '& input.filter-reset:after': {
      content: '"×"',
    },
    '& > input:not(:last-child)': {
      marginInlineEnd: 'token(spacing.1)',
    },
    '&:not(:has(input:checked:not(.filter-reset))) .filter-reset:not(:focus-visible)': {
      visibility: 'hidden',
    },
    '&:not(:has(input:checked:not(.filter-reset))) .filter-reset:not(:focus-visible), &:not(:has(:focus-visible)):has(input:checked:not(.filter-reset)) input:not(:checked, .filter-reset)': {
      marginInline: '0',
      width: '0',
      paddingInline: '0',
      opacity: '0',
      scale: '0',
      borderWidth: '0',
    },
  },
})
