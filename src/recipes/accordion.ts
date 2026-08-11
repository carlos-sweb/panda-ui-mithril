import { cva } from '../../styled-system/css'

export const collapseStyles = cva({
  base: {
    position: 'relative',
    display: 'grid',
    gridTemplateColumns: 'minmax(0, 1fr)',
    gridTemplateRows: 'max-content 0fr',
    width: '100%',
    borderRadius: 'var(--radius-box, 1rem)',
    isolation: 'isolate',
    overflow: 'hidden',
    transition: 'grid-template-rows 0.2s',

    '& > input': {
      gridColumnStart: '1',
      gridRowStart: '1',
      position: 'relative',
      zIndex: '1',
      appearance: 'none',
      opacity: '0',
      width: '100%',
      padding: 'token(spacing.4)',
      paddingInlineEnd: 'token(spacing.12)',
      minHeight: '1lh',
      cursor: 'pointer',
    },
    '& > .collapse-content': {
      gridColumnStart: '1',
      gridRowStart: '2',
      minHeight: '0',
      paddingInline: 'token(spacing.4)',
      paddingBottom: '0',
      overflow: 'hidden',
      transition: 'padding-bottom 0.2s ease-out',
    },
    '&:has(> input:checked)': {
      gridTemplateRows: 'max-content 1fr',
      '& > .collapse-content': { paddingBottom: 'token(spacing.4)' },
    },
  },
  variants: {
    // A checked radio can't be unchecked by clicking itself (only by
    // checking a sibling in the same `name` group), so in that grouped case
    // an arrow pointing "up" or a "−" would promise a click-to-close that
    // never happens. Checkbox mode (standalone Collapse) really can be
    // toggled off by clicking again, so it keeps the normal affordance —
    // only the radio (grouped/Accordion) case fades the icon out instead.
    arrow: {
      true: {
        '& > .collapse-title:after': {
          position: 'absolute',
          display: 'block',
          height: 'token(spacing.2)',
          width: 'token(spacing.2)',
          top: '50%',
          insetInlineEnd: '1.4rem',
          content: '""',
          transform: 'translateY(-100%) rotate(45deg)',
          transformOrigin: '75% 75%',
          boxShadow: '2px 2px',
          pointerEvents: 'none',
          transitionProperty: 'transform, opacity',
          transitionDuration: '0.2s',
        },
        '&:has(> input[type="checkbox"]:checked) > .collapse-title:after': {
          transform: 'translateY(-50%) rotate(225deg)',
        },
        '&:has(> input[type="radio"]:checked) > .collapse-title:after': {
          opacity: '0',
        },
      },
    },
    plus: {
      true: {
        '& > .collapse-title:after': {
          position: 'absolute',
          display: 'block',
          height: 'token(spacing.2)',
          width: 'token(spacing.2)',
          top: '0.9rem',
          insetInlineEnd: '1.4rem',
          content: '"+"',
          pointerEvents: 'none',
          transitionProperty: 'transform, opacity',
          transitionDuration: '0.2s',
        },
        '&:has(> input[type="checkbox"]:checked) > .collapse-title:after': {
          content: '"−"',
        },
        '&:has(> input[type="radio"]:checked) > .collapse-title:after': {
          opacity: '0',
        },
      },
    },
    // The original implementation has no .collapse-border modifier class — the border in
    // its docs examples comes from plain `bg-base-100 border border-base-300`
    // utility classes on the markup. This project has no Tailwind, so this
    // variant reproduces the same look via the recipe instead.
    border: {
      true: {
        backgroundColor: 'base-100',
        border: 'var(--border, 1px) solid token(colors.base-300)',
      },
    },
  },
})

export const collapseTitleStyles = cva({
  base: {
    gridColumnStart: '1',
    gridRowStart: '1',
    position: 'relative',
    width: '100%',
    padding: 'token(spacing.4)',
    paddingInlineEnd: 'token(spacing.12)',
    minHeight: '1lh',
    fontWeight: 'token(fontWeights.semibold)',
    transition: 'background-color 0.2s ease-out',
  },
})
