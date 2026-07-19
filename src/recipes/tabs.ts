import { cva } from '../../styled-system/css'

export const tabsStyles = cva({
  base: {
    display: 'flex',
    rounded: 'box',
  },
  variants: {
    variant: {
      box: { bg: 'base-200', p: '1', gap: '1' },
      border: { borderBottomWidth: '1px', borderColor: 'base-300' },
      lift: { borderBottomWidth: '2px', borderColor: 'base-300', mb: '-2px' },
    },
    size: {
      xs: { text: 'xs' },
      sm: { text: 'sm' },
      md: { text: 'sm' },
      lg: { text: 'md' },
      xl: { text: 'lg' },
    },
  },
})
