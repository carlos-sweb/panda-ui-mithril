import m from 'mithril'
import { avatar } from '../../../styled-system/recipes'
import { cx } from '../../../styled-system/css'

/**
 * Avatar component. Profile image (or placeholder) with `size`, `shape`
 * (circle/square) and `status` (online/offline).
 *
 * @type {import('mithril').Component<import('./index').AvatarAttrs>}
 */
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

/**
 * Cached result of `avatar({})` — the subcomponents pass no variants,
 * so their classes are deterministic. Avoids calling the sva on every render.
 * @type {ReturnType<typeof avatar>}
 */
const defaultStyles = avatar({})

/**
 * Group of overlapping avatars with overlap between them.
 *
 * @type {import('mithril').Component<import('./index').AvatarGroupAttrs>}
 */
export const AvatarGroup = {
  view(vnode) {
    const { className, ...rest } = vnode.attrs

    return m('div', {
      className: cx('avatar-group', defaultStyles.group, className),
      ...rest
    }, vnode.children)
  }
}
