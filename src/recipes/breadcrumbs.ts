import { cva } from '../../styled-system/css'

export const breadcrumbsStyles = cva({
  base: {
    maxWidth: '100%',
    overflowX: 'auto',
    paddingBlock: '0.5rem',

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
      gap: '0.5rem',
      cursor: 'pointer',
      _hover: { textDecoration: 'underline' },
      _focus: { outline: 'none' },
      '&:focus-visible': { outline: '2px solid currentColor', outlineOffset: '2px' },
    },
    // Chevron separator between items, matching daisyUI's rotated-border trick.
    '& > ul > li + li:before, & > ol > li + li:before': {
      content: '""',
      display: 'block',
      marginInlineStart: '0.5rem',
      marginInlineEnd: '0.75rem',
      height: '0.375rem',
      width: '0.375rem',
      opacity: '0.4',
      rotate: '45deg',
      borderTop: '1px solid currentColor',
      borderRight: '1px solid currentColor',
      backgroundColor: 'transparent',
    },
  },
})
