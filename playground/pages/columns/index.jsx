import m from 'mithril'
import { css } from '../../../styled-system/css'
import { t, loadPageI18n } from '../../i18n/index.js'
import { Stack, Title, Columns, Column, Text, Block, Tabs, Tab, TabContent } from '../../../src/index.js'
import { CodeExample } from '../../components/CodeExample.jsx'
import { ClassTable } from '../../components/ClassTable.jsx'
import table from './table.yaml'
import { tableToRows } from '../../components/table-rows'

const usageCodeJsx = `import m from 'mithril'
import { Columns, Column } from 'panda-ui-mithril'

export const MyPage = {
  view() {
    return (
      <div>
        <Columns gap="md">
          <Column width={4}><div>Sidebar</div></Column>
          <Column width={8}><div>Content</div></Column>
        </Columns>
      </div>
    )
  }
}`

const usageCodeJavascript = `import m from 'mithril'
import { Columns, Column } from 'panda-ui-mithril'

export const MyPage = {
  view() {
    return m(Columns, { gap: 'md' }, [
      m(Column, { width: 4 }, m('div', null, 'Sidebar')),
      m(Column, { width: 8 }, m('div', null, 'Content'))
    ])
  }
}`

const cell = css({ bg: 'token(colors.base-200)', p: '1rem', borderRadius: '0.25rem', textAlign: 'center' })

export default {
  oninit() { loadPageI18n('columns') },
  view() {
    return (<Stack gap="lg">
      <Title as="h1" size="2">Columns</Title>
      <Text color="neutral" className={css({ marginBottom: '2rem', maxWidth: '600px' })}>{t('paragraph')}</Text>
      <Block spacing="lg"><Title as="h2" size="3">{t('common.usage')}</Title>
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
      <Block spacing="lg"><Title as="h2" size="3">{t('equalWidth')}</Title>
        <Columns gap="md">
          <Column><div className={cell}>Col 1</div></Column>
          <Column><div className={cell}>Col 2</div></Column>
          <Column><div className={cell}>Col 3</div></Column>
        </Columns>
      </Block>
      <Block spacing="lg"><Title as="h2" size="3">{t('fixedWidths')}</Title>
        <Columns gap="md">
          <Column width={4}><div className={cell}>4/12</div></Column>
          <Column width={8}><div className={cell}>8/12</div></Column>
        </Columns>
      </Block>
      <Block spacing="lg"><Title as="h2" size="3">{t('narrowColumn')}</Title>
        <Columns gap="md">
          <Column narrow><div className={cell}>Auto</div></Column>
          <Column><div className={cell}>Fills rest</div></Column>
        </Columns>
      </Block>
      <Block spacing="lg"><Title as="h2" size="3">{t('common.classReference')}</Title><ClassTable rows={tableToRows(table)} /></Block>
    </Stack>)
  }
}
