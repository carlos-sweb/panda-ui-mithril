import m from 'mithril'
import { css } from '../../../styled-system/css'
import { t, loadPageI18n } from '../../i18n/index.js'
import { Stack, Title, Filter, FilterOption, FilterReset, Text, Block } from '../../../src/index.js'
import { CodeExample } from '../../components/CodeExample.jsx'
import { ClassTable } from '../../components/ClassTable.jsx'

const usageCode = `<Filter>
  <FilterReset name="frameworks" aria-label="All" />
  <FilterOption name="frameworks" aria-label="Svelte" />
  <FilterOption name="frameworks" aria-label="Vue" />
  <FilterOption name="frameworks" aria-label="React" />
</Filter>`

const classRows = [
  { className: 'filter', prop: '<Filter>', type: 'Component', description: 'Filter container' },
  { className: 'btn', prop: '<FilterOption name="...">', type: 'Component', description: 'A filter option, rendered as a radio input styled like a button' },
  { className: 'filter-reset', prop: '<FilterReset name="...">', type: 'Modifier', description: 'Resets the filter — only visible once an option is selected' },
]

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
          <CodeExample code={usageCode} />
        </Block>

        <Block spacing="lg">
          <Title as="h2" size="3">{t('common.classReference')}</Title>
          <ClassTable rows={classRows} />
        </Block>
      </Stack>
    )
  }
}
