import m from 'mithril'
import { css } from '../../styled-system/css'
import { Chat, ChatBubble, ChatHeader, ChatFooter, ChatImage, Avatar } from '../../src/index.js'

const stack = css({ display: 'flex', flexDirection: 'column', gap: '1.5rem' })

export default {
  name: 'Chat',
  category: 'Data Display',
  description: 'Chat bubble component for displaying message conversations.',

  view() {
    return (
      <div className={stack}>
        <h1 style={css({ fontSize: '2rem', fontWeight: '700', marginBottom: '0.5rem' })}>Chat</h1>
        <p style={css({ opacity: 0.6, marginBottom: '2rem', maxWidth: '600px' })}>
          Chat bubble component for displaying message conversations.
        </p>

        <Chat placement="start">
          <ChatImage><Avatar src="https://i.pravatar.cc/150?u=1" /></ChatImage>
          <ChatHeader>John</ChatHeader>
          <ChatBubble>Hey! How are you?</ChatBubble>
          <ChatFooter>Just now</ChatFooter>
        </Chat>
        <Chat placement="end">
          <ChatBubble color="primary">I am good, thanks!</ChatBubble>
          <ChatFooter>2 minutes ago</ChatFooter>
        </Chat>
      </div>
    )
  }
}
