import { defineRecipe } from '@pandacss/dev'

export const buttonGroupRecipe = defineRecipe({
  className:'button-group',
  base: {
    display: 'inline-flex',

    '& > .button:not(:first-child)': {
      marginInlineStart: 'calc(var(--border, 1px) * -1)',
    },
    '& > .button:first-child': {
      borderStartEndRadius: '0',
      borderEndEndRadius: '0',
    },
    '& > .button:last-child': {
      borderStartStartRadius: '0',
      borderEndStartRadius: '0',
    },
    '& > .button:not(:first-child):not(:last-child)': {
      borderRadius: '0',
    },
    '& > .button:focus, & > .button:hover': {
      zIndex: '1',
      position: 'relative',
    },
  },
  variants: {
    vertical: {
      true: {
        flexDirection: 'column',
        '& > .button:not(:first-child)': {
          marginTop: 'calc(var(--border, 1px) * -1)',
          marginInlineStart: '0',
        },
        '& > .button:first-child': {
          borderEndStartRadius: '0',
          borderEndEndRadius: '0',
        },
        '& > .button:last-child': {
          borderStartStartRadius: '0',
          borderStartEndRadius: '0',
        },
      },
    },
  },
})
