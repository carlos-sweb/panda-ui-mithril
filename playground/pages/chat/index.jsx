import m from 'mithril'
import { css } from '../../../styled-system/css'
import { t, loadPageI18n } from '../../i18n/index.js'
import {
  Stack, Title, Text, Block, Divider,
  Chat, ChatImage, ChatHeader, ChatBubble, ChatFooter,
  ChatWindow, ChatMessage, ChatReply, ChatReactions, ChatStatus,
  ChatAudio, ChatVideo, ChatImageMessage, ChatFile, ChatLink,
  ChatSystem, ChatInput, ChatTyping, ChatEmoji,
  Avatar, Button, Badge,
  Tabs, Tab, TabContent
} from '../../../src/index.js'
import { CodeExample } from '../../components/CodeExample.jsx'
import { ClassTable } from '../../components/ClassTable.jsx'
import table from './table.yaml'
import { tableToRows } from '../../components/table-rows'
// Avatares locales — sin URLs externas (patrón del demo Mask).
import avatar1 from '../../assets/avatar/avatar1.jpg'
import avatar2 from '../../assets/avatar/avatar2.jpg'
import avatar3 from '../../assets/avatar/avatar3.jpg'
import avatar4 from '../../assets/avatar/avatar4.jpg'


const usageCodeJsx = `import m from 'mithril'
import { Chat, ChatImage, ChatHeader, ChatBubble, ChatFooter, Avatar } from 'panda-ui-mithril'

export const MyPage = {
  view() {
    return (
      <div>
        <Chat placement="start">
          <ChatImage><Avatar src="..." /></ChatImage>
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
}`

const usageCodeJavascript = `import m from 'mithril'
import { Chat, ChatImage, ChatHeader, ChatBubble, ChatFooter, Avatar } from 'panda-ui-mithril'

export const MyPage = {
  view() {
    return m('div', null, [
      m(Chat, { placement: 'start' }, [
        m(ChatImage, null, m(Avatar, { src: '...' })),
        m(ChatHeader, null, 'John'),
        m(ChatBubble, null, 'Hey! How are you?'),
        m(ChatFooter, null, 'Just now')
      ]),
      m(Chat, { placement: 'end' }, [
        m(ChatBubble, { color: 'primary' }, 'I am good, thanks!'),
        m(ChatFooter, null, '2 minutes ago')
      ])
    ])
  }
}`

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
            <ChatImage><Avatar src={avatar1} /></ChatImage>
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
            <ChatImage><Avatar src={avatar2} /></ChatImage>
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
            <ChatImage><Avatar src={avatar3} /></ChatImage>
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
            <ChatImage><Avatar src={avatar4} /></ChatImage>
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
            <ChatImage><Avatar src={avatar1} /></ChatImage>
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
                  <Avatar src={avatar1} size="sm" />
                  <div>
                    <Text bold size="sm">Alice</Text>
                    <Text size="xs" color="success">Online</Text>
                  </div>
                </div>
              </ChatHeader>
              <div className={css({ flex: '1', overflowY: 'auto', padding: 'token(spacing.4)', display: 'flex', flexDirection: 'column', gap: 'token(spacing.2)' })}>
                <ChatSystem type="date">Today</ChatSystem>
                <Chat placement="start">
                  <ChatImage><Avatar src={avatar1} /></ChatImage>
                  <ChatBubble>Hey! How's it going?</ChatBubble>
                </Chat>
                <Chat placement="end">
                  <ChatBubble color="primary">Pretty good! Working on the chat components.</ChatBubble>
                </Chat>
                <Chat placement="start">
                  <ChatImage><Avatar src={avatar1} /></ChatImage>
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
          <Tabs defaultActive="jsx" lifted size="lg">
            <Tab ref="jsx">Jsx</Tab>
            <Tab ref="js">Js</Tab>
            <TabContent ref="jsx">
              <CodeExample type="jsx" code={usageCodeJsx} />
            </TabContent>
            <TabContent ref="js">
              <CodeExample type="javascript" code={usageCodeJavascript} />
            </TabContent>
          </Tabs>
        </Block>

        <Block spacing="lg">
          <Title as="h2" size="3">{t('common.classReference')}</Title>
          <ClassTable rows={tableToRows(table)} />
        </Block>
      </Stack>
    )
  }
}
