import m from 'mithril'
import { css } from '../../../styled-system/css'
import { t, loadPageI18n } from '../../i18n/index.js'
import { Stack, Title, Status, Text, Block, Tabs, Tab, TabContent } from '../../../src/index.js'
import { CodeExample } from '../../components/CodeExample.jsx'
import { ClassTable } from '../../components/ClassTable.jsx'
import table from './table.yaml'
import { tableToRows } from '../../components/table-rows'

const usageCodeJsx = `import m from 'mithril'
import { Status } from 'panda-ui-mithril'

export const MyPage = {
  view() {
    return (
      <div>
        <Status color="success" />
        <Status color="error" size="lg" />
      </div>
    )
  }
}`

const usageCodeJavascript = `import m from 'mithril'
import { Status } from 'panda-ui-mithril'

export const StatusPage = {
  view() {
    return m('div', null, [
      m(Status, { color: 'success' }),
      m(Status, { color: 'error', size: 'lg' })
    ])
  }
}`

export default {
  name: 'Status',
  category: 'Feedback',
  description: 'Status indicator component for showing online/offline states.',

  oninit() { loadPageI18n('status') },
  view() {
    return (
      <Stack gap="lg">
        <Title as="h1" size="2">Status</Title>
        <Text color="neutral" className={css({ marginBottom: '2rem', maxWidth: '600px' })}>
          {t('paragraph')}
        </Text>

        <Stack direction="row" gap="sm" wrap="wrap">
          <Status color="primary" />
          <Status color="secondary" />
          <Status color="accent" />
          <Status color="info" />
          <Status color="success" />
          <Status color="warning" />
          <Status color="error" />
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
