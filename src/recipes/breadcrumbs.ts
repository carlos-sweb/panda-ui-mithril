import { defineRecipe } from '@pandacss/dev'

export const breadcrumbsRecipe = defineRecipe({
  className:'breadcrumbs',
  base: {
    maxWidth: '100%',
    overflowX: 'auto',
    paddingBlock: 'token(spacing.2)',

    '& > ul, & > ol': {
      display: 'flex',
      minHeight: 'min-content',
      alignItems: 'center',
      whiteSpace: 'nowrap',
    },
    '& > ul > li, & > ol > li': {
      display: 'flex',
      alignItems: 'center',
    },
    '& > ul > li > *, & > ol > li > *': {
      display: 'flex',
      alignItems: 'center',
      gap: 'token(spacing.2)',
      cursor: 'pointer',
      _hover: { textDecoration: 'underline' },
      _focus: { outline: 'none' },
      '&:focus-visible': { outline: '2px solid currentColor', outlineOffset: '2px' },
    },
    // Chevron separator between items, matching the original's rotated-border trick.
    '& > ul > li + li:before, & > ol > li + li:before': {
      content: '""',
      display: 'block',
      marginInlineStart: 'token(spacing.2)',
      marginInlineEnd: 'token(spacing.3)',
      height: 'token(spacing.1.5)',
      width: 'token(spacing.1.5)',
      opacity: '0.4',
      rotate: '45deg',
      borderTop: '1px solid currentColor',
      borderRight: '1px solid currentColor',
      backgroundColor: 'transparent',
    },
  },
})
