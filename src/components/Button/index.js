import m from 'mithril'
import { cva } from '../../styled-system/css'
import { cx } from '../../utils/cx'

export const buttonStyles = cva({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '2',
    fontWeight: '600',
    borderRadius: 'var(--btn-radius, 0.5rem)',
    cursor: 'pointer',
    border: '1px solid transparent',
    lineHeight: '1em',
    textDecoration: 'none',
    userSelect: 'none',
    flexShrink: 0,
    _disabled: { opacity: '0.5', cursor: 'not-allowed', pointerEvents: 'none' },
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
      outline: {
        bg: 'transparent',
        borderWidth: '1px',
        borderColor: 'currentcolor',
        color: 'currentColor',
      },
      dash: {
        bg: 'transparent',
        borderWidth: '1px',
        borderColor: 'currentcolor',
        color: 'currentColor',
        borderStyle: 'dashed',
      },
      soft: { bg: 'base-content/10' },
      ghost: { bg: 'transparent', color: 'currentColor', _hover: { bg: 'base-content/10' } },
      link: { bg: 'transparent', color: 'currentColor', textDecoration: 'underline', _hover: { opacity: '0.8' } },
    },
    size: {
      xs: { px: '2', minH: '1.5rem', fontSize: 'xs' },
      sm: { px: '2', minH: '2rem', fontSize: 'sm' },
      md: { px: '4', minH: '2.75rem', fontSize: 'sm' },
      lg: { px: '8', minH: '3.5rem', fontSize: 'lg' },
      xl: { px: '12', minH: '4.5rem', fontSize: 'xl' },
    },
  },
  defaultVariants: {
    color: 'neutral',
    size: 'md',
  },
})

export const Button = {
  view(vnode) {
    const { color, variant, size, active, disabled, block, wide, square, circle, shape, className, children, ...rest } = vnode.attrs
    const tag = vnode.attrs.href ? 'a' : 'button'

    return m(tag, {
      className: cx(
        'btn',
        buttonStyles({ color, variant, size }),
        active && 'btn-active',
        disabled && 'btn-disabled',
        block && 'btn-block',
        wide && 'btn-wide',
        square && 'btn-square',
        circle && 'btn-circle',
        className
      ),
      disabled: tag === 'button' ? disabled : undefined,
      ...rest
    }, children)
  }
}
