import m from 'mithril'
import { css } from '../../../styled-system/css'
import { t, loadPageI18n } from '../../i18n/index.js'
import { Stack, Title, TextInput, Text, Block, Tabs, Tab, TabContent } from '../../../src/index.js'
import { CodeExample } from '../../components/CodeExample.jsx'
import { ClassTable } from '../../components/ClassTable.jsx'
import table from './table.yaml'
import { tableToRows } from '../../components/table-rows'

const usageCodeJsx = `import m from 'mithril'
import { TextInput } from 'panda-ui-mithril'

export const MyPage = {
  view() {
    return (
      <div>
        <TextInput placeholder="Enter text..." />
        <TextInput color="primary" placeholder="Primary input" />
        <TextInput size="lg" placeholder="Large" />
      </div>
    )
  }
}`

const usageCodeJavascript = `import m from 'mithril'
import { TextInput } from 'panda-ui-mithril'

export const MyPage = {
  view() {
    return m('div', null, [
      m(TextInput, { placeholder: 'Enter text...' }),
      m(TextInput, { color: 'primary', placeholder: 'Primary input' }),
      m(TextInput, { size: 'lg', placeholder: 'Large' })
    ])
  }
}`

export default {
  name: 'TextInput',
  category: 'Data Input',
  description: 'Text input component for single-line text entry.',

  oninit() { loadPageI18n('input') },
  view() {
    return (
      <Stack gap="lg">
        <Title as="h1" size="2">TextInput</Title>
        <Text color="neutral" className={css({ marginBottom: '2rem', maxWidth: '600px' })}>
          {t('paragraph')}
        </Text>

        <TextInput placeholder="Enter text..." />
        <TextInput color="primary" placeholder="Primary input" />
        <TextInput color="error" placeholder="Error input" />

        <Block spacing="lg">
          <Title as="h3" size="5">Sizes</Title>
          <TextInput size="xs" placeholder="XS" />
          <TextInput size="sm" placeholder="SM" />
          <TextInput size="md" placeholder="MD" />
          <TextInput size="lg" placeholder="LG" />
          <TextInput size="xl" placeholder="XL" />
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
