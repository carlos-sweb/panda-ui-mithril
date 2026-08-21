import m from 'mithril'
import { css } from '../../../styled-system/css'
import { t, loadPageI18n } from '../../i18n/index.js'
import { Stack, Title, Filter, FilterOption, FilterReset, Text, Block, Tabs, Tab, TabContent } from '../../../src/index.js'
import { CodeExample } from '../../components/CodeExample.jsx'
import { ClassTable } from '../../components/ClassTable.jsx'
import table from './table.yaml'
import { tableToRows } from '../../components/table-rows'

const usageCodeJsx = `import m from 'mithril'
import { Filter, FilterOption, FilterReset } from 'panda-ui-mithril'

export const MyPage = {
  view() {
    return (
      <div>
        <Filter>
          <FilterReset name="frameworks" aria-label="All" />
          <FilterOption name="frameworks" aria-label="Svelte" />
          <FilterOption name="frameworks" aria-label="Vue" />
          <FilterOption name="frameworks" aria-label="React" />
        </Filter>
      </div>
    )
  }
}`

const usageCodeJavascript = `import m from 'mithril'
import { Filter, FilterOption, FilterReset } from 'panda-ui-mithril'

export const MyPage = {
  view() {
    return m(Filter, null, [
      m(FilterReset, { name: 'frameworks', 'aria-label': 'All' }),
      m(FilterOption, { name: 'frameworks', 'aria-label': 'Svelte' }),
      m(FilterOption, { name: 'frameworks', 'aria-label': 'Vue' }),
      m(FilterOption, { name: 'frameworks', 'aria-label': 'React' })
    ])
  }
}`

export default {
  name: 'Filter',
  category: 'Actions',
  description: 'Filter component for filtering data with radio buttons styled as buttons.',

  oninit() { loadPageI18n('filter') },
  view() {
    return (
      <Stack gap="lg">
        <Title as="h1" size="2">Filter</Title>
        <Text color="neutral" className={css({ marginBottom: '2rem', maxWidth: '600px' })}>
          {t('paragraph')}
        </Text>

        <Filter>
          <FilterReset name="frameworks" aria-label="All" />
          <FilterOption name="frameworks" aria-label="Svelte" />
          <FilterOption name="frameworks" aria-label="Vue" />
          <FilterOption name="frameworks" aria-label="React" />
        </Filter>

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
