import m from 'mithril'
import { css } from '../../../styled-system/css'
import { t, loadPageI18n } from '../../i18n/index.js'
import { Stack, Title, Label, TextInput, Text, Block, Tabs, Tab, TabContent } from '../../../src/index.js'
import { CodeExample } from '../../components/CodeExample.jsx'
import { ClassTable } from '../../components/ClassTable.jsx'
import table from './table.yaml'
import { tableToRows } from '../../components/table-rows'


const usageCodeJsx = `import m from 'mithril'
import { Label, TextInput } from 'panda-ui-mithril'

export const MyPage = {
  view() {
    return (
      <div>
        <Label>Regular Label</Label>

        <Label floating>
          <TextInput placeholder="Type here..." />
          <span>Floating Label</span>
        </Label>
      </div>
    )
  }
}`

const usageCodeJavascript = `import m from 'mithril'
import { Label, TextInput } from 'panda-ui-mithril'

export const MyPage = {
  view() {
    return m('div', null, [
      m(Label, null, 'Regular Label'),
      m(Label, { floating: true }, [
        m(TextInput, { placeholder: 'Type here...' }),
        m('span', null, 'Floating Label')
      ])
    ])
  }
}`

export default {
  name: 'Label',
  category: 'Data Input',
  description: 'Label component for form field labels with floating variant.',

  oninit() { loadPageI18n('label') },
  view() {
    return (
      <Stack gap="lg">
        <Title as="h1" size="2">Label</Title>
        <Text color="neutral" className={css({ marginBottom: '2rem', maxWidth: '600px' })}>
          {t('paragraph')}
        </Text>

        <Label>Regular Label</Label>
        <Label floating>
          <TextInput placeholder="Type here..." />
          <span>Floating Label</span>
        </Label>

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
