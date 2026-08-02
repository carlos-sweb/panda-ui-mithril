import m from 'mithril'
import { avatarStyles, avatarGroupStyles } from '../../recipes/avatar'
import { cx } from '../../utils/cx'


export const Avatar = {
  view(vnode) {
    const { size, shape, placeholder, src, alt, status, className, ...rest } = vnode.attrs

    return m('div', {
      className: cx('avatar', avatarStyles({ size, shape, placeholder, status }), className),
      ...rest
    }, [
      m('div', src ? m('img', { src, alt: alt || '' }) : vnode.children),
    ])
  }
}

export const AvatarGroup = {
  view(vnode) {
    const { className, ...rest } = vnode.attrs

    return m('div', {
      className: cx('avatar-group', avatarGroupStyles(), className),
      ...rest
    }, vnode.children)
  }
}
