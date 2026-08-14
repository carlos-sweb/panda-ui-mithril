import { defineSlotRecipe } from '@pandacss/dev'

// Scoped port: this project drives tabs via a controlled `active` prop
// (real JS state) rather than the original's hidden input[radio]/label CSS-only
// trick, so all the `:is(input:checked, label:has(:checked))` selector
// branches in the real source are dropped in favor of a single
// .tab-active/[aria-selected] check. The `lift` variant also skips
// the original's radial-gradient trick that rounds the outer corners where the
// active tab meets its content panel — kept the core "file folder tab"
// border effect, dropped that specific polish detail.
const activeSelector = '&.tab-active, &[aria-selected="true"], &[aria-current="true"]'
const activeBeforeSelector = '&.tab-active:before, &[aria-selected="true"]:before, &[aria-current="true"]:before'
const inactiveSelector = '&:not(.tab-active, [aria-selected="true"], [aria-current="true"], :hover)'

export const tabsRecipe = defineSlotRecipe({
  className : 'tabs',
  slots: ['tabs', 'tab', 'content'],
  base: {
    tabs: {
      display: 'flex',
      flexWrap: 'wrap',
      '--tab-height': 'token(spacing.10)',
      '--tab-p': 'token(spacing.3)',
    },
    tab: {
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
      fontSize: 'token(fontSizes.md)',
      paddingInline: 'var(--tab-p)',
      color: 'inherit',
      fontFamily: 'inherit',

      [inactiveSelector]: {
        color: 'color-mix(in oklab, token(colors.base-content) 50%, transparent)',
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
    content: {
      order: '1',
      display: 'none',
      width: '100%',
      padding: 'token(spacing.4)',
      borderWidth: 'var(--border, 1px)',
      borderStyle: 'solid',
      borderColor: 'transparent',
    },
  },
  variants: {
    variant: {
      box: {
        tabs: {
          backgroundColor: 'base-200',
          padding: 'token(spacing.1)',
          borderRadius: 'calc(min(var(--tab-height) / 2, var(--radius-field)) + 0.25rem)',
        },
        tab: {
          borderRadius: 'var(--radius-field)',
          [activeSelector]: {
            backgroundColor: 'base-100',
            boxShadow: '0 1px 3px color-mix(in oklab, black 15%, transparent)',
          },
        },
        content: {},
      },
      border: {
        tabs: {
          borderBottomWidth: '1px',
          borderColor: 'base-300',
        },
        tab: {
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
        content: {},
      },
      lift: {
        tabs: {},
        tab: {
          borderStyle: 'solid',
          borderWidth: '0 0 var(--border, 1px) 0',
          borderColor: 'transparent transparent token(colors.base-300) transparent',
          borderStartStartRadius: 'var(--radius-field)',
          borderStartEndRadius: 'var(--radius-field)',
          paddingTop: 'var(--border, 1px)',
          [activeSelector]: {
            borderWidth: 'var(--border, 1px) var(--border, 1px) 0 var(--border, 1px)',
            borderColor: 'token(colors.base-300) token(colors.base-300) transparent token(colors.base-300)',
            paddingTop: '0',
            backgroundColor: 'base-100',
          },
        },
        content: {
          marginTop: 'calc(-1 * var(--border, 1px))',
          borderColor: 'base-300',
          borderStartStartRadius: '0',
          borderStartEndRadius: 'var(--radius-box)',
          borderEndStartRadius: 'var(--radius-box)',
          borderEndEndRadius: 'var(--radius-box)',
        },
      },
    },
    size: {
      xs: { tabs: { '--tab-height': 'token(spacing.6)', '--tab-p': 'token(spacing.1.5)' } },
      sm: { tabs: { '--tab-height': 'token(spacing.8)', '--tab-p': 'token(spacing.2)' } },
      md: { tabs: { '--tab-height': 'token(spacing.10)', '--tab-p': 'token(spacing.3)' } },
      lg: { tabs: { '--tab-height': 'token(spacing.12)', '--tab-p': 'token(spacing.4)' } },
      xl: { tabs: { '--tab-height': 'token(spacing.14)', '--tab-p': 'token(spacing.5)' } },
    },
    active: {
      true: { content: { display: 'block' } },
    },
  },
  defaultVariants: {
    size: 'md',
  },
})
