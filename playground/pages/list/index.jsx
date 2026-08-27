import m from 'mithril'
import { css } from '../../../styled-system/css'
import { t, loadPageI18n } from '../../i18n/index.js'
import { Stack, Title, List, ListRow, ListCol, Avatar, Button, Text, Block, Tabs, Tab, TabContent } from '../../../src/index.js'
import { Play, Heart, X, Star } from 'lucide-mithril'
import { CodeExample } from '../../components/CodeExample.jsx'
import { ClassTable } from '../../components/ClassTable.jsx'
import table from './table.yaml'
import { tableToRows } from '../../components/table-rows'
// Avatares locales — sin URLs externas (patrón del demo Mask).
import avatar1 from '../../assets/avatar/avatar1.jpg'
import avatar2 from '../../assets/avatar/avatar2.jpg'
import avatar3 from '../../assets/avatar/avatar3.jpg'

const wrapper = css({ maxWidth: '32rem', background: 'token(colors.base-100)', borderRadius: 'var(--radius-box)', boxShadow: '0 1px 3px color-mix(in oklab, black 15%, transparent)' })
const kicker = css({ padding: '1rem 1rem 0.5rem', fontSize: '0.75rem', opacity: 0.6, letterSpacing: '0.02em' })
const subtitle = css({ fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: '600', opacity: 0.6 })

const songs = [
  { title: 'Dio Lupa', subtitle: 'Remaining Reason', img: avatar1 },
  { title: 'Ellie Beilish', subtitle: 'Bears of a fever', img: avatar2 },
  { title: 'Sabrino Gardener', subtitle: 'Cappuccino', img: avatar3 },
]

const usageCodeJsx = `import m from 'mithril'
import { List, ListRow, ListCol, Avatar, Button } from 'panda-ui-mithril'
import { Play } from 'lucide-mithril'

export const MyPage = {
  view() {
    return (
      <div>
        <List>
          <ListRow>
            <Avatar src="..." size="sm" shape="square" />
            <ListCol grow>
              <div>Dio Lupa</div>
              <div>Remaining Reason</div>
            </ListCol>
            <Button variant="ghost" square><Play size={18} /></Button>
          </ListRow>
        </List>
      </div>
    )
  }
}`

const usageCodeJavascript = `import m from 'mithril'
import { List, ListRow, ListCol, Avatar, Button } from 'panda-ui-mithril'
import { Play } from 'lucide-mithril'

export const MyPage = {
  view() {
    return m(List, null, [
      m(ListRow, null, [
        m(Avatar, { src: '...', size: 'sm', shape: 'square' }),
        m(ListCol, { grow: true }, [
          m('div', null, 'Dio Lupa'),
          m('div', null, 'Remaining Reason')
        ]),
        m(Button, { variant: 'ghost', square: true }, m(Play, { size: 18 }))
      ])
    ])
  }
}`

const usageDataJsx = `import m from 'mithril'
import { List, ListRow, ListCol, Button } from 'panda-ui-mithril'

const users = [
  { id: 1, name: 'Ada', email: 'ada@example.com' },
  { id: 2, name: 'Grace', email: 'grace@example.com' },
]

export const MyPage = {
  view() {
    return (
      <List
        data={users}
        key={(item) => item.id}
        hover
        header={<ListRow><ListCol grow>Name</ListCol><ListCol>Email</ListCol></ListRow>}
        empty={<ListRow><ListCol grow>No users</ListCol></ListRow>}
        render={(item, index) => (
          <ListRow>
            <ListCol grow>{item.name}</ListCol>
            <ListCol>{item.email}</ListCol>
            <Button variant="ghost" square size="sm" onclick={() => users.splice(index, 1)}>✕</Button>
          </ListRow>
        )}
      />
    )
  }
}`

const usageDataJavascript = `import m from 'mithril'
import { List, ListRow, ListCol, Button } from 'panda-ui-mithril'

const users = [
  { id: 1, name: 'Ada', email: 'ada@example.com' },
  { id: 2, name: 'Grace', email: 'grace@example.com' },
]

export const MyPage = {
  view() {
    return m(List, {
      data: users,
      key: (item) => item.id,
      hover: true,
      header: m(ListRow, null, [m(ListCol, { grow: true }, 'Name'), m(ListCol, null, 'Email')]),
      empty: m(ListRow, null, m(ListCol, { grow: true }, 'No users')),
      render: (item, index) => m(ListRow, null, [
        m(ListCol, { grow: true }, item.name),
        m(ListCol, null, item.email),
        m(Button, { variant: 'ghost', square: true, size: 'sm', onclick: () => users.splice(index, 1) }, '✕'),
      ]),
    })
  }
}`

// ── Buen uso: réplica Gmail / Proton Mail ────────────────────────────────
const buenUsoJsx = `import m from 'mithril'
import { css } from './styled-system/css'
import { List, ListRow, ListCol, Avatar, Button } from 'panda-ui-mithril'
import { Star } from 'lucide-mithril'

const mails = [
  { id: 1, sender: 'Ada Lovelace', subject: 'Analytical Engine notes', time: '09:42', color: '#0ea5e9', starred: true },
  { id: 2, sender: 'Grace Hopper', subject: 'COBOL v2 review', time: '10:15', color: '#f472b6', starred: false },
]

const avatarColor = css({ '& > div': { backgroundColor: 'var(--mail-color)', color: 'white' } })
const starFilled = css({ fill: 'currentColor', color: 'token(colors.warning)' })
const senderStyle = css({ fontWeight: '600' })
const subjectStyle = css({ fontSize: '0.8125rem', opacity: 0.6 })
const timeStyle = css({ fontSize: '0.75rem', opacity: 0.6, alignSelf: 'center', whiteSpace: 'nowrap' })

export const Inbox = {
  view() {
    return (
      <List data={mails} key={(mail) => mail.id} hover render={(mail) => (
        <ListRow>
          <Button variant="ghost" square size="sm" onclick={() => { mail.starred = !mail.starred }}>
            {mail.starred ? <Star size={18} class={starFilled} /> : <Star size={18} />}
          </Button>
          <Avatar shape="circle" size="sm" placeholder className={avatarColor} style={{ '--mail-color': mail.color }}>
            {mail.sender.charAt(0)}
          </Avatar>
          <ListCol grow>
            <div className={senderStyle}>{mail.sender}</div>
            <div className={subjectStyle}>{mail.subject}</div>
          </ListCol>
          <div className={timeStyle}>{mail.time}</div>
        </ListRow>
      )} />
    )
  }
}`

const buenUsoJs = `import m from 'mithril'
import { css } from './styled-system/css'
import { List, ListRow, ListCol, Avatar, Button } from 'panda-ui-mithril'
import { Star } from 'lucide-mithril'

const mails = [
  { id: 1, sender: 'Ada Lovelace', subject: 'Analytical Engine notes', time: '09:42', color: '#0ea5e9', starred: true },
  { id: 2, sender: 'Grace Hopper', subject: 'COBOL v2 review', time: '10:15', color: '#f472b6', starred: false },
]

const avatarColor = css({ '& > div': { backgroundColor: 'var(--mail-color)', color: 'white' } })
const starFilled = css({ fill: 'currentColor', color: 'token(colors.warning)' })
const senderStyle = css({ fontWeight: '600' })
const subjectStyle = css({ fontSize: '0.8125rem', opacity: 0.6 })
const timeStyle = css({ fontSize: '0.75rem', opacity: 0.6, alignSelf: 'center', whiteSpace: 'nowrap' })

export const Inbox = {
  view() {
    return m(List, {
      data: mails,
      key: (mail) => mail.id,
      hover: true,
      render: (mail) => m(ListRow, null, [
        m(Button, {
          variant: 'ghost', square: true, size: 'sm',
          onclick: () => { mail.starred = !mail.starred },
        }, mail.starred ? m(Star, { size: 18, class: starFilled }) : m(Star, { size: 18 })),
        m(Avatar, { shape: 'circle', size: 'sm', placeholder: true, className: avatarColor, style: { '--mail-color': mail.color } }, mail.sender.charAt(0)),
        m(ListCol, { grow: true }, [
          m('div', { className: senderStyle }, mail.sender),
          m('div', { className: subjectStyle }, mail.subject),
        ]),
        m('div', { className: timeStyle }, mail.time),
      ]),
    })
  }
}`

// ── Interactivo: agregar / quitar items ─────────────────────────────────
const usageStatefulJsx = `import m from 'mithril'
import { List, ListRow, ListCol, Button } from 'panda-ui-mithril'

export const Todo = {
  oninit(vnode) {
    // El estado vive en vnode.state; mutarlo redibuja automáticamente
    vnode.state.items = [
      { id: 1, name: 'Alpha' },
      { id: 2, name: 'Beta' },
    ]
    vnode.state.seq = 2
  },

  view(vnode) {
    return (
      <div>
        <Button size="sm" color="primary" onclick={() => {
          vnode.state.seq += 1
          vnode.state.items.push({ id: vnode.state.seq, name: 'Item ' + vnode.state.seq })
        }}>Add</Button>

        <List data={vnode.state.items} key={(item) => item.id} render={(item, index) => (
          <ListRow>
            <ListCol grow>{item.name}</ListCol>
            <Button variant="ghost" square size="sm" onclick={() => {
              vnode.state.items.splice(index, 1)
            }}>✕</Button>
          </ListRow>
        )} />
      </div>
    )
  }
}`

const usageStatefulJs = `import m from 'mithril'
import { List, ListRow, ListCol, Button } from 'panda-ui-mithril'

export const Todo = {
  oninit(vnode) {
    // El estado vive en vnode.state; mutarlo redibuja automáticamente
    vnode.state.items = [
      { id: 1, name: 'Alpha' },
      { id: 2, name: 'Beta' },
    ]
    vnode.state.seq = 2
  },

  view(vnode) {
    return m('div', null, [
      m(Button, { size: 'sm', color: 'primary', onclick: () => {
        vnode.state.seq += 1
        vnode.state.items.push({ id: vnode.state.seq, name: 'Item ' + vnode.state.seq })
      } }, 'Add'),
      m(List, {
        data: vnode.state.items,
        key: (item) => item.id,
        render: (item, index) => m(ListRow, null, [
          m(ListCol, { grow: true }, item.name),
          m(Button, { variant: 'ghost', square: true, size: 'sm', onclick: () => { vnode.state.items.splice(index, 1) } }, '✕'),
        ]),
      }),
    ])
  }
}`

export default {
  name: 'List',
  category: 'Data Display',
  description: 'List is a vertical layout to display information in rows.',

  oninit(vnode) {
    loadPageI18n('list')
    // Estado para los demos data-driven (children-función y render prop)
    vnode.state.fnItems = [
      { id: 1, name: 'Alpha' },
      { id: 2, name: 'Beta' },
      { id: 3, name: 'Gamma' },
    ]
    vnode.state.fnSeq = 3
    vnode.state.rpItems = [
      { id: 1, name: 'Red', desc: 'row #1' },
      { id: 2, name: 'Green', desc: 'row #2' },
      { id: 3, name: 'Blue', desc: 'row #3' },
    ]
    vnode.state.rpSeq = 3
    vnode.state.rpLoading = false
    // Inbox estilo Gmail/Proton Mail para el demo de "Buen uso"
    vnode.state.mails = [
      { id: 1, sender: 'Ada Lovelace', subject: 'Analytical Engine notes', time: '09:42', color: '#0ea5e9', starred: true },
      { id: 2, sender: 'Grace Hopper', subject: 'COBOL v2 review', time: '10:15', color: '#f472b6', starred: false },
      { id: 3, sender: 'Alan Turing', subject: 'Enigma decryption log', time: '12:03', color: '#34d399', starred: false },
      { id: 4, sender: 'Edsger Dijkstra', subject: 'Shortest path proposal', time: '14:27', color: '#fbbf24', starred: true },
    ]
  },
  view(vnode) {
    return (
      <Stack gap="lg">
        <Title as="h1" size="2">List</Title>
        <Text color="neutral" className={css({ marginBottom: '2rem', maxWidth: '600px' })}>
          {t('paragraph')}
        </Text>

        <div className={wrapper}>
          <div className={kicker}>Most played songs this week</div>
          <List>
            {songs.map((song) => (
              <ListRow key={song.title} hover>
                <Avatar src={song.img} size="sm" shape="square" />
                <ListCol>
                  <div>{song.title}</div>
                  <div className={subtitle}>{song.subtitle}</div>
                </ListCol>
                <Button variant="ghost" square><Play size={18} /></Button>
                <Button variant="ghost" square><Heart size={18} /></Button>
              </ListRow>
            ))}
          </List>
        </div>

        {/* ── Data-driven: children como función ── */}
        <Block spacing="lg">
          <Title as="h2" size="3">{t('dataFnTitle')}</Title>
          <Text color="neutral" className={css({ marginBottom: '1rem', maxWidth: '600px' })}>
            {m.trust(t('dataFnDesc'))}
          </Text>
          <Stack direction="row" gap="sm" className={css({ marginBottom: '0.75rem' })}>
            <Button size="sm" color="primary" onclick={() => {
              vnode.state.fnSeq += 1
              vnode.state.fnItems.push({ id: vnode.state.fnSeq, name: `Item ${vnode.state.fnSeq}` })
            }}>Add</Button>
            <Text size="sm" color="neutral" className={css({ alignSelf: 'center' })}>{vnode.state.fnItems.length} items</Text>
          </Stack>
          <div className={wrapper}>
            <List data={vnode.state.fnItems} key={(item) => item.id}>
              {(item, index) => (
                <ListRow hover>
                  <ListCol grow>{item.name}</ListCol>
                  <ListCol>{index}</ListCol>
                  <Button variant="ghost" square size="sm" onclick={() => {
                    vnode.state.fnItems.splice(index, 1)
                  }}><X size={16} /></Button>
                </ListRow>
              )}
            </List>
          </div>
        </Block>

        {/* ── Data-driven: render prop ── */}
        <Block spacing="lg">
          <Title as="h2" size="3">{t('dataRenderTitle')}</Title>
          <Text color="neutral" className={css({ marginBottom: '1rem', maxWidth: '600px' })}>
            {m.trust(t('dataRenderDesc'))}
          </Text>
          <Stack direction="row" gap="sm" wrap="wrap" className={css({ marginBottom: '0.75rem' })}>
            <Button size="sm" color="primary" onclick={() => {
              vnode.state.rpSeq += 1
              vnode.state.rpItems.push({ id: vnode.state.rpSeq, name: `Item ${vnode.state.rpSeq}`, desc: `row #${vnode.state.rpSeq}` })
            }}>Add</Button>
            <Button size="sm" variant="outline" onclick={() => {
              if (vnode.state.rpItems.length) vnode.state.rpItems.pop()
            }}>Remove last</Button>
            <Button size="sm" variant="soft" onclick={() => { vnode.state.rpLoading = !vnode.state.rpLoading }}>
              {vnode.state.rpLoading ? 'Loaded' : 'Loading…'}
            </Button>
            <Text size="sm" color="neutral" className={css({ alignSelf: 'center' })}>{vnode.state.rpItems.length} items</Text>
          </Stack>
          <div className={wrapper}>
            <List
              data={vnode.state.rpItems}
              key={(item) => item.id}
              hover
              loading={vnode.state.rpLoading}
              loadingRows={3}
              header={<ListRow><ListCol grow>Name</ListCol><ListCol>Row</ListCol></ListRow>}
              footer={<ListRow><ListCol grow>— end —</ListCol></ListRow>}
              empty={<ListRow><ListCol grow>No items</ListCol></ListRow>}
              render={(item, index) => (
                <ListRow>
                  <ListCol grow>{item.name}</ListCol>
                  <ListCol>{item.desc}</ListCol>
                  <Button variant="ghost" square size="sm" onclick={() => {
                    vnode.state.rpItems.splice(index, 1)
                  }}><X size={16} /></Button>
                </ListRow>
              )}
            />
          </div>
        </Block>

        <Block spacing="lg">
          <Title as="h2" size="3">{t('common.usage')}</Title>
          <Tabs defaultActive="jsx" lifted size="lg">
            <Tab ref="jsx">Jsx</Tab>
            <Tab ref="js">Js</Tab>
            <TabContent ref="jsx">
              <CodeExample type="jsx" code={usageCodeJsx} copyId="usage-jsx" />
            </TabContent>
            <TabContent ref="js">
              <CodeExample type="javascript" code={usageCodeJavascript} copyId="usage-js" />
            </TabContent>
          </Tabs>
        </Block>

        {/* ── Buen uso: inbox estilo Gmail / Proton Mail ── */}
        <Block spacing="lg">
          <Title as="h2" size="3">{t('buenUsoTitle')}</Title>
          <Text color="neutral" className={css({ marginBottom: '1rem', maxWidth: '640px' })}>
            {m.trust(t('buenUsoDesc'))}
          </Text>
          <div className={wrapper}>
            <List data={vnode.state.mails} key={(mail) => mail.id} hover render={(mail) => (
              <ListRow>
                <Button variant="ghost" square size="sm" className={css({ alignSelf: 'center' })} onclick={() => { mail.starred = !mail.starred }}>
                  {mail.starred
                    ? <Star size={18} class={css({ fill: 'currentColor', color: 'token(colors.warning)' })} />
                    : <Star size={18} />}
                </Button>
                <Avatar shape="circle" size="sm" placeholder className={css({ '& > div': { backgroundColor: 'var(--mail-color)', color: 'white' } })} style={{ '--mail-color': mail.color }}>
                  {mail.sender.charAt(0)}
                </Avatar>
                <ListCol grow>
                  <div className={css({ fontWeight: '600' })}>{mail.sender}</div>
                  <div className={css({ fontSize: '0.8125rem', opacity: 0.6 })}>{mail.subject}</div>
                </ListCol>
                <div className={css({ fontSize: '0.75rem', opacity: 0.6, alignSelf: 'center', whiteSpace: 'nowrap' })}>{mail.time}</div>
              </ListRow>
            )} />
          </div>

          <Tabs defaultActive="jsx" lifted size="lg" className={css({ marginTop: '1rem' })}>
            <Tab ref="jsx">Jsx</Tab>
            <Tab ref="js">Js</Tab>
            <TabContent ref="jsx">
              <CodeExample type="jsx" code={buenUsoJsx} copyId="buen-uso-jsx" />
            </TabContent>
            <TabContent ref="js">
              <CodeExample type="javascript" code={buenUsoJs} copyId="buen-uso-js" />
            </TabContent>
          </Tabs>
        </Block>

        <Block spacing="lg">
          <Title as="h2" size="3">{t('dataUsageTitle')}</Title>
          <Tabs defaultActive="jsx" lifted size="lg">
            <Tab ref="jsx">Jsx</Tab>
            <Tab ref="js">Js</Tab>
            <TabContent ref="jsx">
              <CodeExample type="jsx" code={usageDataJsx} copyId="usage-data-jsx" />
            </TabContent>
            <TabContent ref="js">
              <CodeExample type="javascript" code={usageDataJavascript} copyId="usage-data-js" />
            </TabContent>
          </Tabs>
        </Block>

        <Block spacing="lg">
          <Title as="h2" size="3">{t('interactiveTitle')}</Title>
          <Text color="neutral" className={css({ marginBottom: '1rem', maxWidth: '640px' })}>
            {m.trust(t('interactiveDesc'))}
          </Text>
          <Tabs defaultActive="jsx" lifted size="lg">
            <Tab ref="jsx">Jsx</Tab>
            <Tab ref="js">Js</Tab>
            <TabContent ref="jsx">
              <CodeExample type="jsx" code={usageStatefulJsx} copyId="interactive-jsx" />
            </TabContent>
            <TabContent ref="js">
              <CodeExample type="javascript" code={usageStatefulJs} copyId="interactive-js" />
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
