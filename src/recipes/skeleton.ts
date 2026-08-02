import { cva } from '../../styled-system/css'

export const skeletonStyles = cva({
  base: {
    backgroundColor: 'var(--colors-base-300)',
    borderRadius: 'var(--radius-box)',
    willChange: 'background-position',
    backgroundImage: 'linear-gradient(105deg, transparent 0% 40%, var(--colors-base-100) 50%, transparent 60% 100%)',
    backgroundSize: '200% auto',
    backgroundPositionX: '-50%',
    animation: 'skeleton 1.8s ease-in-out infinite',
  },
  variants: {
    text: {
      true: {
        backgroundClip: 'text',
        color: 'transparent',
        backgroundImage: 'linear-gradient(105deg, color-mix(in oklab, var(--colors-base-content) 20%, transparent) 0% 40%, var(--colors-base-content) 50%, color-mix(in oklab, var(--colors-base-content) 20%, transparent) 60% 100%)',
      },
    },
  },
})
