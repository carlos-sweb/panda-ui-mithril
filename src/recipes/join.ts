import { cva } from '../../styled-system/css'

// TODO (reported 2026-08-02): PaginationButton (and any other component
// combined with .join-item, e.g. via `buttonStyles()`) sets its OWN
// borderRadius on all 4 corners unconditionally in its base styles. That
// competes with the :first-child/:last-child corner rules below — same
// specificity (single class each), so whichever recipe's atomic class
// happens to land later in the generated stylesheet wins, not necessarily
// this one. Symptom: joined buttons' rounded corners don't line up with the
// join container's own shape. Needs either higher specificity here, or for
// combined components to skip their own borderRadius when .join-item is
// present.
export const joinStyles = cva({
  base: {
    display: 'inline-flex',
    alignItems: 'stretch',
    flexDirection: 'row',

    '& > .join-item:not(:first-child)': {
      marginInlineStart: 'calc(var(--border, 1px) * -1)',
    },
    '& > .join-item:first-child': {
      borderStartStartRadius: 'var(--radius-field)',
      borderEndStartRadius: 'var(--radius-field)',
    },
    '& > .join-item:last-child': {
      borderStartEndRadius: 'var(--radius-field)',
      borderEndEndRadius: 'var(--radius-field)',
    },
    '& > .join-item:only-child': {
      borderRadius: 'var(--radius-field)',
    },
    '& > .join-item:focus, & > .join-item:hover': {
      zIndex: '1',
    },
  },
  variants: {
    vertical: {
      true: {
        flexDirection: 'column',
        '& > .join-item:not(:first-child)': {
          marginInlineStart: '0',
          marginBlockStart: 'calc(var(--border, 1px) * -1)',
        },
        '& > .join-item:first-child': {
          borderStartStartRadius: 'var(--radius-field)',
          borderStartEndRadius: 'var(--radius-field)',
          borderEndStartRadius: '0',
        },
        '& > .join-item:last-child': {
          borderEndStartRadius: 'var(--radius-field)',
          borderEndEndRadius: 'var(--radius-field)',
          borderStartEndRadius: '0',
        },
      },
    },
  },
})

export const joinItemStyles = cva({
  base: {
    position: 'relative',
    borderStyle: 'solid',
    borderWidth: 'var(--border, 1px)',
    borderColor: 'token(colors.base-300)',
    paddingInline: 'token(spacing.4)',
    paddingBlock: 'token(spacing.2)',
    backgroundColor: 'token(colors.base-100)',
    cursor: 'pointer',
  },
})
