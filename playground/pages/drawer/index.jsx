import m from 'mithril'
import { css } from '../../../styled-system/css'
import { t, loadPageI18n } from '../../i18n/index.js'
import {
  Stack, Title, Button, Text, Block, Box, Tabs, Tab, TabContent,
  Drawer, DrawerBox, DrawerBackdrop,
  DrawerHeader, DrawerBody, DrawerFooter, Menu, MenuItem, MenuTitle
} from '../../../src/index.js'
import { CodeExample } from '../../components/CodeExample.jsx'
import { ClassTable } from '../../components/ClassTable.jsx'
import table from './table.yaml'
import { tableToRows } from '../../components/table-rows'

const usageCodeJsx = `import m from 'mithril'
import { Button, Drawer, DrawerBox, DrawerBackdrop, DrawerHeader, DrawerBody, DrawerFooter } from 'panda-ui-mithril'

export const MyPage = {
  view() {
    return (
      <div>
        <Button onclick={() => { open = true }}>Open drawer</Button>

        <!-- position: start / end / top / bottom ; size: xs–full or any CSS size -->
        <Drawer open={open} position="end" size="sm" labelledby="drawer-title"
                onclose={() => { open = false }}
                onopen={() => console.log('opened')}
                onclosed={() => console.log('closed')}
                onchange={(next) => console.log('change:', next)}>
          <DrawerBox>
            <DrawerHeader>
              <h3 id="drawer-title">Settings</h3>
            </DrawerHeader>
            <DrawerBody>
              <p>Drawer content — DrawerBody is the scroller.</p>
            </DrawerBody>
            <DrawerFooter>
              <Button onclick={() => { open = false }}>Close</Button>
            </DrawerFooter>
          </DrawerBox>
          <DrawerBackdrop onclick={() => { open = false }} />
        </Drawer>
      </div>
    )
  }
}`

const usageCodeJavascript = `import m from 'mithril'
import { Button, Drawer, DrawerBox, DrawerBackdrop, DrawerHeader, DrawerBody, DrawerFooter } from 'panda-ui-mithril'

export const MyPage = {
  view() {
    return m('div', null, [
      m(Button, { onclick: () => { open = true } }, 'Open drawer'),
      m(Drawer, {
        open: open,
        position: 'end',
        size: 'sm',
        labelledby: 'drawer-title',
        onclose: () => { open = false },
        onopen: () => console.log('opened'),
        onclosed: () => console.log('closed'),
        onchange: (next) => console.log('change:', next),
      }, [
        m(DrawerBox, null, [
          m(DrawerHeader, null, [
            m('h3', { id: 'drawer-title' }, 'Settings'),
          ]),
          m(DrawerBody, null, [
            m('p', null, 'Drawer content — DrawerBody is the scroller.'),
          ]),
          m(DrawerFooter, null, [
            m(Button, { onclick: () => { open = false } }, 'Close'),
          ]),
        ]),
        m(DrawerBackdrop, { onclick: () => { open = false } }),
      ]),
    ])
  }
}`

export default {
  oninit(vnode) {
    loadPageI18n('drawer')
    vnode.state.openFor = null
    vnode.state.sizeFor = null
    vnode.state.sizeOpen = false
    vnode.state.customOpen = false
    vnode.state.eventsOpen = false
    vnode.state.persistentOpen = false
    vnode.state.autoCloseOpen = false
    vnode.state.navOpen = false
    vnode.state.log = []
  },

  name: 'Drawer',
  category: 'Navigation',
  description: 'Drawer component for edge-docked sliding panels, based on Modal.',

  view(vnode) {
    const close = () => { vnode.state.openFor = null }
    const closeSize = () => { vnode.state.sizeOpen = false }
    const closePersistent = () => { vnode.state.persistentOpen = false }
    const closeNav = () => { vnode.state.navOpen = false }
    const positions = ['start', 'end', 'top', 'bottom']
    const sizes = ['xs', 'sm', 'md', 'lg', 'xl', 'full']

    const log = (ev) => {
      const time = new Date().toLocaleTimeString('en-US', { hour12: false })
      vnode.state.log.push(`[${time}] ${ev}`)
      if (vnode.state.log.length > 10) vnode.state.log.shift()
      m.redraw()
    }

    return (
      <Stack gap="lg">
        <Title as="h1" size="2">Drawer</Title>
        <Text color="neutral" className={css({ marginBottom: '2rem', maxWidth: '600px' })}>
          {t('paragraph')}
        </Text>

        <Title as="h2" size="3">Positions</Title>
        <Stack direction="row" gap="sm">
          {positions.map((p) => (
            <Button key={p} onclick={() => { vnode.state.openFor = p }}>
              Open ({p})
            </Button>
          ))}
        </Stack>

        {positions.map((p) => (
          <Drawer key={p} position={p} open={vnode.state.openFor === p} onclose={close}>
            <DrawerBox>
              <DrawerHeader>
                <h3>Hello! ({p})</h3>
              </DrawerHeader>
              <DrawerBody>
                <p>
                  This drawer is docked to the <code>{p}</code> edge and slides
                  in from it. Press ESC, click outside, or the button below to close.
                </p>
              </DrawerBody>
              <DrawerFooter>
                <Button onclick={close}>Close</Button>
              </DrawerFooter>
            </DrawerBox>
            <DrawerBackdrop onclick={close} />
          </Drawer>
        ))}

        <Title as="h2" size="3">Sizes</Title>
        <Text color="neutral">
          The <code>size</code> prop sets the panel width for start/end and the
          panel height for top/bottom. Presets or any CSS size (<code>"55%"</code>, <code>200</code>).
        </Text>
        <Stack direction="row" gap="sm">
          {sizes.map((s) => (
            <Button key={s} onclick={() => { vnode.state.sizeFor = s; vnode.state.sizeOpen = true }}>
              Open ({s.toUpperCase()})
            </Button>
          ))}
        </Stack>

        <Drawer
          position="end"
          size={vnode.state.sizeFor || undefined}
          open={vnode.state.sizeOpen}
          labelledby="size-drawer-title"
          onclose={closeSize}
          onclosed={() => { vnode.state.sizeFor = null }}
        >
          <DrawerBox>
            <DrawerHeader>
              <h3 id="size-drawer-title">Size: {vnode.state.sizeFor ? vnode.state.sizeFor.toUpperCase() : ''}</h3>
            </DrawerHeader>
            <DrawerBody>
              <p>
                The same Drawer instance is reused — only the <code>size</code> prop
                changes the <code>--drawer-size</code> custom property.
              </p>
            </DrawerBody>
            <DrawerFooter>
              <Button onclick={closeSize}>Close</Button>
            </DrawerFooter>
          </DrawerBox>
          <DrawerBackdrop onclick={closeSize} />
        </Drawer>

        <Stack direction="row" gap="sm">
          <Button onclick={() => { vnode.state.customOpen = true }}>
            Open (55%)
          </Button>
        </Stack>

        <Drawer position="end" size="55%" open={vnode.state.customOpen} onclose={() => { vnode.state.customOpen = false }}>
          <DrawerBox>
            <DrawerHeader>
              <h3>Custom size</h3>
            </DrawerHeader>
            <DrawerBody>
              <p>
                Any CSS width/height works — this drawer uses <code>size="55%"</code>.
              </p>
            </DrawerBody>
          </DrawerBox>
          <DrawerBackdrop onclick={() => { vnode.state.customOpen = false }} />
        </Drawer>

        <Title as="h2" size="3">Events</Title>
        <Text color="neutral">
          Open the drawer and watch the lifecycle events fire: <code>onopen</code> and
          <code> onchange(true)</code> when it opens; <code>onclose</code>, <code>onclosed</code>
          and <code>onchange(false)</code> when it finishes closing.
        </Text>
        <Stack direction="row" gap="sm" align="center">
          <Button onclick={() => { vnode.state.eventsOpen = true }}>
            Open events drawer
          </Button>
          <Button variant="outline" onclick={() => { vnode.state.log = [] }}>
            Clear log
          </Button>
        </Stack>
        <Box
          className={css({
            marginTop: '1rem',
            padding: '1rem',
            background: 'token(colors.base-200)',
            borderRadius: 'var(--radius-box)',
            fontFamily: 'mono',
            fontSize: '0.875rem',
          })}
        >
          <Stack gap="xs">
            {vnode.state.log.length === 0
              ? <Text color="neutral">(no events yet — open the drawer)</Text>
              : vnode.state.log.map((entry, i) => <Text key={i}>{entry}</Text>)}
          </Stack>
        </Box>

        <Drawer
          position="end"
          open={vnode.state.eventsOpen}
          onopen={() => log('onopen')}
          onclose={() => { log('onclose'); vnode.state.eventsOpen = false }}
          onclosed={() => log('onclosed')}
          onchange={(next) => log('onchange: ' + next)}
        >
          <DrawerBox>
            <DrawerHeader>
              <h3>Events drawer</h3>
            </DrawerHeader>
            <DrawerBody>
              <p>Close it with ESC, the backdrop, or the button — each path fires a different sequence.</p>
            </DrawerBody>
            <DrawerFooter>
              <Button onclick={() => { vnode.state.eventsOpen = false }}>Close</Button>
            </DrawerFooter>
          </DrawerBox>
          <DrawerBackdrop onclick={() => { vnode.state.eventsOpen = false }} />
        </Drawer>

        <Title as="h2" size="3">Persistent</Title>
        <Text color="neutral">
          With <code>persistent</code>, ESC and clicking outside won't close the drawer — use the Close button.
        </Text>
        <Stack direction="row" gap="sm">
          <Button onclick={() => { vnode.state.persistentOpen = true }}>
            Open persistent drawer
          </Button>
        </Stack>

        <Drawer persistent position="start" open={vnode.state.persistentOpen}>
          <DrawerBox>
            <DrawerHeader>
              <h3>Persistent drawer</h3>
            </DrawerHeader>
            <DrawerBody>
              <p>
                You cannot close this drawer with ESC or by clicking outside. The only
                way to dismiss it is the button below.
              </p>
            </DrawerBody>
            <DrawerFooter>
              <Button onclick={closePersistent}>Close</Button>
            </DrawerFooter>
          </DrawerBox>
        </Drawer>

        <Title as="h2" size="3">Auto Close Button</Title>
        <Text color="neutral">
          With <code>buttonClose</code>, an X button is appended automatically — it closes with the exit animation.
        </Text>
        <Stack direction="row" gap="sm">
          <Button onclick={() => { vnode.state.autoCloseOpen = true }}>
            Open with buttonClose
          </Button>
        </Stack>

        <Drawer position="end" buttonClose open={vnode.state.autoCloseOpen} onclose={() => { vnode.state.autoCloseOpen = false }}>
          <DrawerBox>
            <DrawerHeader>
              <h3>Auto Close</h3>
            </DrawerHeader>
            <DrawerBody>
              <p>This drawer has <code>buttonClose</code>. The X button is added automatically.</p>
            </DrawerBody>
          </DrawerBox>
          <DrawerBackdrop onclick={() => { vnode.state.autoCloseOpen = false }} />
        </Drawer>

        <Block spacing="lg">
          <Title as="h2" size="3">Real example — navigation drawer</Title>
          <Text color="neutral">
            A sidebar drawer built with <code>Menu</code> inside <code>DrawerBox</code>,
            the typical use case for navigation.
          </Text>
          <Button onclick={() => { vnode.state.navOpen = true }}>
            Open navigation drawer
          </Button>

          <Drawer position="start" size="sm" buttonClose open={vnode.state.navOpen} labelledby="nav-drawer-title" onclose={closeNav}>
            <DrawerBox>
              <DrawerHeader>
                <h3 id="nav-drawer-title">Navigation</h3>
              </DrawerHeader>
              <DrawerBody>
                <Menu>
                  <MenuTitle>General</MenuTitle>
                  <MenuItem onclick={closeNav}>Dashboard</MenuItem>
                  <MenuItem onclick={closeNav}>Settings</MenuItem>
                  <MenuTitle>Account</MenuTitle>
                  <MenuItem onclick={closeNav}>Profile</MenuItem>
                  <MenuItem onclick={closeNav}>Logout</MenuItem>
                </Menu>
              </DrawerBody>
              <DrawerFooter>
                <Button variant="soft" onclick={closeNav}>Close</Button>
              </DrawerFooter>
            </DrawerBox>
            <DrawerBackdrop onclick={closeNav} />
          </Drawer>
        </Block>

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
