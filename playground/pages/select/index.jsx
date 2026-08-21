import m from 'mithril'
import { css } from '../../../styled-system/css'
import { t, loadPageI18n } from '../../i18n/index.js'
import { Stack, Title, Select, Text, Block, Tabs, Tab, TabContent } from '../../../src/index.js'
import { CodeExample } from '../../components/CodeExample.jsx'
import { ClassTable } from '../../components/ClassTable.jsx'
import table from './table.yaml'
import { tableToRows } from '../../components/table-rows'


const usageCodeJsx = `import m from 'mithril'
import { Select } from 'panda-ui-mithril'

export const MyPage = {
  view() {
    return (
      <div>
        <Select color="primary">
          <option value="">Pick one</option>
          <option value="1">Option 1</option>
        </Select>
      </div>
    )
  }
}`

const usageCodeJavascript = `import m from 'mithril'
import { Select } from 'panda-ui-mithril'

export const SelectPage = {
  view() {
    return m(Select, { color: 'primary' }, [
      m('option', { value: '' }, 'Pick one'),
      m('option', { value: '1' }, 'Option 1')
    ])
  }
}`

export default {
  name: 'Select',
  category: 'Data Input',
  description: 'Select dropdown component for choosing options.',

  oninit() { loadPageI18n('select') },
  view() {
    return (
      <Stack gap="lg">
        <Title as="h1" size="2">Select</Title>
        <Text color="neutral" className={css({ marginBottom: '2rem', maxWidth: '600px' })}>
          {t('paragraph')}
        </Text>

        <Select>
          <option value="">Pick one</option>
          <option value="1">Option 1</option>
          <option value="2">Option 2</option>
        </Select>
        <Select color="primary">
          <option value="">Pick one</option>
          <option value="1">Option 1</option>
        </Select>

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
