import m from 'mithril'
import { css } from '../../styled-system/css'
import { t } from '../i18n/index.js'
import { Filter, FilterOption, FilterReset } from '../../src/index.js'
import { CodeExample } from '../components/CodeExample.jsx'
import { ClassTable } from '../components/ClassTable.jsx'

const stack = css({ display: 'flex', flexDirection: 'column', gap: '1.5rem' })
const sectionTitle = css({ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem', marginTop: '2rem' })

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

  view() {
    return (
      <div className={stack}>
        <h1 className={css({ fontSize: '2rem', fontWeight: '700', marginBottom: '0.5rem' })}>Filter</h1>
        <p className={css({ opacity: 0.6, marginBottom: '2rem', maxWidth: '600px' })}>
          {t('paragraphs.filter')}
        </p>

        <Filter>
          <FilterReset name="frameworks" aria-label="All" />
          <FilterOption name="frameworks" aria-label="Svelte" />
          <FilterOption name="frameworks" aria-label="Vue" />
          <FilterOption name="frameworks" aria-label="React" />
        </Filter>

        <section>
          <h2 className={sectionTitle}>Usage</h2>
          <CodeExample code={usageCode} />
        </section>

        <section>
          <h2 className={sectionTitle}>Class Reference</h2>
          <ClassTable rows={classRows} />
        </section>
      </div>
    )
  }
}
