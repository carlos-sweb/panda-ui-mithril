import m from 'mithril'
import { ChatBubblePUM } from '../../../styled-system/recipes'
import { cx } from '../../utils/cx'

/**
 * Componente Chat. Contenedor del hilo de conversación: agrupa el avatar,
 * cabecera, burbuja y pie en una rejilla. `placement` alinea el bloque a la
 * izquierda (start) o derecha (end).
 *
 * @type {import('mithril').Component<import('./index').ChatAttrs>}
 */
export const Chat = {
  view(vnode) {
    const { placement, className, ...rest } = vnode.attrs

    return m('div', {
      className: cx('chat', `chat-${placement || 'start'}`, ChatBubble({ placement }).chat, className),
      ...rest
    }, vnode.children)
  }
}

/**
 * Componente ChatImage. Avatar del participante que envía el mensaje.
 *
 * @type {import('mithril').Component<import('./index').ChatImageAttrs>}
 */
export const ChatImage = {
  view(vnode) {
    const { className, ...rest } = vnode.attrs
    return m('div', { className: cx('chat-image', className), ...rest }, vnode.children)
  }
}

/**
 * Componente ChatHeader. Cabecera del mensaje (nombre, hora, ...).
 *
 * @type {import('mithril').Component<import('./index').ChatHeaderAttrs>}
 */
export const ChatHeader = {
  view(vnode) {
    const { className, ...rest } = vnode.attrs
    return m('div', { className: cx('chat-header', className), ...rest }, vnode.children)
  }
}

/**
 * Componente ChatBubble. Burbuja con el contenido del mensaje; `color`
 * cambia el fondo y el color de texto (neutral, primary, success, ...).
 *
 * @type {import('mithril').Component<import('./index').ChatBubbleAttrs>}
 */
export const ChatBubble = {
  view(vnode) {
    const { color, className, ...rest } = vnode.attrs

    return m('div', {
      className: cx('chat-bubble', chat({ color }).bubble, className),
      ...rest
    }, vnode.children)
  }
}

/**
 * Componente ChatFooter. Pie del mensaje (hora de lectura, estado, ...).
 *
 * @type {import('mithril').Component<import('./index').ChatFooterAttrs>}
 */
export const ChatFooter = {
  view(vnode) {
    const { className, ...rest } = vnode.attrs
    return m('div', { className: cx('chat-footer', className), ...rest }, vnode.children)
  }
}
