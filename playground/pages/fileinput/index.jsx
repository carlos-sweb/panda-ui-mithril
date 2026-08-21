import m from 'mithril'
import { css } from '../../../styled-system/css'
import { t, loadPageI18n } from '../../i18n/index.js'
import { Stack, Title, FileInput, Text, Block, Tabs, Tab, TabContent } from '../../../src/index.js'
import { CodeExample } from '../../components/CodeExample.jsx'
import { ClassTable } from '../../components/ClassTable.jsx'
import table from './table.yaml'
import { tableToRows } from '../../components/table-rows'


const usageCodeJsx = `import m from 'mithril'
import { FileInput } from 'panda-ui-mithril'

export const MyPage = {
  view() {
    return (
      <div>
        <FileInput color="primary" />
      </div>
    )
  }
}`

const usageCodeJavascript = `import m from 'mithril'
import { FileInput } from 'panda-ui-mithril'

export const MyPage = {
  view() {
    return m(FileInput, { color: 'primary' })
  }
}`

export default {
  name: 'FileInput',
  category: 'Data Input',
  description: 'File input component for uploading files.',

  oninit() { loadPageI18n('fileinput') },
  view() {
    return (
      <Stack gap="lg">
        <Title as="h1" size="2">File Input</Title>
        <Text color="neutral" className={css({ marginBottom: '2rem', maxWidth: '600px' })}>
          {t('paragraph')}
        </Text>

        <FileInput />
        <FileInput color="primary" />
        <FileInput color="secondary" />

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
