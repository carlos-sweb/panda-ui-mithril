import m from 'mithril'
import { css } from '../../../styled-system/css'
import { t, loadPageI18n } from '../../i18n/index.js'
import { Stack, Title, Textarea, Text, Block, Tabs, Tab, TabContent } from '../../../src/index.js'
import { CodeExample } from '../../components/CodeExample.jsx'
import { ClassTable } from '../../components/ClassTable.jsx'
import table from './table.yaml'
import { tableToRows } from '../../components/table-rows'

const usageCodeJsx = `import m from 'mithril'
import { Textarea } from 'panda-ui-mithril'

export const MyPage = {
  view() {
    return (
      <div>
        <Textarea placeholder="Write something..." />
        <Textarea color="primary" placeholder="Primary textarea" />
      </div>
    )
  }
}`

const usageCodeJavascript = `import m from 'mithril'
import { Textarea } from 'panda-ui-mithril'

export const TextareaPage = {
  view() {
    return m('div', null, [
      m(Textarea, { placeholder: 'Write something...' }),
      m(Textarea, { color: 'primary', placeholder: 'Primary textarea' })
    ])
  }
}`

export default {
  name: 'Textarea',
  category: 'Data Input',
  description: 'Textarea component for multi-line text entry.',

  oninit() { loadPageI18n('textarea') },
  view() {
    return (
      <Stack gap="lg">
        <Title as="h1" size="2">Textarea</Title>
        <Text color="neutral" className={css({ marginBottom: '2rem', maxWidth: '600px' })}>
          {t('paragraph')}
        </Text>

        <Textarea placeholder="Write something..." />
        <Textarea color="primary" placeholder="Primary textarea" />

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
