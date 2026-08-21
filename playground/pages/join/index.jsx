import m from 'mithril'
import { css } from '../../../styled-system/css'
import { t, loadPageI18n } from '../../i18n/index.js'
import { Stack, Title, Join, JoinItem, PaginationButton, Text, Block, Tabs, Tab, TabContent } from '../../../src/index.js'
import { CodeExample } from '../../components/CodeExample.jsx'
import { ClassTable } from '../../components/ClassTable.jsx'
import table from './table.yaml'
import { tableToRows } from '../../components/table-rows'

const usageCodeJsx = `import m from 'mithril'
import { Join, PaginationButton } from 'panda-ui-mithril'

export const MyPage = {
  view() {
    return (
      <div>
        <Join>
          <PaginationButton>Button 1</PaginationButton>
          <PaginationButton>Button 2</PaginationButton>
          <PaginationButton>Button 3</PaginationButton>
        </Join>
      </div>
    )
  }
}`

const usageCodeJavascript = `import m from 'mithril'
import { Join, PaginationButton } from 'panda-ui-mithril'

export const MyPage = {
  view() {
    return m(Join, null, [
      m(PaginationButton, null, 'Button 1'),
      m(PaginationButton, null, 'Button 2'),
      m(PaginationButton, null, 'Button 3')
    ])
  }
}`

export default {
  name: 'Join',
  category: 'Layout',
  description: 'Join component for grouping elements together.',

  oninit() { loadPageI18n('join') },
  view() {
    return (
      <Stack gap="lg">
        <Title as="h1" size="2">Join</Title>
        <Text color="neutral" className={css({ marginBottom: '2rem', maxWidth: '600px' })}>
          {t('paragraph')}
        </Text>

        <Block spacing="lg">
          <Title as="h3" size="5">Generic items</Title>
          <Join>
            <JoinItem>Button 1</JoinItem>
            <JoinItem>Button 2</JoinItem>
            <JoinItem>Button 3</JoinItem>
          </Join>
        </Block>

        <Block spacing="lg">
          <Title as="h3" size="5">Combined with Button (via PaginationButton)</Title>
          <Join>
            <PaginationButton>Button 1</PaginationButton>
            <PaginationButton active>Button 2</PaginationButton>
            <PaginationButton>Button 3</PaginationButton>
          </Join>
        </Block>

        <Block spacing="lg">
          <Title as="h3" size="5">Vertical</Title>
          <Join vertical>
            <JoinItem>Item 1</JoinItem>
            <JoinItem>Item 2</JoinItem>
            <JoinItem>Item 3</JoinItem>
          </Join>
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
