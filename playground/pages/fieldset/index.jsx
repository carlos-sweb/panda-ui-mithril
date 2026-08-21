import m from 'mithril'
import { css } from '../../../styled-system/css'
import { t, loadPageI18n } from '../../i18n/index.js'
import { Stack, Title, Fieldset, TextInput, Text, Block, Tabs, Tab, TabContent } from '../../../src/index.js'
import { CodeExample } from '../../components/CodeExample.jsx'
import { ClassTable } from '../../components/ClassTable.jsx'
import table from './table.yaml'
import { tableToRows } from '../../components/table-rows'


const usageCodeJsx = `import m from 'mithril'
import { Fieldset, TextInput } from 'panda-ui-mithril'

export const MyPage = {
  view() {
    return (
      <div>
        <Fieldset legend="Personal Information">
          <TextInput placeholder="Name" />
          <TextInput placeholder="Email" />
        </Fieldset>
      </div>
    )
  }
}`

const usageCodeJavascript = `import m from 'mithril'
import { Fieldset, TextInput } from 'panda-ui-mithril'

export const MyPage = {
  view() {
    return m(Fieldset, { legend: 'Personal Information' }, [
      m(TextInput, { placeholder: 'Name' }),
      m(TextInput, { placeholder: 'Email' })
    ])
  }
}`

export default {
  name: 'Fieldset',
  category: 'Data Input',
  description: 'Fieldset component for grouping related form fields.',

  oninit() { loadPageI18n('fieldset') },
  view() {
    return (
      <Stack gap="lg">
        <Title as="h1" size="2">Fieldset</Title>
        <Text color="neutral" className={css({ marginBottom: '2rem', maxWidth: '600px' })}>
          {t('paragraph')}
        </Text>

        <Fieldset legend="Personal Information">
          <TextInput placeholder="Name" />
          <TextInput placeholder="Email" />
        </Fieldset>

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
