import m from 'mithril'
import { css } from '../../../styled-system/css'
import { t, loadPageI18n } from '../../i18n/index.js'
import { Stack, Title, Tabs, Tab, TabContent, Text, Block } from '../../../src/index.js'
import { CodeExample } from '../../components/CodeExample.jsx'
import { ClassTable } from '../../components/ClassTable.jsx'
import table from './table.yaml'
import { tableToRows } from '../../components/table-rows'

const usageCodeJsx = `import m from 'mithril'
import { Tabs, Tab, TabContent } from 'panda-ui-mithril'

export const MyPage = {
  view() {
    return (
      <div>
        <Tabs defaultActive="info">
          <Tab ref="info">Info</Tab>
          <Tab ref="settings">Settings</Tab>
          <Tab ref="profile">Profile</Tab>
          <TabContent ref="info">Content for info tab</TabContent>
          <TabContent ref="settings">Content for settings tab</TabContent>
          <TabContent ref="profile">Content for profile tab</TabContent>
        </Tabs>
      </div>
    )
  }
}`

const usageCodeJavascript = `import m from 'mithril'
import { Tabs, Tab, TabContent } from 'panda-ui-mithril'

export const MyPage = {
  view() {
    return m(Tabs, { defaultActive: 'info' }, [
      m(Tab, { ref: 'info' }, 'Info'),
      m(Tab, { ref: 'settings' }, 'Settings'),
      m(Tab, { ref: 'profile' }, 'Profile'),
      m(TabContent, { ref: 'info' }, 'Content for info tab'),
      m(TabContent, { ref: 'settings' }, 'Content for settings tab'),
      m(TabContent, { ref: 'profile' }, 'Content for profile tab')
    ])
  }
}`

export default {
  oninit(vnode) {
    loadPageI18n('tabs')
    // Uncontrolled mode demos
    vnode.state.boxed = 'info'
    vnode.state.border = 'info'
    vnode.state.lifted = 'info'
    // Controlled mode demo
    vnode.state.currentTab = 'info'
  },

  name: 'Tabs',
  category: 'Navigation',
  description: 'Tabs component for organizing content into tabbed panels. Supports controlled and uncontrolled modes with keyboard navigation.',

  view(vnode) {
    return (
      <Stack gap="lg">
        <Title as="h1" size="2">Tabs</Title>
        <Text color="neutral" className={css({ marginBottom: '2rem', maxWidth: '600px' })}>
          Tabs organize content into multiple panels that are visible one at a time.
          Use the <code>ref</code> prop to link Tab with TabContent.
        </Text>

        {/* Uncontrolled Mode - Boxed */}
        <Block spacing="lg">
          <Title as="h3" size="5">{t('boxedUncontrolled')}</Title>
          <Text size="sm" color="neutral">{t('stateManagedInternally')}</Text>
          <Tabs boxed defaultActive="info" onActiveChange={(ref) => { vnode.state.boxed = ref }}>
            <Tab ref="info">Info</Tab>
            <Tab ref="details">Details</Tab>
            <Tab ref="more">More</Tab>
            <TabContent ref="info">Content for info tab (boxed variant)</TabContent>
            <TabContent ref="details">Content for details tab</TabContent>
            <TabContent ref="more">Content for more tab</TabContent>
          </Tabs>
        </Block>

        
        <Block spacing="lg">
          <Title as="h3" size="5">{t('borderUncontrolled')}</Title>
          <Tabs bordered defaultActive="info" onActiveChange={(ref) => { vnode.state.border = ref }}>
            <Tab ref="info">Info</Tab>
            <Tab ref="details">Details</Tab>
            <Tab ref="more">More</Tab>
            <TabContent ref="info">Content for info tab (border variant)</TabContent>
            <TabContent ref="details">Content for details tab</TabContent>
            <TabContent ref="more">Content for more tab</TabContent>
          </Tabs>
        </Block>

        {/* Uncontrolled Mode - Lifted */}
        <Block spacing="lg">
          <Title as="h3" size="5">{t('liftedUncontrolled')}</Title>
          <Tabs lifted defaultActive="info" onActiveChange={(ref) => { vnode.state.lifted = ref }}>
            <Tab ref="info">Info</Tab>
            <Tab ref="details">Details</Tab>
            <Tab ref="more">More</Tab>
            <TabContent ref="info">Content for info tab (lifted variant)</TabContent>
            <TabContent ref="details">Content for details tab</TabContent>
            <TabContent ref="more">Content for more tab</TabContent>
          </Tabs>
        </Block>

        {/* Controlled Mode */}
        <Block spacing="lg">
          <Title as="h3" size="5">{t('controlledMode')}</Title>
          <Text size="sm" color="neutral">{t('stateManagedExternally')}</Text>
          <Tabs active={vnode.state.currentTab} onActiveChange={(ref) => { vnode.state.currentTab = ref }}>
            <Tab ref="info">Info</Tab>
            <Tab ref="settings">Settings</Tab>
            <Tab ref="profile">Profile</Tab>
            <TabContent ref="info">
              <Stack gap="sm">
                <Text>Current active tab: <strong>{vnode.state.currentTab}</strong></Text>
                <Text>This is the info tab content. The parent component controls which tab is active.</Text>
              </Stack>
            </TabContent>
            <TabContent ref="settings">
              <Text>Settings content goes here. Try clicking different tabs!</Text>
            </TabContent>
            <TabContent ref="profile">
              <Text>Profile content goes here.</Text>
            </TabContent>
          </Tabs>
        </Block>

        {/* Keyboard Navigation */}
        <Block spacing="lg">
          <Title as="h3" size="5">{t('keyboardNavigation')}</Title>
          <Text size="sm" color="neutral">{t('wcagSupport')}</Text>
          <Tabs lifted defaultActive="info">
            <Tab ref="arrows">Arrow Keys</Tab>
            <Tab ref="home">Home/End</Tab>
            <Tab ref="enter">Enter/Space</Tab>
            <TabContent ref="arrows">
              <Text>Use <strong>Arrow Left/Right</strong> to move between tabs</Text>
            </TabContent>
            <TabContent ref="home">
              <Text>Use <strong>Home</strong> to jump to first tab, <strong>End</strong> for last</Text>
            </TabContent>
            <TabContent ref="enter">
              <Text>Press <strong>Enter</strong> or <strong>Space</strong> to activate the focused tab</Text>
            </TabContent>
          </Tabs>
        </Block>

        {/* Disabled Tab */}
        <Block spacing="lg">
          <Title as="h3" size="5">{t('disabledTab')}</Title>
          <Tabs lifted defaultActive="info">
            <Tab ref="info">Info</Tab>
            <Tab ref="disabled" disabled>Disabled</Tab>
            <Tab ref="more">More</Tab>
            <TabContent ref="info">Info tab content</TabContent>
            <TabContent ref="disabled">This content is not accessible</TabContent>
            <TabContent ref="more">More tab content</TabContent>
          </Tabs>
        </Block>

        {/* Size Variants */}
        <Block spacing="lg">
          <Title as="h3" size="5">{t('common.subtitles.sizes')}</Title>
          <Stack gap="md">
            <div>
              <Text size="sm" color="neutral">Extra Small (xs)</Text>
              <Tabs lifted size="xs" defaultActive="info">
                <Tab ref="info">Info</Tab>
                <Tab ref="details">Details</Tab>
                <TabContent ref="info">XS content</TabContent>
                <TabContent ref="details">XS details</TabContent>
              </Tabs>
            </div>
            <div>
              <Text size="sm" color="neutral">Small (sm)</Text>
              <Tabs lifted size="sm" defaultActive="info">
                <Tab ref="info">Info</Tab>
                <Tab ref="details">Details</Tab>
                <TabContent ref="info">SM content</TabContent>
                <TabContent ref="details">SM details</TabContent>
              </Tabs>
            </div>
            <div>
              <Text size="sm" color="neutral">Medium (md) - Default</Text>
              <Tabs lifted size="md" defaultActive="info">
                <Tab ref="info">Info</Tab>
                <Tab ref="details">Details</Tab>
                <TabContent ref="info">MD content</TabContent>
                <TabContent ref="details">MD details</TabContent>
              </Tabs>
            </div>
            <div>
              <Text size="sm" color="neutral">Large (lg)</Text>
              <Tabs lifted size="lg" defaultActive="info">
                <Tab ref="info">Info</Tab>
                <Tab ref="details">Details</Tab>
                <TabContent ref="info">LG content</TabContent>
                <TabContent ref="details">LG details</TabContent>
              </Tabs>
            </div>
            <div>
              <Text size="sm" color="neutral">Extra Large (xl)</Text>
              <Tabs lifted size="xl" defaultActive="info">
                <Tab ref="info">Info</Tab>
                <Tab ref="details">Details</Tab>
                <TabContent ref="info">XL content</TabContent>
                <TabContent ref="details">XL details</TabContent>
              </Tabs>
            </div>
          </Stack>
        </Block>

        {/* Usage Examples */}
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

        {/* Class Reference */}
        <Block spacing="lg">
          <Title as="h2" size="3">{t('common.classReference')}</Title>
          <ClassTable rows={tableToRows(table)} />
        </Block>
      </Stack>
    )
  }
}
