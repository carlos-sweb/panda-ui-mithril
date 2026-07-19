import m from 'mithril'
import { cva } from '../../../styled-system/css'
import { cx } from '../../utils/cx'

const avatarStyles = cva({
  base: {
    display: 'inline-flex',
    position: 'relative',
    w: '12',
    h: '12',
    overflow: 'hidden',
    rounded: 'full',
  },
  variants: {
    size: {
      xs: { w: '8', h: '8' },
      sm: { w: '10', h: '10' },
      md: { w: '12', h: '12' },
      lg: { w: '16', h: '16' },
      xl: { w: '20', h: '20' },
    },
    placeholder: {
      true: {
        bg: 'neutral',
        color: 'neutral-content',
        fontWeight: 'bold',
        fontSize: 'xl',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
    },
  },
})

export const Avatar = {
  view(vnode) {
    const { size, placeholder, src, alt, status, className, children, ...rest } = vnode.attrs

    return m('div', {
      className: cx(
        'avatar',
        avatarStyles({ size, placeholder }),
        status && `avatar-${status}`,
        className
      ),
      ...rest
    }, [
      src ? m('img', { src, alt: alt || '' }) : children,
      status && m('span', {
        className: cx(
          'absolute bottom-0 right-0 w-3 h-3 border-2 border-base-100 rounded-full',
          status === 'online' && 'bg-success',
          status === 'offline' && 'bg-base-300',
        ),
        style: 'bottom: 0; right: 0;'
      }),
    ])
  }
}

export const AvatarGroup = {
  view(vnode) {
    const { className, children, ...rest } = vnode.attrs

    return m('div', {
      className: cx('avatar-group', className),
      ...rest
    }, children)
  }
}
