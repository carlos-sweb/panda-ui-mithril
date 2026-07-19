import m from 'mithril'
import { cva } from '../../styled-system/css'
import { cx } from '../../utils/cx'

export const badgeStyles = cva({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '1',
    fontSize: 'xs',
    lineHeight: '1',
    fontWeight: '600',
    minWidth: '1.25rem',
    height: '1.25rem',
    px: '0.5',
    rounded: 'full',
  },
  variants: {
    color: {
      neutral: { bg: 'neutral', color: 'neutral-content' },
      primary: { bg: 'primary', color: 'primary-content' },
      secondary: { bg: 'secondary', color: 'secondary-content' },
      accent: { bg: 'accent', color: 'accent-content' },
      info: { bg: 'info', color: 'info-content' },
      success: { bg: 'success', color: 'success-content' },
      warning: { bg: 'warning', color: 'warning-content' },
      error: { bg: 'error', color: 'error-content' },
    },
    variant: {
      outline: { bg: 'transparent', borderWidth: '1px', borderColor: 'currentcolor', color: 'currentColor' },
      dash: { bg: 'transparent', borderWidth: '1px', borderColor: 'currentcolor', color: 'currentColor', borderStyle: 'dashed' },
      ghost: { bg: 'base-content/10', color: 'currentColor' },
    },
    size: {
      xs: { h: '3', minW: '3', text: 'xs', px: '1' },
      sm: { h: '4', minW: '4', text: 'xs', px: '1' },
      md: { h: '5', minW: '5', text: 'sm', px: '1.5' },
      lg: { h: '6', minW: '6', text: 'sm', px: '2' },
      xl: { h: '8', minW: '8', text: 'md', px: '2.5' },
    },
  },
})

export const Badge = {
  view(vnode) {
    const { color, variant, size, className, children, ...rest } = vnode.attrs

    return m('span', {
      className: cx(
        'badge',
        badgeStyles({ color, variant, size }),
        className
      ),
      ...rest
    }, children)
  }
}
