import m from 'mithril'
import { css } from '../../styled-system/css'
import { t } from '../i18n/index.js'
import { Pagination, PaginationButton } from '../../src/index.js'
import { CodeExample } from '../components/CodeExample.jsx'
import { ClassTable } from '../components/ClassTable.jsx'

const stack = css({ display: 'flex', flexDirection: 'column', gap: '1.5rem' })
const sectionTitle = css({ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem', marginTop: '2rem' })

const usageCode = `<Pagination>
  <PaginationButton>1</PaginationButton>
  <PaginationButton active>2</PaginationButton>
  <PaginationButton>3</PaginationButton>
  <PaginationButton disabled>4</PaginationButton>
</Pagination>`

const classRows = [
  { className: 'join', prop: '<Pagination>', type: 'Component', description: 'Container — built on top of Join + Button, matching the common pagination pattern' },
  { className: 'btn join-item', prop: '<PaginationButton>', type: 'Component', description: 'A page button' },
  { className: 'btn-active', prop: '<PaginationButton active>', type: 'Modifier', description: 'Marks the current page' },
]

export default {
  name: 'Pagination',
  category: 'Navigation',
  description: 'Pagination component for navigating between pages of content.',

  view() {
    return (
      <div className={stack}>
        <h1 className={css({ fontSize: '2rem', fontWeight: '700', marginBottom: '0.5rem' })}>Pagination</h1>
        <p className={css({ opacity: 0.6, marginBottom: '2rem', maxWidth: '600px' })}>
          {t('paragraphs.pagination')}
        </p>

        <Pagination>
          <PaginationButton>«</PaginationButton>
          <PaginationButton>1</PaginationButton>
          <PaginationButton active>2</PaginationButton>
          <PaginationButton>3</PaginationButton>
          <PaginationButton disabled>4</PaginationButton>
          <PaginationButton>»</PaginationButton>
        </Pagination>

        <section>
          <h2 className={sectionTitle}>{t('common.usage')}</h2>
          <CodeExample code={usageCode} />
        </section>

        <section>
          <h2 className={sectionTitle}>{t('common.classReference')}</h2>
          <ClassTable rows={classRows} />
        </section>
      </div>
    )
  }
}
