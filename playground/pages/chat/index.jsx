import m from 'mithril'
import { css } from '../../../styled-system/css'
import { t, loadPageI18n } from '../../i18n/index.js'
import {
  Stack, Title, Text, Block, Divider,
  Chat, ChatImage, ChatHeader, ChatBubble, ChatFooter,
  ChatWindow, ChatMessage, ChatReply, ChatReactions, ChatStatus,
  ChatAudio, ChatVideo, ChatImageMessage, ChatFile, ChatLink,
  ChatSystem, ChatInput, ChatTyping, ChatEmoji,
  Avatar, Button, Badge
} from '../../../src/index.js'
import { CodeExample } from '../../components/CodeExample.jsx'
import { ClassTable } from '../../components/ClassTable.jsx'


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

const messageUsageCode = `<ChatMessage
  placement="start"
  name="Alice"
  time="10:30 AM"
  status="read"
  color="primary"
>
  Hello!
</ChatMessage>

<ChatMessage
  placement="end"
  name="Bob"
  time="10:32 AM"
  status="delivered"
  reply={{ name: "Alice", text: "Hello!" }}
  reactions={[{ emoji: "👍", count: 2, reacted: true }]}
>
  Hi there!
</ChatMessage>`

const multimediaUsageCode = `<!-- Audio message -->
<ChatAudio src="/audio.mp3" duration="0:45" />

<!-- Video message -->
<ChatVideo src="/video.mp4" poster="/thumb.jpg" />

<!-- Image message -->
<ChatImageMessage
  src="/photo.jpg"
  alt="Beach sunset"
  caption="Beautiful sunset!"
/>

<!-- File attachment -->
<ChatFile
  filename="document.pdf"
  href="/doc.pdf"
  size="2.4 MB"
  icon="📄"
/>

<!-- Link preview -->
<ChatLink
  href="https://example.com"
  title="Article Title"
  description="A short description..."
  image="/og-image.jpg"
/>`

const interactionUsageCode = `<!-- System message -->
<ChatSystem type="date">Today</ChatSystem>
<ChatSystem type="info">Alice joined the chat</ChatSystem>

<!-- Typing indicator -->
<ChatTyping name="Alice" />

<!-- Emoji picker -->
<ChatEmoji onSelect={(emoji) => console.log(emoji)} />

<!-- Input area -->
<ChatInput
  placeholder="Type a message..."
  onSend={(msg) => console.log(msg)}
  onAttach={() => console.log('attach')}
  onEmoji={() => console.log('emoji')}
/>`

const windowUsageCode = `<ChatWindow style={{ height: '500px' }}>
  <ChatHeader>
    <Avatar src="..." size="sm" />
    <Text>Alice</Text>
  </ChatHeader>
  <ChatMessages>
    <ChatMessage placement="start" name="Alice">
      Hey!
    </ChatMessage>
    <ChatMessage placement="end" name="Bob" status="read">
      Hi!
    </ChatMessage>
  </ChatMessages>
  <ChatFooter>
    <ChatInput onSend={handleSend} />
  </ChatFooter>
</ChatWindow>`

const classRows = [
  { className: 'chat', prop: '<Chat placement="...">', type: 'Component', description: 'Chat container (basic)' },
  { className: 'chat-image', prop: '<ChatImage>', type: 'Part', description: 'Container for an avatar image' },
  { className: 'chat-header', prop: '<ChatHeader>', type: 'Part', description: 'Header for the chat bubble' },
  { className: 'chat-bubble', prop: '<ChatBubble color="...">', type: 'Component', description: 'The chat bubble itself' },
  { className: 'chat-footer', prop: '<ChatFooter>', type: 'Part', description: 'Footer for the chat bubble' },
  { className: 'chat-window', prop: '<ChatWindow>', type: 'Component', description: 'Full chat container with fixed header/footer' },
  { className: 'chat-message', prop: '<ChatMessage>', type: 'Component', description: 'Complete message with bubble, status, reactions' },
  { className: 'chat-reply', prop: '<ChatReply>', type: 'Component', description: 'Reply/quote to a previous message' },
  { className: 'chat-reactions', prop: '<ChatReactions>', type: 'Component', description: 'Emoji reactions for a message' },
  { className: 'chat-status', prop: '<ChatStatus>', type: 'Component', description: 'Read receipt indicators' },
  { className: 'chat-audio', prop: '<ChatAudio>', type: 'Component', description: 'Audio player for voice messages' },
  { className: 'chat-video', prop: '<ChatVideo>', type: 'Component', description: 'Inline video player' },
  { className: 'chat-image', prop: '<ChatImageMessage>', type: 'Component', description: 'Image message with caption' },
  { className: 'chat-file', prop: '<ChatFile>', type: 'Component', description: 'File attachment with icon' },
  { className: 'chat-link', prop: '<ChatLink>', type: 'Component', description: 'URL preview with title/description' },
  { className: 'chat-system', prop: '<ChatSystem>', type: 'Component', description: 'System messages (dates, info)' },
  { className: 'chat-input', prop: '<ChatInput>', type: 'Component', description: 'Message input area' },
  { className: 'chat-typing', prop: '<ChatTyping>', type: 'Component', description: 'Typing indicator' },
  { className: 'chat-emoji', prop: '<ChatEmoji>', type: 'Component', description: 'Emoji selector grid' },
  { className: 'chat-start', prop: 'placement="start" (default)', type: 'Placement', description: 'Bubble on the left', isDefault: true },
  { className: 'chat-end', prop: 'placement="end"', type: 'Placement', description: 'Bubble on the right' },
]

export default {
  name: 'Chat',
  category: 'Data Display',
  description: 'Complete chat component system for modern messaging interfaces.',

  oninit() { loadPageI18n('chat') },
  view() {
    return (
      <Stack gap="lg">
        <Title as="h1" size="2">Chat</Title>
        <Text color="neutral" className={css({ marginBottom: '2rem', maxWidth: '600px' })}>
          {t('paragraph')}
        </Text>

        {/* Basic Chat */}
        <Block spacing="lg">
          <Title as="h2" size="3">Basic Chat</Title>
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
        </Block>

        <Divider />

        {/* ChatMessage */}
        <Block spacing="lg">
          <Title as="h2" size="3">ChatMessage</Title>
          <Text color="neutral" className={css({ marginBottom: '1rem' })}>
            Complete message component with name, time, status, reply, and reactions.
          </Text>
          <Chat placement="start">
            <ChatImage><Avatar src="https://i.pravatar.cc/150?u=2" /></ChatImage>
            <ChatMessage
              placement="start"
              name="Alice"
              time="10:30 AM"
              status="read"
              color="primary"
            >
              Hello! How's the project going?
            </ChatMessage>
          </Chat>
          <Chat placement="end">
            <ChatMessage
              placement="end"
              name="Bob"
              time="10:32 AM"
              status="delivered"
              reply={{ name: "Alice", text: "Hello! How's the project going?" }}
              reactions={[{ emoji: "👍", count: 2, reacted: true }, { emoji: "❤️", count: 1, reacted: false }]}
            >
              Going great! Just finished the new components.
            </ChatMessage>
          </Chat>
          <CodeExample code={messageUsageCode} />
        </Block>

        <Divider />

        {/* Multimedia */}
        <Block spacing="lg">
          <Title as="h2" size="3">Multimedia Messages</Title>
          <Text color="neutral" className={css({ marginBottom: '1rem' })}>
            Audio, video, images, files, and link previews.
          </Text>

          <Chat placement="start">
            <ChatImage><Avatar src="https://i.pravatar.cc/150?u=3" /></ChatImage>
            <ChatMessage placement="start" name="Charlie" time="11:00 AM" status="read">
              <ChatAudio src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" duration="0:45" />
            </ChatMessage>
          </Chat>

          <Chat placement="end">
            <ChatMessage placement="end" name="Bob" time="11:05 AM" status="delivered">
              <ChatImageMessage
                src="https://picsum.photos/400/200"
                alt="Sample photo"
                caption="Check out this view!"
              />
            </ChatMessage>
          </Chat>

          <Chat placement="start">
            <ChatImage><Avatar src="https://i.pravatar.cc/150?u=4" /></ChatImage>
            <ChatMessage placement="start" name="Dave" time="11:10 AM" status="sent">
              <ChatFile
                filename="project-proposal.pdf"
                href="#"
                size="2.4 MB"
                icon="📄"
              />
            </ChatMessage>
          </Chat>

          <Chat placement="end">
            <ChatMessage placement="end" name="Bob" time="11:15 AM" status="delivered">
              <ChatLink
                href="https://mithril.js.org"
                title="Mithril.js"
                description="A framework for building brilliant applications"
                image="https://mithril.js.org/img/mithril.js"
              />
            </ChatMessage>
          </Chat>

          <CodeExample code={multimediaUsageCode} />
        </Block>

        <Divider />

        {/* System Messages */}
        <Block spacing="lg">
          <Title as="h2" size="3">System Messages</Title>
          <Text color="neutral" className={css({ marginBottom: '1rem' })}>
            Dates, join notifications, and typing indicators.
          </Text>

          <ChatSystem type="date">Today</ChatSystem>
          <ChatSystem type="info">Alice joined the chat</ChatSystem>

          <Chat placement="start">
            <ChatImage><Avatar src="https://i.pravatar.cc/150?u=1" /></ChatImage>
            <ChatMessage placement="start" name="Alice" time="11:30 AM" status="read">
              Hey everyone!
            </ChatMessage>
          </Chat>

          <ChatTyping name="Alice" />

          <CodeExample code={interactionUsageCode} />
        </Block>

        <Divider />

        {/* Emoji Picker */}
        <Block spacing="lg">
          <Title as="h2" size="3">Emoji Selector</Title>
          <Text color="neutral" className={css({ marginBottom: '1rem' })}>
            A grid of emojis for quick reactions.
          </Text>
          <ChatEmoji onSelect={(emoji) => console.log('Selected:', emoji)} />
        </Block>

        <Divider />

        {/* ChatWindow */}
        <Block spacing="lg">
          <Title as="h2" size="3">ChatWindow</Title>
          <Text color="neutral" className={css({ marginBottom: '1rem' })}>
            Complete chat container with fixed header, scrollable messages, and fixed footer.
          </Text>
          <div className={css({ height: '400px', border: '1px solid', borderColor: 'base-200', borderRadius: 'var(--radius-box)', overflow: 'hidden' })}>
            <ChatWindow>
              <ChatHeader>
                <div className={css({ display: 'flex', alignItems: 'center', gap: 'token(spacing.3)' })}>
                  <Avatar src="https://i.pravatar.cc/150?u=1" size="sm" />
                  <div>
                    <Text bold size="sm">Alice</Text>
                    <Text size="xs" color="success">Online</Text>
                  </div>
                </div>
              </ChatHeader>
              <div className={css({ flex: '1', overflowY: 'auto', padding: 'token(spacing.4)', display: 'flex', flexDirection: 'column', gap: 'token(spacing.2)' })}>
                <ChatSystem type="date">Today</ChatSystem>
                <Chat placement="start">
                  <ChatImage><Avatar src="https://i.pravatar.cc/150?u=1" /></ChatImage>
                  <ChatBubble>Hey! How's it going?</ChatBubble>
                </Chat>
                <Chat placement="end">
                  <ChatBubble color="primary">Pretty good! Working on the chat components.</ChatBubble>
                </Chat>
                <Chat placement="start">
                  <ChatImage><Avatar src="https://i.pravatar.cc/150?u=1" /></ChatImage>
                  <ChatMessage placement="start" name="Alice" time="2:30 PM" status="read" reactions={[{ emoji: "👍", count: 1, reacted: true }]}>
                    Nice! Let me know if you need help.
                  </ChatMessage>
                </Chat>
              </div>
              <ChatFooter>
                <ChatInput
                  placeholder="Type a message..."
                  onSend={(msg) => console.log('Send:', msg)}
                  onAttach={() => console.log('Attach')}
                  onEmoji={() => console.log('Emoji')}
                />
              </ChatFooter>
            </ChatWindow>
          </div>
          <CodeExample code={windowUsageCode} />
        </Block>

        <Divider />

        {/* Usage & Class Reference */}
        <Block spacing="lg">
          <Title as="h2" size="3">{t('common.usage')}</Title>
          <CodeExample code={usageCode} />
        </Block>

        <Block spacing="lg">
          <Title as="h2" size="3">{t('common.classReference')}</Title>
          <ClassTable rows={classRows} />
        </Block>
      </Stack>
    )
  }
}
