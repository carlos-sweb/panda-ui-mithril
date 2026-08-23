import m from 'mithril'
import { css } from '../../../styled-system/css'
import { t, loadPageI18n } from '../../i18n/index.js'
import {
  Stack, Title, Text, Block, Button, Box, Tabs, Tab, TabContent,
  Dropdown, DropdownTrigger, DropdownContent,
  Menu, MenuItem, MenuTitle, Avatar,
} from '../../../src/index.js'
import { User, Settings, LogOut, Divide } from 'lucide-mithril'
import { FlagEs, FlagUs, FlagFr, FlagDe, FlagPt } from 'circle-flags-mithril'
import avatar1 from '../../assets/avatar/avatar1.jpg'
import { CodeExample } from '../../components/CodeExample.jsx'
import { ClassTable } from '../../components/ClassTable.jsx'
import table from './table.yaml'
import { tableToRows } from '../../components/table-rows'

// ── Ejemplos reales ─────────────────────────────────────────────────────
const langs = [
  { code: 'es', name: 'Español', flag: FlagEs },
  { code: 'en', name: 'English', flag: FlagUs },
  { code: 'fr', name: 'Français', flag: FlagFr },
  { code: 'de', name: 'Deutsch', flag: FlagDe },
  { code: 'pt', name: 'Português', flag: FlagPt },
]

const langCodeJsx = `import m from 'mithril'
import { Dropdown, DropdownTrigger, DropdownContent, Menu, MenuItem, Button } from 'panda-ui-mithril'
import { FlagEs, FlagUs, FlagFr } from 'circle-flags-mithril'

const langs = [
  { code: 'es', name: 'Español', flag: FlagEs },
  { code: 'en', name: 'English', flag: FlagUs },
  { code: 'fr', name: 'Français', flag: FlagFr },
]

export const MyPage = {
  oninit(vnode) { vnode.state.lang = langs[0] },
  view(vnode) {
    const lang = vnode.state.lang
    return (
      <Dropdown>
        <DropdownTrigger>
          <Button variant="soft">
            {m(lang.flag, { size: 18 })}
            {lang.name}
          </Button>
        </DropdownTrigger>
        <DropdownContent>
          <Menu>
            {langs.map((l) => (
              <MenuItem key={l.code} onclick={() => { vnode.state.lang = l }}>
                {m(l.flag, { size: 18 })}
                {l.name}
              </MenuItem>
            ))}
          </Menu>
        </DropdownContent>
      </Dropdown>
    )
  }
}`

const langCodeJavascript = `import m from 'mithril'
import { Dropdown, DropdownTrigger, DropdownContent, Menu, MenuItem, Button } from 'panda-ui-mithril'
import { FlagEs, FlagUs, FlagFr } from 'circle-flags-mithril'

const langs = [
  { code: 'es', name: 'Español', flag: FlagEs },
  { code: 'en', name: 'English', flag: FlagUs },
  { code: 'fr', name: 'Français', flag: FlagFr },
]

export const MyPage = {
  oninit(vnode) { vnode.state.lang = langs[0] },
  view(vnode) {
    const lang = vnode.state.lang
    return m(Dropdown, null, [
      m(DropdownTrigger, null, m(Button, { variant: 'soft' }, [
        m(lang.flag, { size: 18 }),
        lang.name
      ])),
      m(DropdownContent, null, [
        m(Menu, null, langs.map((l) =>
          m(MenuItem, {
            key: l.code,
            onclick: () => { vnode.state.lang = l }
          }, [
            m(l.flag, { size: 18 }),
            l.name
          ])
        ))
      ])
    ])
  }
}`

const usageCodeJsx = `import m from 'mithril'
import { Dropdown, DropdownTrigger, DropdownContent, Menu, MenuItem, MenuTitle } from 'panda-ui-mithril'
import { Button } from 'panda-ui-mithril'

export const MyPage = {
  view() {
    return (
      <Dropdown>
        <DropdownTrigger>
          <Button>Options</Button>
        </DropdownTrigger>
        <DropdownContent>
          <Menu>
            <MenuItem>Dashboard</MenuItem>
            <MenuItem>Settings</MenuItem>
            <MenuTitle>Actions</MenuTitle>
            <MenuItem disabled>Logout</MenuItem>
          </Menu>
        </DropdownContent>
      </Dropdown>
    )
  }
}`

const usageCodeJavascript = `import m from 'mithril'
import { Dropdown, DropdownTrigger, DropdownContent, Menu, MenuItem, MenuTitle, Button } from 'panda-ui-mithril'

export const MyPage = {
  view() {
    return m(Dropdown, null, [
      m(DropdownTrigger, null, m(Button, null, 'Options')),
      m(DropdownContent, null, [
        m(Menu, null, [
          m(MenuItem, null, 'Dashboard'),
          m(MenuItem, null, 'Settings'),
          m(MenuTitle, null, 'Actions'),
          m(MenuItem, { disabled: true }, 'Logout')
        ])
      ])
    ])
  }
}`

const placements = ['bottom-start', 'bottom-center', 'bottom-end', 'top-start', 'top-center', 'top-end', 'left-center', 'right-center']

export default {
  name: 'Dropdown',
  category: 'Navigation',
  description: 'Dropdown menu component for actions and navigation.',

  oninit(vnode) {
    loadPageI18n('dropdown')
    vnode.state.controlledOpen = false
    vnode.state.lang = langs[0]
  },
  view(vnode) {
    return (
      <Stack gap="lg">
        <Title as="h1" size="2">Dropdown</Title>
        <Text color="neutral" className={css({ marginBottom: '2rem', maxWidth: '600px' })}>
          {t('paragraph')}
        </Text>

        {/* ── Básico: click + menú ── */}
        <Box>
          <Stack direction="row" gap="md" wrap="wrap" align="center">
            <Dropdown>
              <DropdownTrigger>
                <Button>Options</Button>
              </DropdownTrigger>
              <DropdownContent>
                <Menu>
                  <MenuItem>Dashboard</MenuItem>
                  <MenuItem>Settings</MenuItem>
                  <MenuTitle>Actions</MenuTitle>
                  <MenuItem disabled>Logout</MenuItem>
                </Menu>
              </DropdownContent>
            </Dropdown>

            {/* Hover */}
            <Dropdown trigger="hover">
              <DropdownTrigger>
                <Button variant="soft">Hover me</Button>
              </DropdownTrigger>
              <DropdownContent>
                <Menu>
                  <MenuItem>Profile</MenuItem>
                  <MenuItem>Account</MenuItem>
                  <MenuItem>Help</MenuItem>
                </Menu>
              </DropdownContent>
            </Dropdown>

            {/* Ancho fijo: width="md" — el panel mide 16rem y los items llenan */}
            <Dropdown width="md">
              <DropdownTrigger>
                <Button variant="outline">Fixed width</Button>
              </DropdownTrigger>
              <DropdownContent>
                <Menu>
                  <MenuItem>Item A</MenuItem>
                  <MenuItem>Item B</MenuItem>
                  <MenuItem>Item C</MenuItem>
                </Menu>
              </DropdownContent>
            </Dropdown>

            {/* Controlado */}
            <Dropdown
              open={vnode.state.controlledOpen}
              onchange={(next) => { vnode.state.controlledOpen = next }}
            >
              <DropdownTrigger>
                <Button variant="outline">Controlled</Button>
              </DropdownTrigger>
              <DropdownContent>
                <Menu>
                  <MenuItem>One</MenuItem>
                  <MenuItem>Two</MenuItem>
                </Menu>
              </DropdownContent>
            </Dropdown>
            <Button
              size="sm"
              variant="ghost"
              onclick={() => { vnode.state.controlledOpen = !vnode.state.controlledOpen }}
            >
              Toggle outside
            </Button>
          </Stack>
        </Box>

        {/* ── Placements ── */}
        <Block spacing="lg">
          <Title as="h2" size="3">{t('placementsTitle')}</Title>
          <Stack direction="row" gap="md" wrap="wrap" align="center" className={css({ padding: '2rem 0' })}>
            {placements.map((placement) => (
              <Dropdown key={placement} placement={placement}>
                <DropdownTrigger>
                  <Button size="sm" variant="soft">{placement}</Button>
                </DropdownTrigger>
                <DropdownContent>
                  <Menu>
                    <MenuItem>Item A</MenuItem>
                    <MenuItem>Item B</MenuItem>
                    <MenuItem>Item C</MenuItem>
                  </Menu>
                </DropdownContent>
              </Dropdown>
            ))}
          </Stack>
        </Block>

        {/* ── Ejemplos reales ── */}
        <Block spacing="lg">
          <Title as="h2" size="3">{t('realTitle')}</Title>
          <Text color="neutral" className={css({ marginBottom: '1rem', maxWidth: '640px' })}>
            {m.trust(t('realDesc'))}
          </Text>

          <Stack gap="md">
            {/* Selector de idioma */}
            <Box>
              <Stack direction="row" gap="md" wrap="wrap" align="center">
                <Text size="sm" color="neutral">{t('langLabel')}:</Text>
                <Dropdown>
                  <DropdownTrigger>
                    <Button variant="soft">
                      {m(vnode.state.lang.flag, { size: 18 })}
                      {vnode.state.lang.name}
                    </Button>
                  </DropdownTrigger>
                  <DropdownContent>
                    <Menu>
                      {langs.map((l) => (
                        <MenuItem key={l.code} onclick={() => { vnode.state.lang = l }}>
                          {m(l.flag, { size: 18 })}
                          {l.name}
                        </MenuItem>
                      ))}
                    </Menu>
                  </DropdownContent>
                </Dropdown>
              </Stack>
            </Box>

            {/* Menú de usuario */}
            <Box>
              <Stack direction="row" gap="md" wrap="wrap" align="center">
                <Dropdown>
                  <DropdownTrigger>
                    <Button variant="ghost" className={css({ paddingInline: '0.5rem' })}>
                      <Avatar src={avatar1} size="sm" shape="circle" />
                      <Text size="sm">Emily Carter</Text>
                    </Button>
                  </DropdownTrigger>
                  <DropdownContent>
                    <Menu>
                      <MenuTitle>emily.carter@example.com</MenuTitle>
                      <MenuItem><User size={16} /> Profile</MenuItem>
                      <MenuItem><Settings size={16} /> Settings</MenuItem>
                      <MenuItem disabled><LogOut size={16} /> Sign out</MenuItem>
                    </Menu>
                  </DropdownContent>
                </Dropdown>
              </Stack>
            </Box>

            <Tabs defaultActive="jsx" lifted size="lg">
              <Tab ref="jsx">Jsx</Tab>
              <Tab ref="js">Js</Tab>
              <TabContent ref="jsx">
                <CodeExample type="jsx" code={langCodeJsx} copyId="dropdown-lang-jsx" />
              </TabContent>
              <TabContent ref="js">
                <CodeExample type="javascript" code={langCodeJavascript} copyId="dropdown-lang-js" />
              </TabContent>
            </Tabs>
          </Stack>
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
