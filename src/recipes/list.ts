import { defineSlotRecipe } from '@pandacss/dev'

export const listRecipe = defineSlotRecipe({
  className : 'list',
  slots: ['list', 'row', 'col'],
  base: {
    list: {
      display: 'flex',
      flexDirection: 'column',
      fontSize: 'token(fontSizes.md)',

      '& > li:not(:last-child)': {
        position: 'relative',
        '&:after': {
          content: '""',
          position: 'absolute',
          // Separator across the full width of the list. It used to use
          // insetInline: var(--radius-box), which left 8px without a border on each
          // side and made each row look like a separate pill.
          insetInline: '0',
          bottom: '0',
          borderBottom: 'var(--border, 1px) solid color-mix(in oklab, token(colors.base-content) 5%, transparent)',
        },
      },

      // Sortable mode (wraps SortableJS, see src/components/List/sortable.js):
      // SortableJS applies ghost/chosen/drag to the row during the drag and the
      // bridge marks the <ul> with list-sort-whole (whole row) or
      // list-sort-handle (only from the ListDragHandle grip).
      '& .list-sort-ghost': {
        opacity: '0.35',
      },
      '& .list-sort-chosen': {
        backgroundColor: 'base-200',
      },
      '&.list-sort-whole > li': {
        cursor: 'grab',
      },
      // During the drag the cursor must keep saying "dragging" even if
      // the pointer leaves the grip or the row: SortableJS sets these classes
      // (chosen = source row, ghost = gap, drag = clone in fallback).
      '& .list-sort-chosen, & .list-sort-ghost, & .list-sort-drag': {
        cursor: 'grabbing',
        userSelect: 'none',
      },
      // The grip only promises dragging when sortable mode is active: the
      // bridge marks the <ul> with list-sort-whole (whole row) or
      // list-sort-handle (grip only). Without `sortable` it is a static grip and
      // showing the hand would be a lie.
      '&.list-sort-whole .list-drag-handle, &.list-sort-handle .list-drag-handle': {
        cursor: 'grab',
        '&:active': { cursor: 'grabbing' },
      },
      '& .list-drag-handle': {
        display: 'inline-flex',
        alignItems: 'center',
        color: 'color-mix(in oklab, token(colors.base-content) 45%, transparent)',
        // Crucial for touch: the drag gesture must not scroll.
        touchAction: 'none',
        // Without this, dragging from the grip selects the row's text.
        userSelect: 'none',
      },
    },
    row: {
      '--list-grid-cols': 'minmax(0, auto) 1fr',
      position: 'relative',
      display: 'grid',
      gridAutoFlow: 'column',
      gridTemplateColumns: 'var(--list-grid-cols)',
      gap: 'token(spacing.4)',
      padding: 'token(spacing.4)',
      wordBreak: 'break-word',
      '& > *': { gridRowStart: '1' },

      // TODO fix: the radius goes only on the list's visual edges
      // (first and last row), not on every row — before, hovering an
      // intermediate row showed rounded corners floating between
      // straight separators. `:only-child` gets both (all corners).
      '&:first-child': {
        borderStartStartRadius: 'var(--radius-box)',
        borderStartEndRadius: 'var(--radius-box)',
      },
      '&:last-child': {
        borderEndStartRadius: 'var(--radius-box)',
        borderEndEndRadius: 'var(--radius-box)',
      },

      '&:has(.list-col-grow:nth-child(1))': { '--list-grid-cols': '1fr' },
      '&:has(.list-col-grow:nth-child(2))': { '--list-grid-cols': 'minmax(0, auto) 1fr' },
      '&:has(.list-col-grow:nth-child(3))': { '--list-grid-cols': 'minmax(0, auto) minmax(0, auto) 1fr' },
      '&:has(.list-col-grow:nth-child(4))': { '--list-grid-cols': 'minmax(0, auto) minmax(0, auto) minmax(0, auto) 1fr' },
      '&:has(.list-col-grow:nth-child(5))': { '--list-grid-cols': 'minmax(0, auto) minmax(0, auto) minmax(0, auto) minmax(0, auto) 1fr' },
      '&:has(.list-col-grow:nth-child(6))': { '--list-grid-cols': 'minmax(0, auto) minmax(0, auto) minmax(0, auto) minmax(0, auto) minmax(0, auto) 1fr' },

      // Skeleton rows (loading): the base Skeleton is a block with no dimension;
      // the loading row sizes it like a line of text (1em tall,
      // subtle rounding) so the placeholder is visible. The grid is fixed
      // here (1fr + 4.5rem) and each skeleton fills its column; the loading
      // rows do not use `grow` so as not to trigger the `:has(...)` rules of
      // higher specificity that would redefine --list-grid-cols.
      '&.list-row-loading': {
        '--list-grid-cols': 'minmax(0, 1fr) minmax(0, 4.5rem)',
        '& .skeleton': {
          height: '1em',
          width: '100%',
          borderRadius: '0.25em',
        },
      },
    },
    col: {},
  },
  variants: {
    hover: {
      true: {
        row: {
          '&:hover': { backgroundColor: 'base-200' },
        },
      },
    },
    wrap: {
      true: {
        col: { gridRowStart: '2' },
      },
    },
  },
})
