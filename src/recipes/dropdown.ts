import { defineSlotRecipe } from '@pandacss/dev'

export const dropdownRecipe = defineSlotRecipe({
  className: 'dropdown',
  slots: ['dropdown', 'trigger', 'content'],
  base: {
    dropdown: {
      position: 'relative',
      display: 'inline-block',
    },
    trigger: {},
    content: {
      position: 'absolute',
      zIndex: '20',
      // max-content: the panel always takes the natural width of its content,
      // without being squeezed by the containing block's "available space" (an
      // inline-block root). With `width` (xs..xl) an explicit width is set that
      // overrides this value. 90vw is only a safety cap on mobile.
      width: 'max-content',
      maxWidth: '90vw',
      padding: 'token(spacing.2)',
      borderWidth: 'var(--border, 1px)',
      borderStyle: 'solid',
      borderColor: 'base-300',
      borderRadius: 'var(--radius-box)',
      backgroundColor: 'base-100',
      boxShadow: '0 10px 25px color-mix(in oklab, black 20%, transparent)',
      opacity: '0',
      visibility: 'hidden',
      // The individual translate/scale properties add to `transform`
      // (used only for placement centering), without overriding each other.
      translate: '0 -0.5rem',
      scale: '0.98',
      pointerEvents: 'none',
      transitionProperty: 'opacity, translate, scale, visibility',
      transitionDuration: '0.2s',
      transitionTimingFunction: 'ease-out',
    },
  },
  variants: {
    // The panel is positioned relative to the trigger. The axis (bottom/top/left/right)
    // is the opening direction; the alignment (start/center/end) adjusts the
    // other axis. Default: bottom aligned to the start (trigger's left edge).
    placement: {
      'bottom-start': { content: { top: 'calc(100% + var(--dropdown-offset, 0.5rem))', insetInlineStart: '0' } },
      'bottom-center': { content: { top: 'calc(100% + var(--dropdown-offset, 0.5rem))', insetInlineStart: '50%', transform: 'translateX(-50%)' } },
      'bottom-end': { content: { top: 'calc(100% + var(--dropdown-offset, 0.5rem))', insetInlineEnd: '0' } },
      'top-start': { content: { bottom: 'calc(100% + var(--dropdown-offset, 0.5rem))', insetInlineStart: '0' } },
      'top-center': { content: { bottom: 'calc(100% + var(--dropdown-offset, 0.5rem))', insetInlineStart: '50%', transform: 'translateX(-50%)' } },
      'top-end': { content: { bottom: 'calc(100% + var(--dropdown-offset, 0.5rem))', insetInlineEnd: '0' } },
      'left-start': { content: { insetInlineEnd: 'calc(100% + var(--dropdown-offset, 0.5rem))', top: '0' } },
      'left-center': { content: { insetInlineEnd: 'calc(100% + var(--dropdown-offset, 0.5rem))', top: '50%', transform: 'translateY(-50%)' } },
      'left-end': { content: { insetInlineEnd: 'calc(100% + var(--dropdown-offset, 0.5rem))', bottom: '0' } },
      'right-start': { content: { insetInlineStart: 'calc(100% + var(--dropdown-offset, 0.5rem))', top: '0' } },
      'right-center': { content: { insetInlineStart: 'calc(100% + var(--dropdown-offset, 0.5rem))', top: '50%', transform: 'translateY(-50%)' } },
      'right-end': { content: { insetInlineStart: 'calc(100% + var(--dropdown-offset, 0.5rem))', bottom: '0' } },
    },
    // Open: the panel becomes visible. The class is applied to the `dropdown`
    // slot (`.dropdown-open`), which shows the content with the DIRECT CHILD
    // selector (`>`): a dropdown nested inside another open one must not "turn on"
    // its own content (the mode menu inside ColorPicker, for example).
    open: {
      true: {
        dropdown: {
          '& > .dropdown-content': {
            opacity: '1',
            visibility: 'visible',
            translate: '0 0',
            scale: '1',
            pointerEvents: 'auto',
          },
        },
      },
    },
    // Gap between the panel and the trigger (--dropdown-offset).
    offset: {
      xs: { dropdown: { '--dropdown-offset': 'token(spacing.1)' } },
      sm: { dropdown: { '--dropdown-offset': 'token(spacing.2)' } },
      md: { dropdown: { '--dropdown-offset': 'token(spacing.3)' } },
      lg: { dropdown: { '--dropdown-offset': 'token(spacing.4)' } },
      xl: { dropdown: { '--dropdown-offset': 'token(spacing.5)' } },
    },
    // Panel width. Without `width` the panel fits the content and the inner
    // menu keeps its natural width (fit-content, no text clipping);
    // with xs..xl an explicit width is set (12rem..20rem) and the menu fills
    // the panel with its items stretched (alignItems: stretch from the Menu recipe).
    width: {
      xs: { content: { width: 'token(spacing.48)', '& > .menu': { width: '100%' } } },
      sm: { content: { width: 'token(spacing.56)', '& > .menu': { width: '100%' } } },
      md: { content: { width: 'token(spacing.64)', '& > .menu': { width: '100%' } } },
      lg: { content: { width: 'token(spacing.72)', '& > .menu': { width: '100%' } } },
      xl: { content: { width: 'token(spacing.80)', '& > .menu': { width: '100%' } } },
    },
  },
  defaultVariants: {
    placement: 'bottom-start',
    offset: 'sm',
  },
})
