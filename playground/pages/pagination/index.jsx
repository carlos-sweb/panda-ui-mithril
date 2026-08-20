import m from 'mithril'
import { css } from '../../../styled-system/css'
import { t, loadPageI18n } from '../../i18n/index.js'
import { Stack, Title, Pagination, PaginationButton, Text, Block, Tabs, Tab, TabContent } from '../../../src/index.js'
import { CodeExample } from '../../components/CodeExample.jsx'
import { ClassTable } from '../../components/ClassTable.jsx'


const usageCodeJsx = `import m from 'mithril'
import { Pagination, PaginationButton } from 'panda-ui-mithril'

export const MyPage = {
  view() {
    return (
      <div>
        <Pagination>
          <PaginationButton>1</PaginationButton>
          <PaginationButton active>2</PaginationButton>
          <PaginationButton>3</PaginationButton>
          <PaginationButton disabled>4</PaginationButton>
        </Pagination>
      </div>
    )
  }
}`

const usageCodeJavascript = `import m from 'mithril'
import { Pagination, PaginationButton } from 'panda-ui-mithril'

export const PaginationPage = {
  view() {
    return m(Pagination, null, [
      m(PaginationButton, null, '1'),
      m(PaginationButton, { active: true }, '2'),
      m(PaginationButton, null, '3'),
      m(PaginationButton, { disabled: true }, '4')
    ])
  }
}`

const classRows = [
  { className: 'join', prop: '<Pagination>', type: 'Component', description: 'Container — built on top of Join + Button, matching the common pagination pattern' },
  { className: 'btn join-item', prop: '<PaginationButton>', type: 'Component', description: 'A page button' },
  { className: 'btn-active', prop: '<PaginationButton active>', type: 'Modifier', description: 'Marks the current page' },
]

export default {
  name: 'Pagination',
  category: 'Navigation',
  description: 'Pagination component for navigating between pages of content.',

  oninit() { loadPageI18n('pagination') },
  view() {
    return (
      <Stack gap="lg">
        <Title as="h1" size="2">Pagination</Title>
        <Text color="neutral" className={css({ marginBottom: '2rem', maxWidth: '600px' })}>
          {t('paragraph')}
        </Text>

        <Pagination>
          <PaginationButton>{'«'}</PaginationButton>
          <PaginationButton>1</PaginationButton>
          <PaginationButton active>2</PaginationButton>
          <PaginationButton>3</PaginationButton>
          <PaginationButton disabled>4</PaginationButton>
          <PaginationButton>{'»'}</PaginationButton>
        </Pagination>

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
          <ClassTable rows={classRows} />
        </Block>
      </Stack>
    )
  }
}
