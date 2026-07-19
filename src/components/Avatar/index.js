import m from 'mithril'
import { avatarStyles } from '../../recipes/avatar'
import { cx } from '../../utils/cx'


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
