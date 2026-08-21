import m from 'mithril'
import { css } from '../../../styled-system/css'
import { t, loadPageI18n } from '../../i18n/index.js'
import { Stack, Title, Kbd, Text, Block, Tabs, Tab, TabContent } from '../../../src/index.js'
import { CodeExample } from '../../components/CodeExample.jsx'
import { ClassTable } from '../../components/ClassTable.jsx'
import table from './table.yaml'
import { tableToRows } from '../../components/table-rows'

const usageCodeJsx = `import m from 'mithril'
import { Kbd } from 'panda-ui-mithril'

export const MyPage = {
  view() {
    return (
      <div>
        <Kbd size="xs">K</Kbd>
        <Kbd size="sm">Shift</Kbd>
        <Kbd size="md">Enter</Kbd>
        <Kbd size="lg">Ctrl</Kbd>
        <Kbd size="xl">Space</Kbd>
      </div>
    )
  }
}`

const usageCodeJavascript = `import m from 'mithril'
import { Kbd } from 'panda-ui-mithril'

export const MyPage = {
  view() {
    return m('div', null, [
      m(Kbd, { size: 'xs' }, 'K'),
      m(Kbd, { size: 'sm' }, 'Shift'),
      m(Kbd, { size: 'md' }, 'Enter'),
      m(Kbd, { size: 'lg' }, 'Ctrl'),
      m(Kbd, { size: 'xl' }, 'Space')
    ])
  }
}`

export default {
  name: 'Kbd',
  category: 'Data Display',
  description: 'Keyboard key component for displaying keyboard shortcuts.',

  oninit() { loadPageI18n('kbd') },
  view() {
    return (
      <Stack gap="lg">
        <Title as="h1" size="2">Kbd</Title>
        <Text color="neutral" className={css({ marginBottom: '2rem', maxWidth: '600px' })}>
          {t('paragraph')}
        </Text>

        <Stack direction="row" gap="sm" wrap="wrap">
          <Kbd size="xs">K</Kbd>
          <Kbd size="sm">Shift</Kbd>
          <Kbd size="md">Enter</Kbd>
          <Kbd size="lg">Ctrl</Kbd>
          <Kbd size="xl">Space</Kbd>
        </Stack>

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
