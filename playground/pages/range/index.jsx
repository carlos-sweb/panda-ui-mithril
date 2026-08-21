import m from 'mithril'
import { css } from '../../../styled-system/css'
import { t, loadPageI18n } from '../../i18n/index.js'
import { Stack, Title, Range, Text, Block, Tabs, Tab, TabContent } from '../../../src/index.js'
import { CodeExample } from '../../components/CodeExample.jsx'
import { ClassTable } from '../../components/ClassTable.jsx'
import table from './table.yaml'
import { tableToRows } from '../../components/table-rows'

const usageCodeJsx = `import m from 'mithril'
import { Range } from 'panda-ui-mithril'

export const MyPage = {
  view() {
    return (
      <div>
        <Range value={40} max={100} color="primary" />
      </div>
    )
  }
}`

const usageCodeJavascript = `import m from 'mithril'
import { Range } from 'panda-ui-mithril'

export const RangePage = {
  view() {
    return m(Range, { value: 40, max: 100, color: 'primary' })
  }
}`

export default {
  name: 'Range',
  category: 'Data Input',
  description: 'Range slider component for selecting values within a range.',

  oninit() { loadPageI18n('range') },
  view() {
    return (
      <Stack gap="lg">
        <Title as="h1" size="2">Range</Title>
        <Text color="neutral" className={css({ marginBottom: '2rem', maxWidth: '600px' })}>
          {t('paragraph')}
        </Text>

        <Range value={40} max={100} />
        <Range value={60} max={100} color="primary" />
        <Range value={80} max={100} color="secondary" />

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
