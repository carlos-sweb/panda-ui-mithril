import m from 'mithril'
import { css } from '../../../styled-system/css'
import { t, loadPageI18n } from '../../i18n/index.js'
import { Stack, Title, Menu, MenuItem, MenuTitle, Text, Block, Badge, Tabs, Tab, TabContent } from '../../../src/index.js'
import { CodeExample } from '../../components/CodeExample.jsx'
import { ClassTable } from '../../components/ClassTable.jsx'
import table from './table.yaml'
import { tableToRows } from '../../components/table-rows'

const surface = css({ background: 'token(colors.base-200)', borderRadius: 'var(--radius-box)' })
const callbackResult = css({
  padding: '0.5rem 1rem',
  background: 'token(colors.base-300)',
  borderRadius: 'var(--radius-box)',
  fontSize: '0.875rem',
  marginTop: '0.5rem',
})

const usageCodeJsx = `import m from 'mithril'
import { Menu, MenuItem, MenuTitle } from 'panda-ui-mithril'

export const MyPage = {
  view() {
    return (
      <div>
        <Menu>
          <MenuItem active>Dashboard</MenuItem>
          <MenuItem>Settings</MenuItem>
          <MenuTitle>Actions</MenuTitle>
          <MenuItem>Profile</MenuItem>
          <MenuItem disabled>Logout</MenuItem>
        </Menu>
      </div>
    )
  }
}`

const usageCodeJavascript = `import m from 'mithril'
import { Menu, MenuItem, MenuTitle } from 'panda-ui-mithril'

export const MyPage = {
  view() {
    return m(Menu, null, [
      m(MenuItem, { active: true }, 'Dashboard'),
      m(MenuItem, null, 'Settings'),
      m(MenuTitle, null, 'Actions'),
      m(MenuItem, null, 'Profile'),
      m(MenuItem, { disabled: true }, 'Logout')
    ])
  }
}`

const autoActiveCode = `// Menu manages active state automatically
// defaultActive sets the initially selected item (index)
m(Menu, { autoActive: true, defaultActive: 1 }, [
  m(MenuItem, 'Dashboard'),
  m(MenuItem, 'Settings'),   // ← active by default
  m(MenuItem, 'Profile'),
])`

const callbackCode = `// Auto active + callback for external sync
m(Menu, {
  autoActive: true,
  onActiveChange: (index) => {
    m.route.set(routes[index])
  }
}, [
  m(MenuItem, 'Dashboard'),
  m(MenuItem, 'Settings'),
])`

export default {
  name: 'Menu',
  category: 'Navigation',
  description: 'Menu component for navigation menus and sidebars.',

  oninit(vnode) {
    loadPageI18n('menu')
    vnode.state.callbackIndex = null
  },
  view(vnode) {
    return (
      <Stack gap="lg">
        <Title as="h1" size="2">Menu</Title>
        <Text color="neutral" className={css({ marginBottom: '2rem', maxWidth: '600px' })}>
          {t('paragraph')}
        </Text>

        <Block spacing="lg">
          <Title as="h3" size="5">{t('verticalDefault')}</Title>
          <Menu className={surface}>
            <MenuItem active>Dashboard</MenuItem>
            <MenuItem>Settings</MenuItem>
            <MenuTitle>Actions</MenuTitle>
            <MenuItem>Profile</MenuItem>
            <MenuItem disabled>Logout</MenuItem>
          </Menu>
        </Block>

        <Block spacing="lg">
          <Title as="h3" size="5">{t('horizontal')}</Title>
          <Menu horizontal className={surface}>
            <MenuItem active>Home</MenuItem>
            <MenuItem>Docs</MenuItem>
            <MenuItem>About</MenuItem>
          </Menu>
        </Block>

        <Block spacing="lg">
          <Title as="h3" size="5">{t('autoActive')}</Title>
          <Text color="neutral" className={css({ marginBottom: '0.75rem' })}>
            {t('autoActiveDescription')}
          </Text>
          <Menu autoActive defaultActive={1} className={surface}>
            <MenuItem>Dashboard</MenuItem>
            <MenuItem>Settings</MenuItem>
            <MenuItem>Profile</MenuItem>
            <MenuItem>Notifications</MenuItem>
          </Menu>
        </Block>

        <Block spacing="lg">
          <Title as="h3" size="5">{t('autoActiveCallback')}</Title>
          <Text color="neutral" className={css({ marginBottom: '0.75rem' })}>
            {t('callbackDescription')}
          </Text>
          <Menu
            defaultActive={1}
            autoActive
            className={surface}
            onActiveChange={(index) => { vnode.state.callbackIndex = index }}
          >
            <MenuItem>Dashboard</MenuItem>
            <MenuItem>Settings</MenuItem>
            <MenuItem >Profile</MenuItem>
          </Menu>
          {vnode.state.callbackIndex !== null && (
            <div className={callbackResult}>
              <Badge color="primary">onActiveChange</Badge> Index: {vnode.state.callbackIndex}
            </div>
          )}
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
          <Title as="h2" size="3">{t('autoActiveTitle')}</Title>
          <CodeExample code={autoActiveCode} />
        </Block>

        <Block spacing="lg">
          <Title as="h2" size="3">{t('onActiveChangeTitle')}</Title>
          <CodeExample code={callbackCode} />
        </Block>

        <Block spacing="lg">
          <Title as="h2" size="3">{t('common.classReference')}</Title>
          <ClassTable rows={tableToRows(table)} />
        </Block>
      </Stack>
    )
  }
}
