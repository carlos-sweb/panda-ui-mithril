import m from 'mithril'
import { css } from '../../../styled-system/css'
import { t, loadPageI18n } from '../../i18n/index.js'
import { Stack, Title, Checkbox, Text, Block, Tabs, Tab, TabContent } from '../../../src/index.js'
import { CodeExample } from '../../components/CodeExample.jsx'
import { ClassTable } from '../../components/ClassTable.jsx'
import table from './table.yaml'
import { tableToRows } from '../../components/table-rows'

const usageCodeJsx = `import m from 'mithril'
import { Checkbox } from 'panda-ui-mithril'

export const MyPage = {
  view() {
    return (
      <div>
        <Checkbox color="primary" checked />
        <Checkbox size="lg" />
      </div>
    )
  }
}`

const usageCodeJavascript = `import m from 'mithril'
import { Checkbox } from 'panda-ui-mithril'

export const MyPage = {
  view() {
    return m('div', null, [
      m(Checkbox, { color: 'primary', checked: true }),
      m(Checkbox, { size: 'lg' })
    ])
  }
}`

export default {
  name: 'Checkbox',
  category: 'Data Input',
  description: 'Checkbox component for toggling options on/off.',

  oninit() { loadPageI18n('checkbox') },
  view() {
    return (
      <Stack gap="lg">
        <Title as="h1" size="2">Checkbox</Title>
        <Text color="neutral" className={css({ marginBottom: '2rem', maxWidth: '600px' })}>
          {t('paragraph')}
        </Text>

        <Block spacing="lg">
          <Title as="h3" size="5">{t('common.subtitles.colors')}</Title>
          <Stack direction="row" gap="sm" wrap="wrap">
            <Checkbox />
            <Checkbox checked />
            <Checkbox color="primary" checked />
            <Checkbox color="secondary" checked />
            <Checkbox color="accent" checked />
          </Stack>
        </Block>

        <Block spacing="lg">
          <Title as="h3" size="5">{t('common.subtitles.sizes')}</Title>
          <Stack direction="row" gap="sm" wrap="wrap">
            <Checkbox size="xs" checked />
            <Checkbox size="sm" checked />
            <Checkbox size="md" checked />
            <Checkbox size="lg" checked />
            <Checkbox size="xl" checked />
          </Stack>
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
