import { defineRecipe } from '@pandacss/dev'

export const buttonGroupRecipe = defineRecipe({
  className:'button-group',
  base: {
    display: 'inline-flex',

    '& > .btn:not(:first-child)': {
      marginInlineStart: 'calc(var(--border, 1px) * -1)',
    },
    '& > .btn:first-child': {
      borderStartEndRadius: '0',
      borderEndEndRadius: '0',
    },
    '& > .btn:last-child': {
      borderStartStartRadius: '0',
      borderEndStartRadius: '0',
    },
    '& > .btn:not(:first-child):not(:last-child)': {
      borderRadius: '0',
    },
    '& > .btn:focus, & > .btn:hover': {
      zIndex: '1',
      position: 'relative',
    },
  },
  variants: {
    vertical: {
      true: {
        flexDirection: 'column',
        '& > .btn:not(:first-child)': {
          marginTop: 'calc(var(--border, 1px) * -1)',
          marginInlineStart: '0',
        },
        '& > .btn:first-child': {
          borderEndStartRadius: '0',
          borderEndEndRadius: '0',
        },
        '& > .btn:last-child': {
          borderStartStartRadius: '0',
          borderStartEndRadius: '0',
        },
      },
    },
  },
})
