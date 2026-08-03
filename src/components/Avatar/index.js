import m from 'mithril'
import { avatar } from '../../recipes/avatar'
import { cx } from '../../utils/cx'


export const Avatar = {
  view(vnode) {
    const { size, shape, placeholder, src, alt, status, className, ...rest } = vnode.attrs

    return m('div', {
      className: cx('avatar', avatar({ size, shape, placeholder, status }).avatar, className),
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
      className: cx('avatar-group', avatar({}).group, className),
      ...rest
    }, vnode.children)
  }
}
