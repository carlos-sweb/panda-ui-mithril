import { cva } from '../../styled-system/css'

// The original implementation tail shape: a soft curved wedge (not a rotated square), masked
// out of a solid background so it reads as a "connected" pointer under the bubble.
const tailMask = `url("data:image/svg+xml,%3Csvg width='10' height='4' viewBox='0 0 8 4' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0.500009 1C3.5 1 3.00001 4 5.00001 4C7 4 6.5 1 9.5 1C10 1 10 0.499897 10 0H0C-1.99338e-08 0.5 0 1 0.500009 1Z' fill='black'/%3E%3C/svg%3E%0A")`

export const tooltipStyles = cva({
  base: {
    position: 'relative',
    display: 'inline-block',
    '--tt-bg': 'token(colors.neutral)',
    // bubble sits this far from the trigger's edge
    '--tt-off': 'calc(100% + 0.5rem)',
    // tail sits flush against the trigger's edge, just under the bubble
    '--tt-tail': 'calc(100% + 1px + 0.25rem)',

    '&[data-tip]:before': {
      content: 'attr(data-tip)',
      position: 'absolute',
      maxWidth: 'token(spacing.80)',
      width: 'max-content',
      paddingInline: 'token(spacing.2)',
      paddingBlock: 'token(spacing.1)',
      textAlign: 'center',
      whiteSpace: 'normal',
      opacity: '0',
      fontSize: 'token(fontSizes.md)',
      lineHeight: '1.25',
      borderRadius: 'var(--radius-field)',
      backgroundColor: 'var(--tt-bg)',
      color: 'token(colors.neutral-content)',
      pointerEvents: 'none',
      zIndex: '2',
      transition: 'opacity 0.2s cubic-bezier(0.4, 0, 0.2, 1) 75ms, transform 0.2s cubic-bezier(0.4, 0, 0.2, 1) 75ms',
    },
    '&:after': {
      content: '""',
      position: 'absolute',
      display: 'block',
      width: 'token(spacing.2.5)',
      height: 'token(spacing.1)',
      backgroundColor: 'var(--tt-bg)',
      opacity: '0',
      pointerEvents: 'none',
      maskImage: tailMask,
      maskRepeat: 'no-repeat',
      maskPosition: '-1px 0',
      transition: 'opacity 0.2s cubic-bezier(0.4, 0, 0.2, 1) 75ms, transform 0.2s cubic-bezier(0.4, 0, 0.2, 1) 75ms',
    },
    '&.tooltip-open[data-tip]:before, &:hover[data-tip]:before, &:has(:focus-visible)[data-tip]:before': {
      opacity: '1',
    },
    '&.tooltip-open:after, &:hover:after, &:has(:focus-visible):after': {
      opacity: '1',
    },
  },
  variants: {
    position: {
      top: {
        '&[data-tip]:before': { inset: 'auto auto var(--tt-off) 50%', transform: 'translateX(-50%)' },
        '&:after': { inset: 'auto auto var(--tt-tail) 50%', transform: 'translateX(-50%)' },
      },
      bottom: {
        '&[data-tip]:before': { inset: 'var(--tt-off) auto auto 50%', transform: 'translateX(-50%)' },
        '&:after': { inset: 'var(--tt-tail) auto auto 50%', transform: 'translateX(-50%) rotate(180deg)' },
      },
      left: {
        '&[data-tip]:before': { inset: '50% var(--tt-off) auto auto', transform: 'translateY(-50%)' },
        '&:after': { inset: '50% calc(var(--tt-tail) + 1px) auto auto', transform: 'translateY(-50%) rotate(-90deg)' },
      },
      right: {
        '&[data-tip]:before': { inset: '50% auto auto var(--tt-off)', transform: 'translateY(-50%)' },
        '&:after': { inset: '50% auto auto calc(var(--tt-tail) + 1px)', transform: 'translateY(-50%) rotate(90deg)' },
      },
    },
    color: {
      neutral: { '--tt-bg': 'token(colors.neutral)', '&[data-tip]:before': { color: 'token(colors.neutral-content)' } },
      primary: { '--tt-bg': 'token(colors.primary)', '&[data-tip]:before': { color: 'token(colors.primary-content)' } },
      secondary: { '--tt-bg': 'token(colors.secondary)', '&[data-tip]:before': { color: 'token(colors.secondary-content)' } },
      accent: { '--tt-bg': 'token(colors.accent)', '&[data-tip]:before': { color: 'token(colors.accent-content)' } },
      info: { '--tt-bg': 'token(colors.info)', '&[data-tip]:before': { color: 'token(colors.info-content)' } },
      success: { '--tt-bg': 'token(colors.success)', '&[data-tip]:before': { color: 'token(colors.success-content)' } },
      warning: { '--tt-bg': 'token(colors.warning)', '&[data-tip]:before': { color: 'token(colors.warning-content)' } },
      error: { '--tt-bg': 'token(colors.error)', '&[data-tip]:before': { color: 'token(colors.error-content)' } },
    },
  },
  defaultVariants: {
    position: 'top',
  },
})
