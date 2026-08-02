import m from 'mithril'
import { css } from '../../styled-system/css'
import { Chat, ChatBubble, ChatHeader, ChatFooter, ChatImage, Avatar } from '../../src/index.js'
import { CodeExample } from '../components/CodeExample.jsx'
import { ClassTable } from '../components/ClassTable.jsx'

const stack = css({ display: 'flex', flexDirection: 'column', gap: '1.5rem' })
const sectionTitle = css({ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem', marginTop: '2rem' })

const usageCode = `<Chat placement="start">
  <ChatImage><Avatar src="..." /></ChatImage>
  <ChatHeader>John</ChatHeader>
  <ChatBubble>Hey! How are you?</ChatBubble>
  <ChatFooter>Just now</ChatFooter>
</Chat>
<Chat placement="end">
  <ChatBubble color="primary">I am good, thanks!</ChatBubble>
  <ChatFooter>2 minutes ago</ChatFooter>
</Chat>`

const classRows = [
  { className: 'chat', prop: '<Chat placement="...">', type: 'Component', description: 'Chat container' },
  { className: 'chat-image', prop: '<ChatImage>', type: 'Part', description: 'Container for an avatar image' },
  { className: 'chat-header', prop: '<ChatHeader>', type: 'Part', description: 'Header for the chat bubble' },
  { className: 'chat-bubble', prop: '<ChatBubble color="...">', type: 'Component', description: 'The chat bubble itself' },
  { className: 'chat-footer', prop: '<ChatFooter>', type: 'Part', description: 'Footer for the chat bubble' },
  { className: 'chat-start', prop: 'placement="start" (default)', type: 'Placement', description: 'Puts the chat bubble on the start (left)', isDefault: true },
  { className: 'chat-end', prop: 'placement="end"', type: 'Placement', description: 'Puts the chat bubble on the end (right)' },
  { className: 'chat-bubble-neutral', prop: 'color="neutral"', type: 'Color', description: 'neutral color' },
  { className: 'chat-bubble-primary', prop: 'color="primary"', type: 'Color', description: 'primary color' },
  { className: 'chat-bubble-secondary', prop: 'color="secondary"', type: 'Color', description: 'secondary color' },
  { className: 'chat-bubble-accent', prop: 'color="accent"', type: 'Color', description: 'accent color' },
  { className: 'chat-bubble-info', prop: 'color="info"', type: 'Color', description: 'info color' },
  { className: 'chat-bubble-success', prop: 'color="success"', type: 'Color', description: 'success color' },
  { className: 'chat-bubble-warning', prop: 'color="warning"', type: 'Color', description: 'warning color' },
  { className: 'chat-bubble-error', prop: 'color="error"', type: 'Color', description: 'error color' },
]

export default {
  name: 'Chat',
  category: 'Data Display',
  description: 'Chat bubble component for displaying message conversations.',

  view() {
    return (
      <div className={stack}>
        <h1 className={css({ fontSize: '2rem', fontWeight: '700', marginBottom: '0.5rem' })}>Chat</h1>
        <p className={css({ opacity: 0.6, marginBottom: '2rem', maxWidth: '600px' })}>
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

        <section>
          <h2 className={sectionTitle}>Usage</h2>
          <CodeExample code={usageCode} />
        </section>

        <section>
          <h2 className={sectionTitle}>Class Reference</h2>
          <ClassTable rows={classRows} />
        </section>
      </div>
    )
  }
}
