import m from 'mithril'
import { cx } from '../../styled-system/css'

export const Aura = {
  view(vnode) {
    const { color = 'primary', size, pulse, className, children, ...rest } = vnode.attrs

    return m('div', {
      className: cx('relative inline-flex', className),
      ...rest
    }, [
      m('div', {
        className: cx(
          'rounded-full',
          size === 'sm' && 'w-8 h-8',
          size === 'md' && 'w-12 h-12',
          size === 'lg' && 'w-16 h-16',
          !size && 'w-12 h-12',
          color === 'primary' && 'bg-primary',
          color === 'secondary' && 'bg-secondary',
          color === 'accent' && 'bg-accent',
          color === 'info' && 'bg-info',
          color === 'success' && 'bg-success',
          color === 'warning' && 'bg-warning',
          color === 'error' && 'bg-error',
          color === 'neutral' && 'bg-neutral',
        ),
      }),
      pulse && m('div', {
        className: cx(
          'absolute inset-0 rounded-full animate-ping',
          color === 'primary' && 'bg-primary/30',
          color === 'secondary' && 'bg-secondary/30',
          color === 'accent' && 'bg-accent/30',
          color === 'info' && 'bg-info/30',
          color === 'success' && 'bg-success/30',
          color === 'warning' && 'bg-warning/30',
          color === 'error' && 'bg-error/30',
          color === 'neutral' && 'bg-neutral/30',
        ),
        style: 'opacity: 0.3',
      }),
      children && m('div', { className: 'absolute inset-0 flex items-center justify-center' }, children),
    ])
  }
}
