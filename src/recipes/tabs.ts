import { cva } from '../../styled-system/css'

// Scoped port: this project drives tabs via a controlled `active` prop
// (real JS state) rather than daisyUI's hidden input[radio]/label CSS-only
// trick, so all the `:is(input:checked, label:has(:checked))` selector
// branches in the real source are dropped in favor of a single
// .tab-active/[aria-selected] check. The `lift` variant also skips
// daisyUI's radial-gradient trick that rounds the outer corners where the
// active tab meets its content panel — kept the core "file folder tab"
// border effect, dropped that specific polish detail.
const activeSelector = '&.tab-active, &[aria-selected="true"], &[aria-current="true"]'
const activeBeforeSelector = '&.tab-active:before, &[aria-selected="true"]:before, &[aria-current="true"]:before'
const inactiveSelector = '&:not(.tab-active, [aria-selected="true"], [aria-current="true"], :hover)'

export const tabsStyles = cva({
  base: {
    display: 'flex',
    flexWrap: 'wrap',
    '--tab-height': '2.5rem',
    '--tab-p': '0.75rem',
  },
  variants: {
    variant: {
      box: {
        backgroundColor: 'var(--colors-base-200)',
        padding: '0.25rem',
        borderRadius: 'calc(min(var(--tab-height) / 2, var(--radius-field)) + 0.25rem)',
      },
      border: {
        borderBottomWidth: '1px',
        borderColor: 'var(--colors-base-300)',
      },
      lift: {},
    },
    size: {
      xs: { '--tab-height': '1.5rem', '--tab-p': '0.375rem' },
      sm: { '--tab-height': '2rem', '--tab-p': '0.5rem' },
      md: { '--tab-height': '2.5rem', '--tab-p': '0.75rem' },
      lg: { '--tab-height': '3rem', '--tab-p': '1rem' },
      xl: { '--tab-height': '3.5rem', '--tab-p': '1.25rem' },
    },
  },
})

export const tabStyles = cva({
  base: {
    position: 'relative',
    display: 'inline-flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    cursor: 'pointer',
    userSelect: 'none',
    appearance: 'none',
    border: 'none',
    background: 'none',
    height: 'var(--tab-height)',
    fontSize: '0.875rem',
    paddingInline: 'var(--tab-p)',
    color: 'inherit',
    fontFamily: 'inherit',

    [inactiveSelector]: {
      color: 'color-mix(in oklab, var(--colors-base-content) 50%, transparent)',
    },
    '&:disabled': {
      pointerEvents: 'none',
      opacity: '0.4',
    },
    '&:focus-visible': {
      outline: '2px solid currentColor',
      outlineOffset: '-5px',
    },
  },
  variants: {
    variant: {
      box: {
        borderRadius: 'var(--radius-field)',
        [activeSelector]: {
          backgroundColor: 'var(--colors-base-100)',
          boxShadow: '0 1px 3px color-mix(in oklab, black 15%, transparent)',
        },
      },
      border: {
        '&:before': {
          content: '""',
          position: 'absolute',
          bottom: '0',
          left: 'var(--tab-p)',
          width: 'calc(100% - var(--tab-p) * 2)',
          height: '3px',
          borderRadius: 'var(--radius-field)',
          backgroundColor: 'transparent',
          transition: 'background-color 0.2s ease',
        },
        [activeBeforeSelector]: {
          backgroundColor: 'currentColor',
        },
      },
      lift: {
        borderStyle: 'solid',
        borderWidth: '0 0 var(--border, 1px) 0',
        borderColor: 'transparent transparent var(--colors-base-300) transparent',
        borderStartStartRadius: 'var(--radius-field)',
        borderStartEndRadius: 'var(--radius-field)',
        paddingTop: 'var(--border, 1px)',
        [activeSelector]: {
          borderWidth: 'var(--border, 1px) var(--border, 1px) 0 var(--border, 1px)',
          borderColor: 'var(--colors-base-300) var(--colors-base-300) transparent var(--colors-base-300)',
          paddingTop: '0',
          backgroundColor: 'var(--colors-base-100)',
        },
      },
    },
  },
})

export const tabContentStyles = cva({
  base: {
    order: '1',
    display: 'none',
    width: '100%',
    padding: '1rem',
    borderWidth: 'var(--border, 1px)',
    borderStyle: 'solid',
    borderColor: 'transparent',
  },
  variants: {
    variant: {
      lift: {
        marginTop: 'calc(-1 * var(--border, 1px))',
        borderColor: 'var(--colors-base-300)',
        borderStartStartRadius: '0',
        borderStartEndRadius: 'var(--radius-box)',
        borderEndStartRadius: 'var(--radius-box)',
        borderEndEndRadius: 'var(--radius-box)',
      },
      box: {},
      border: {},
    },
    active: {
      true: { display: 'block' },
    },
  },
})
