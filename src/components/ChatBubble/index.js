import m from 'mithril'
import { ChatBubblePUM } from '../../../styled-system/recipes'
import { cx } from '../../../styled-system/css'

/**
 * Chat component. Conversation thread container: groups the avatar,
 * header, bubble and footer in a grid. `placement` aligns the block to the
 * left (start) or right (end).
 *
 * @type {import('mithril').Component<import('./index').ChatAttrs>}
 */
export const Chat = {
  view(vnode) {
    const { placement, className, ...rest } = vnode.attrs

    return m('div', {
      className: cx('chat', `chat-${placement || 'start'}`, ChatBubblePUM({ placement }).chat, className),
      ...rest
    }, vnode.children)
  }
}

/**
 * ChatImage component. Avatar of the participant who sends the message.
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
 * ChatHeader component. Message header (name, time, ...).
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
 * ChatBubble component. Bubble with the message content; `color`
 * changes the background and the text color (neutral, primary, success, ...).
 *
 * @type {import('mithril').Component<import('./index').ChatBubbleAttrs>}
 */
export const ChatBubble = {
  view(vnode) {
    const { color, className, ...rest } = vnode.attrs

    return m('div', {
      className: cx('chat-bubble', ChatBubblePUM({ color }).bubble, className),
      ...rest
    }, vnode.children)
  }
}

/**
 * ChatFooter component. Message footer (read time, status, ...).
 *
 * @type {import('mithril').Component<import('./index').ChatFooterAttrs>}
 */
export const ChatFooter = {
  view(vnode) {
    const { className, ...rest } = vnode.attrs
    return m('div', { className: cx('chat-footer', className), ...rest }, vnode.children)
  }
}

/**
 * ChatReply component. Quote/reply to a previous message.
 *
 * @type {import('mithril').Component<import('./index').ChatReplyAttrs>}
 */
export const ChatReply = {
  view(vnode) {
    const { name, text, className, ...rest } = vnode.attrs

    return m('div', {
      className: cx('chat-reply', className),
      ...rest
    }, [
      m('div', { className: 'chat-reply-name' }, name),
      m('div', { className: 'chat-reply-text' }, text)
    ])
  }
}

/**
 * ChatStatus component. Message status indicator (sent, delivered, read).
 *
 * @type {import('mithril').Component<import('./index').ChatStatusAttrs>}
 */
export const ChatStatus = {
  view(vnode) {
    const { status, className, ...rest } = vnode.attrs

    const icons = {
      sent: '✓',
      delivered: '✓✓',
      read: '✓✓'
    }

    return m('span', {
      className: cx('chat-status', `chat-status-${status || 'sent'}`, className),
      'data-status': status || 'sent',
      ...rest
    }, icons[status || 'sent'])
  }
}

/**
 * ChatReactions component. Shows emoji reactions on a message.
 *
 * @type {import('mithril').Component<import('./index').ChatReactionsAttrs>}
 */
export const ChatReactions = {
  view(vnode) {
    const { reactions, onReact, className, ...rest } = vnode.attrs

    return m('div', {
      className: cx('chat-reactions', className),
      ...rest
    }, (reactions || []).map(r =>
      m('button', {
        key: r.emoji,
        className: cx('chat-reaction', r.reacted && 'chat-reaction-reacted'),
        onclick: () => onReact && onReact(r.emoji),
        type: 'button'
      }, [
        m('span', { className: 'chat-reaction-emoji' }, r.emoji),
        r.count > 0 && m('span', { className: 'chat-reaction-count' }, r.count)
      ])
    ))
  }
}

/**
 * ChatMessage component. Full message with name, bubble, timestamp and status.
 *
 * @type {import('mithril').Component<import('./index').ChatMessageAttrs>}
 */
export const ChatMessage = {
  view(vnode) {
    const { placement, name, time, status, reply, reactions, color, size, className, ...rest } = vnode.attrs

    const dataAttrs = {}
    if (placement) dataAttrs['data-placement'] = placement

    return m('div', {
      className: cx('chat-message', className),
      ...dataAttrs,
      ...rest
    }, [
      reply && m(ChatReply, { name: reply.name, text: reply.text }),
      // Children live in vnode.children (never in vnode.attrs.children):
      // message text or sub-components (ChatAudio, ChatImageMessage,
      // ChatLink, ...) are rendered inside the bubble.
      m(ChatBubble, { color, size }, vnode.children),
      reactions && m(ChatReactions, { reactions }),
      (time || status) && m('div', { className: 'chat-message-meta' }, [
        time && m('span', { className: 'chat-message-time' }, time),
        status && m(ChatStatus, { status })
      ])
    ])
  }
}

/**
 * ChatAudio component. Audio player for voice messages.
 *
 * @type {import('mithril').Component<import('./index').ChatAudioAttrs>}
 */
export const ChatAudio = {
  view(vnode) {
    const { src, duration, className, ...rest } = vnode.attrs

    return m('div', {
      className: cx('chat-audio', className),
      ...rest
    }, [
      m('audio', { controls: true, preload: 'metadata' }, [
        m('source', { src, type: 'audio/mpeg' })
      ]),
      duration && m('span', { className: 'chat-audio-duration' }, duration)
    ])
  }
}

/**
 * ChatVideo component. Inline video player.
 *
 * @type {import('mithril').Component<import('./index').ChatVideoAttrs>}
 */
export const ChatVideo = {
  view(vnode) {
    const { src, poster, className, ...rest } = vnode.attrs

    return m('div', {
      className: cx('chat-video', className),
      ...rest
    }, [
      m('video', {
        controls: true,
        preload: 'metadata',
        poster,
        playsinline: true
      }, [
        m('source', { src, type: 'video/mp4' })
      ])
    ])
  }
}

/**
 * ChatImageMessage component. Message with an image and optional caption.
 *
 * @type {import('mithril').Component<import('./index').ChatImageMessageAttrs>}
 */
export const ChatImageMessage = {
  view(vnode) {
    const { src, alt, caption, className, ...rest } = vnode.attrs

    return m('figure', {
      className: cx('chat-image', className),
      ...rest
    }, [
      m('img', { src, alt: alt || '' }),
      caption && m('figcaption', null, caption)
    ])
  }
}

/**
 * ChatFile component. Attached file with icon, name and size.
 *
 * @type {import('mithril').Component<import('./index').ChatFileAttrs>}
 */
export const ChatFile = {
  view(vnode) {
    const { filename, href, size, icon, className, ...rest } = vnode.attrs

    const Tag = href ? 'a' : 'div'
    const linkProps = href ? { href, target: '_blank', rel: 'noopener noreferrer' } : {}

    return m(Tag, {
      className: cx('chat-file', className),
      ...linkProps,
      ...rest
    }, [
      m('div', { className: 'chat-file-icon' }, icon || '📄'),
      m('div', { className: 'chat-file-info' }, [
        m('span', { className: 'chat-file-name' }, filename),
        size && m('span', { className: 'chat-file-size' }, size)
      ])
    ])
  }
}

/**
 * ChatLink component. Link with preview (title, description, image).
 *
 * @type {import('mithril').Component<import('./index').ChatLinkAttrs>}
 */
export const ChatLink = {
  view(vnode) {
    const { href, title, description, image, className, ...rest } = vnode.attrs

    return m('a', {
      className: cx('chat-link', className),
      href,
      target: '_blank',
      rel: 'noopener noreferrer',
      ...rest
    }, [
      image && m('img', { src: image, alt: title || '' }),
      m('div', { className: 'chat-link-content' }, [
        title && m('span', { className: 'chat-link-title' }, title),
        description && m('span', { className: 'chat-link-description' }, description)
      ])
    ])
  }
}

/**
 * ChatSystem component. System messages (date, "X joined", etc.).
 *
 * @type {import('mithril').Component<import('./index').ChatSystemAttrs>}
 */
export const ChatSystem = {
  view(vnode) {
    const { type, className, ...rest } = vnode.attrs

    return m('div', {
      className: cx('chat-system', className),
      'data-type': type || 'info',
      ...rest
    }, vnode.children)
  }
}

/**
 * ChatInput component. Message input area with attach and emoji buttons.
 *
 * @type {import('mithril').Component<import('./index').ChatInputAttrs>}
 */
export const ChatInput = {
  view(vnode) {
    const { placeholder, onSend, onAttach, onEmoji, className, ...rest } = vnode.attrs

    let inputValue = ''

    const handleKeydown = (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault()
        if (inputValue.trim() && onSend) {
          onSend(inputValue.trim())
          inputValue = ''
        }
      }
    }

    const handleInput = (e) => {
      inputValue = e.target.value
    }

    return m('div', {
      className: cx('chat-input', className),
      ...rest
    }, [
      onEmoji && m('button', {
        className: 'chat-input-emoji',
        type: 'button',
        onclick: onEmoji,
        'aria-label': 'Emoji'
      }, '😊'),
      m('input', {
        type: 'text',
        placeholder: placeholder || 'Type a message...',
        onkeydown: handleKeydown,
        oninput: handleInput
      }),
      onAttach && m('button', {
        className: 'chat-input-attach',
        type: 'button',
        onclick: onAttach,
        'aria-label': 'Attach file'
      }, '📎'),
      m('button', {
        className: 'chat-input-send',
        type: 'button',
        onclick: () => {
          if (inputValue.trim() && onSend) {
            onSend(inputValue.trim())
            inputValue = ''
          }
        }
      }, '➤')
    ])
  }
}

/**
 * ChatTyping component. "typing..." indicator with animation.
 *
 * @type {import('mithril').Component<import('./index').ChatTypingAttrs>}
 */
export const ChatTyping = {
  view(vnode) {
    const { name, className, ...rest } = vnode.attrs

    return m('div', {
      className: cx('chat-typing', className),
      ...rest
    }, [
      m('span', { className: 'chat-typing-name' }, name || 'Someone'),
      m('span', null, ' is typing'),
      m('span', { className: 'chat-typing-dots' }, '...')
    ])
  }
}

/**
 * ChatEmoji component. Emoji picker with a grid of options.
 *
 * @type {import('mithril').Component<import('./index').ChatEmojiAttrs>}
 */
export const ChatEmoji = {
  view(vnode) {
    const { onSelect, className, ...rest } = vnode.attrs

    const emojis = [
      '😀', '😂', '🥹', '😍', '🥰', '😎', '🤔', '😮',
      '😢', '😡', '👍', '👎', '❤️', '🔥', '✨', '🎉',
      '👋', '🙏', '💪', '🤝', '👏', '🙌', '💯', '⭐'
    ]

    return m('div', {
      className: cx('chat-emoji', className),
      ...rest
    }, emojis.map(emoji =>
      m('button', {
        className: 'chat-emoji-item',
        type: 'button',
        onclick: () => onSelect && onSelect(emoji),
        key: emoji
      }, emoji)
    ))
  }
}

/**
 * ChatWindow component. Main container with a fixed header, scrollable message area and fixed footer.
 *
 * @type {import('mithril').Component<import('./index').ChatWindowAttrs>}
 */
export const ChatWindow = {
  view(vnode) {
    const { className, ...rest } = vnode.attrs

    return m('div', {
      className: cx('chat-window', className),
      ...rest
    }, vnode.children)
  }
}
