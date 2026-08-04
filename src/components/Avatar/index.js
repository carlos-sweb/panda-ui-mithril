import m from 'mithril'
import { avatar } from '../../recipes/avatar'
import { cx } from '../../utils/cx'

/**
 * Componente Avatar. Imagen de perfil (o placeholder) con `size`, `shape`
 * (circle/square) y `status` (online/offline).
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
 * Resultado cacheado de `avatar({})` — los subcomponentes no pasan variantes,
 * así que sus clases son determinísticas. Evita llamar al sva en cada render.
 * @type {ReturnType<typeof avatar>}
 */
const defaultStyles = avatar({})

/**
 * Grupo de avatares superpuestos con solapamiento entre ellos.
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
