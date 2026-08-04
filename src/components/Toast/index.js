import m from 'mithril'
import { toastStyles } from '../../recipes/toast'
import { cx } from '../../utils/cx'

const VERTICALS = ['top', 'middle', 'bottom']
const HORIZONTALS = ['start', 'center', 'end']

/**
 * Componente Toast. Contenedor `position: fixed` para notificaciones; la
 * posición se define con tokens espacio-separados ("top end", "bottom start",
 * default "bottom end"). Los hijos entran con la animación `toast`
 * (keyframes del tema, ver `keyframes.toast` en panda.config.ts).
 *
 * @type {import('mithril').Component<import('./index').ToastAttrs>}
 */
export const Toast = {
  view(vnode) {
    const { position, className, ...rest } = vnode.attrs
    const tokens = (position || '').split(/\s+/)
    const vertical = tokens.find((t) => VERTICALS.includes(t)) || 'bottom'
    const horizontal = tokens.find((t) => HORIZONTALS.includes(t)) || 'end'

    return m('div', {
      className: cx('toast', toastStyles({ vertical, horizontal }), className),
      ...rest
    }, vnode.children)
  }
}
