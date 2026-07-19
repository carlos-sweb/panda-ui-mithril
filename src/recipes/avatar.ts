import { cva } from '../../styled-system/css'

export const avatarStyles = cva({
  base: {
    display: 'inline-flex',
    position: 'relative',
    w: '12',
    h: '12',
    overflow: 'hidden',
    rounded: 'full',
  },
  variants: {
    size: {
      xs: { w: '8', h: '8' },
      sm: { w: '10', h: '10' },
      md: { w: '12', h: '12' },
      lg: { w: '16', h: '16' },
      xl: { w: '20', h: '20' },
    },
    placeholder: {
      true: {
        bg: 'neutral',
        color: 'neutral-content',
        fontWeight: 'bold',
        fontSize: 'xl',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
    },
  },
})
