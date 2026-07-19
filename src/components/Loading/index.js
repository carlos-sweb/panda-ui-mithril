import m from 'mithril'
import { cva } from '../../../styled-system/css'
import { cx } from '../../utils/cx'

const loadingStyles = cva({
  base: {
    display: 'inline-block',
    color: 'currentColor',
  },
  variants: {
    variant: {
      spinner: {
        w: '8',
        h: '8',
        border: '3px solid currentColor',
        borderColor: 'transparent',
        rounded: 'full',
        animation: 'spin 1s linear infinite',
      },
      dots: {
        display: 'inline-flex',
        gap: '0.25em',
        _before: { content: '""', display: 'block', w: '0.5em', h: '0.5em', rounded: 'full', bg: 'currentColor', animation: 'pulse 1.5s ease-in-out infinite' },
        _after: { content: '""', display: 'block', w: '0.5em', h: '0.5em', rounded: 'full', bg: 'currentColor', animation: 'pulse 1.5s ease-in-out 0.25s infinite' },
      },
      ring: {
        w: '8',
        h: '8',
        border: '3px solid currentColor',
        borderColor: 'currentcolor currentcolor transparent transparent',
        rounded: 'full',
        animation: 'spin 1.2s linear infinite',
      },
      ball: {
        w: '8',
        h: '8',
        bg: 'currentColor',
        rounded: 'full',
        animation: 'pulse 1s ease-in-out infinite',
      },
      bars: {
        display: 'inline-flex',
        gap: '0.125em',
        h: '8',
        alignItems: 'end',
        _before: { content: '""', display: 'block', w: '0.25em', bg: 'currentColor', h: '40%', animation: 'pulse 1s ease-in-out infinite' },
        _after: { content: '""', display: 'block', w: '0.25em', bg: 'currentColor', h: '70%', animation: 'pulse 1s ease-in-out 0.15s infinite' },
      },
      infinity: {
        w: '8',
        h: '4',
        bg: 'currentColor',
        rounded: 'full',
        position: 'relative',
        _before: {
          content: '""',
          position: 'absolute',
          inset: '0',
          borderRadius: 'inherit',
          bg: 'currentColor',
          animation: 'pulse 1.5s ease-in-out infinite',
        },
      },
    },
    size: {
      xs: { w: '4', h: '4' },
      sm: { w: '6', h: '6' },
      md: { w: '8', h: '8' },
      lg: { w: '12', h: '12' },
      xl: { w: '16', h: '16' },
    },
  },
})

export const Loading = {
  view(vnode) {
    const { variant = 'spinner', size, className, ...rest } = vnode.attrs

    return m('span', {
      className: cx(
        'loading',
        loadingStyles({ variant, size }),
        variant !== 'spinner' && variant !== 'ring' && variant !== 'ball' && variant !== 'infinity' && `loading-${variant}`,
        className
      ),
      ...rest
    })
  }
}
