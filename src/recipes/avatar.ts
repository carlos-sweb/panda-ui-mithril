import { cva } from '../../styled-system/css'

export const avatarStyles = cva({
  base: {
    position: 'relative',
    display: 'inline-flex',
    verticalAlign: 'middle',
    alignSelf: 'center',

    '& > div': {
      display: 'block',
      aspectRatio: '1 / 1',
      overflow: 'hidden',
    },
    '& img': {
      height: '100%',
      width: '100%',
      objectFit: 'cover',
    },
  },
  variants: {
    size: {
      xs: { '& > div': { width: '1.5rem' } },
      sm: { '& > div': { width: '2rem' } },
      md: { '& > div': { width: '3rem' } },
      lg: { '& > div': { width: '4rem' } },
      xl: { '& > div': { width: '6rem' } },
    },
    shape: {
      circle: { '& > div': { borderRadius: '9999px' } },
      square: { '& > div': { borderRadius: 'var(--radius-box)' } },
    },
    placeholder: {
      true: {
        '& > div': {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'var(--colors-neutral)',
          color: 'var(--colors-neutral-content)',
        },
      },
    },
    status: {
      online: {
        '&:before': {
          content: '""',
          position: 'absolute',
          zIndex: '1',
          display: 'block',
          borderRadius: '9999px',
          backgroundColor: 'var(--colors-success)',
          outline: '2px solid var(--colors-base-100)',
          width: '15%',
          height: '15%',
          top: '7%',
          insetInlineEnd: '7%',
        },
      },
      offline: {
        '&:before': {
          content: '""',
          position: 'absolute',
          zIndex: '1',
          display: 'block',
          borderRadius: '9999px',
          backgroundColor: 'var(--colors-base-300)',
          outline: '2px solid var(--colors-base-100)',
          width: '15%',
          height: '15%',
          top: '7%',
          insetInlineEnd: '7%',
        },
      },
    },
  },
  defaultVariants: {
    size: 'md',
    shape: 'circle',
  },
})

export const avatarGroupStyles = cva({
  base: {
    display: 'flex',
    overflow: 'hidden',

    '& > *:not(:first-child)': {
      marginInlineStart: '-1rem',
    },
    '& .avatar > div': {
      overflow: 'hidden',
      borderRadius: '9999px',
      border: '4px solid var(--colors-base-100)',
    },
  },
})
