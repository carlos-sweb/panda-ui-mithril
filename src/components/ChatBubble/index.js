import m from 'mithril'
import { cx } from '../../../styled-system/css'

export const Chat = {
  view(vnode) {
    const { placement, className, children, ...rest } = vnode.attrs

    return m('div', {
      className: cx(
        'chat',
        placement && `chat-${placement}`,
        className
      ),
      ...rest
    }, children)
  }
}

export const ChatImage = {
  view(vnode) {
    const { className, children, ...rest } = vnode.attrs
    return m('div', { className: cx('chat-image', className), ...rest }, children)
  }
}

export const ChatHeader = {
  view(vnode) {
    const { className, children, ...rest } = vnode.attrs
    return m('div', { className: cx('chat-header', className), ...rest }, children)
  }
}

export const ChatBubble = {
  view(vnode) {
    const { color, className, children, ...rest } = vnode.attrs

    return m('div', {
      className: cx(
        'chat-bubble',
        color && `chat-bubble-${color}`,
        className
      ),
      ...rest
    }, children)
  }
}

export const ChatFooter = {
  view(vnode) {
    const { className, children, ...rest } = vnode.attrs
    return m('div', { className: cx('chat-footer', className), ...rest }, children)
  }
}
