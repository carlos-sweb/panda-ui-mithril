import m from 'mithril'
import { chat } from '../../recipes/chatBubble'
import { cx } from '../../utils/cx'

export const Chat = {
  view(vnode) {
    const { placement, className, ...rest } = vnode.attrs

    return m('div', {
      className: cx('chat', `chat-${placement || 'start'}`, chat({ placement }).chat, className),
      ...rest
    }, vnode.children)
  }
}

export const ChatImage = {
  view(vnode) {
    const { className, ...rest } = vnode.attrs
    return m('div', { className: cx('chat-image', className), ...rest }, vnode.children)
  }
}

export const ChatHeader = {
  view(vnode) {
    const { className, ...rest } = vnode.attrs
    return m('div', { className: cx('chat-header', className), ...rest }, vnode.children)
  }
}

export const ChatBubble = {
  view(vnode) {
    const { color, className, ...rest } = vnode.attrs

    return m('div', {
      className: cx('chat-bubble', chat({ color }).bubble, className),
      ...rest
    }, vnode.children)
  }
}

export const ChatFooter = {
  view(vnode) {
    const { className, ...rest } = vnode.attrs
    return m('div', { className: cx('chat-footer', className), ...rest }, vnode.children)
  }
}
