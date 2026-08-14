import { defineSlotRecipe } from '@pandacss/dev'

export const avatarRecipe = defineSlotRecipe({
  className : 'avatar',
  slots: ['avatar', 'group'],
  base: {
    avatar: {
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
    group: {
      display: 'flex',
      overflow: 'hidden',

      '& > *:not(:first-child)': {
        marginInlineStart: '-1rem',
      },
      '& .avatar > div': {
        overflow: 'hidden',
        borderRadius: '9999px',
        border: '4px solid token(colors.base-100)',
      },
    },
  },
  variants: {
    size: {
      xs: { avatar: { '& > div': { width: 'token(spacing.6)' } } },
      sm: { avatar: { '& > div': { width: 'token(spacing.8)' } } },
      md: { avatar: { '& > div': { width: 'token(spacing.12)' } } },
      lg: { avatar: { '& > div': { width: 'token(spacing.16)' } } },
      xl: { avatar: { '& > div': { width: 'token(spacing.24)' } } },
    },
    shape: {
      circle: { avatar: { '& > div': { borderRadius: '9999px' } } },
      square: { avatar: { '& > div': { borderRadius: 'var(--radius-box)' } } },
    },
    placeholder: {
      true: {
        avatar: {
          '& > div': {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'neutral',
            color: 'neutral-content',
          },
        },
      },
    },
    status: {
      online: {
        avatar: {
          '&:before': {
            content: '""',
            position: 'absolute',
            zIndex: '1',
            display: 'block',
            borderRadius: '9999px',
            backgroundColor: 'success',
            outline: '2px solid token(colors.base-100)',
            width: '15%',
            height: '15%',
            top: '7%',
            insetInlineEnd: '7%',
          },
        },
      },
      offline: {
        avatar: {
          '&:before': {
            content: '""',
            position: 'absolute',
            zIndex: '1',
            display: 'block',
            borderRadius: '9999px',
            backgroundColor: 'base-300',
            outline: '2px solid token(colors.base-100)',
            width: '15%',
            height: '15%',
            top: '7%',
            insetInlineEnd: '7%',
          },
        },
      },
    },
  },
  defaultVariants: {
    size: 'md',
    shape: 'circle',
  },
})
