import m from 'mithril'
import { css } from '../../../styled-system/css'
import { t, loadPageI18n } from '../../i18n/index.js'
import { Stack, Title, Loading, Text, Block, Tabs, Tab, TabContent } from '../../../src/index.js'
import { CodeExample } from '../../components/CodeExample.jsx'
import { ClassTable } from '../../components/ClassTable.jsx'
import table from './table.yaml'
import { tableToRows } from '../../components/table-rows'

const usageCodeJsx = `import m from 'mithril'
import { Loading } from 'panda-ui-mithril'

export const MyPage = {
  view() {
    return (
      <div>
        <Loading variant="spinner" />
        <Loading variant="dots" size="lg" />
      </div>
    )
  }
}`

const usageCodeJavascript = `import m from 'mithril'
import { Loading } from 'panda-ui-mithril'

export const MyPage = {
  view() {
    return m('div', null, [
      m(Loading, { variant: 'spinner' }),
      m(Loading, { variant: 'dots', size: 'lg' })
    ])
  }
}`

export default {
  name: 'Loading',
  category: 'Feedback',
  description: 'Loading indicator component for showing progress and wait states.',

  oninit() { loadPageI18n('loading') },
  view() {
    return (
      <Stack gap="lg">
        <Title as="h1" size="2">Loading</Title>
        <Text color="neutral" className={css({ marginBottom: '2rem', maxWidth: '600px' })}>
          {t('paragraph')}
        </Text>

        <Stack direction="row" gap="md" wrap="wrap">
          <Loading variant="spinner" />
          <Loading variant="ring" />
          <Loading variant="ball" />
          <Loading variant="bars" />
          <Loading variant="infinity" />
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
